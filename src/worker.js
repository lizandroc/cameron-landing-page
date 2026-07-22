/**
 * Cameron Cruz — landing page Worker
 * API routes (everything else is served from ./public static assets):
 *   POST /api/contact        { name, email, message }        → D1 + Resend notification
 *   POST /api/subscribe      { name, email }                 → D1 + Resend notification
 *   GET  /api/availability?month=YYYY-MM                     → booked slots for that month
 *   POST /api/book           { name, email, notes, date, time } → D1 + Resend emails
 *   GET  /api/admin/bookings   (Authorization: Bearer ADMIN_KEY)
 *   GET  /api/admin/contacts   (Authorization: Bearer ADMIN_KEY)
 *   POST /api/admin/booking-status { id, status, zoom_link } (auth'd)
 */

const JSON_HEADERS = { 'Content-Type': 'application/json' };

// Bookable slots: Mon–Fri, 30-min Zoom calls
const SLOT_TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function bad(message, status = 400) {
  return json({ ok: false, error: message }, status);
}

function isEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;
}

function clean(s, max = 2000) {
  return typeof s === 'string' ? s.trim().slice(0, max) : '';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function sendEmail(env, { to, subject, html, replyTo }) {
  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email:', subject);
    return { skipped: true };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return { ok: false };
  }
  return { ok: true };
}

function emailShell(title, bodyHtml) {
  return `<!doctype html><html><body style="margin:0;background:#0E0E0E;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#141414;border:1px solid #262626;border-radius:4px;padding:36px;color:#F2F0EC;">
    <h1 style="margin:0 0 20px;font-size:22px;letter-spacing:-0.02em;color:#F2F0EC;">${escapeHtml(title)}</h1>
    <div style="font-size:15px;line-height:1.6;color:#B8B4AC;">${bodyHtml}</div>
    <p style="margin:28px 0 0;padding-top:18px;border-top:1px solid #262626;font-size:12px;color:#77736B;">Cameron Cruz · cameroncruz.com</p>
  </div></body></html>`;
}

function requireAdmin(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const key = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) return false;
  return true;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (!pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }

    try {
      // ---- Public endpoints ----
      if (pathname === '/api/contact' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const name = clean(body.name, 120);
        const email = clean(body.email, 254);
        const message = clean(body.message, 4000);
        if (!name || !isEmail(email) || !message) return bad('Please provide your name, a valid email, and a message.');

        await env.DB.prepare('INSERT INTO contacts (name, email, message, source) VALUES (?, ?, ?, ?)')
          .bind(name, email, message, 'contact').run();

        await sendEmail(env, {
          to: env.NOTIFY_EMAIL,
          replyTo: email,
          subject: `New contact from ${name}`,
          html: emailShell('New contact form message', `
            <p><strong style="color:#F2F0EC;">${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
            <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>`),
        });

        return json({ ok: true });
      }

      if (pathname === '/api/subscribe' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const name = clean(body.name, 120);
        const email = clean(body.email, 254);
        if (!name || !isEmail(email)) return bad('Please provide your first name and a valid email.');

        await env.DB.prepare('INSERT INTO contacts (name, email, source) VALUES (?, ?, ?)')
          .bind(name, email, 'newsletter').run();

        await sendEmail(env, {
          to: env.NOTIFY_EMAIL,
          subject: `New newsletter subscriber: ${name}`,
          html: emailShell('New subscriber', `<p><strong style="color:#F2F0EC;">${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt; joined the Close Friends list.</p>`),
        });

        return json({ ok: true });
      }

      if (pathname === '/api/availability' && request.method === 'GET') {
        const month = clean(url.searchParams.get('month'), 7); // YYYY-MM
        if (!/^\d{4}-\d{2}$/.test(month)) return bad('month must be YYYY-MM');
        const { results } = await env.DB.prepare(
          "SELECT slot_date, slot_time FROM bookings WHERE slot_date LIKE ? AND status != 'cancelled'"
        ).bind(`${month}-%`).all();
        return json({ ok: true, slotTimes: SLOT_TIMES, booked: results });
      }

      if (pathname === '/api/book' && request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        const name = clean(body.name, 120);
        const email = clean(body.email, 254);
        const notes = clean(body.notes, 2000);
        const date = clean(body.date, 10);
        const time = clean(body.time, 5);

        if (!name || !isEmail(email)) return bad('Please provide your name and a valid email.');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !SLOT_TIMES.includes(time)) return bad('Please pick a valid date and time slot.');

        const day = new Date(`${date}T12:00:00Z`);
        const dow = day.getUTCDay();
        if (Number.isNaN(day.getTime()) || dow === 0 || dow === 6) return bad('Calls are scheduled Monday to Friday.');
        const today = new Date().toISOString().slice(0, 10);
        if (date <= today) return bad('Please pick a date at least one day out.');

        try {
          await env.DB.prepare('INSERT INTO bookings (name, email, notes, slot_date, slot_time) VALUES (?, ?, ?, ?, ?)')
            .bind(name, email, notes, date, time).run();
        } catch (e) {
          if (String(e).includes('UNIQUE')) return bad('That slot was just taken — please pick another time.', 409);
          throw e;
        }

        await env.DB.prepare('INSERT INTO contacts (name, email, message, source) VALUES (?, ?, ?, ?)')
          .bind(name, email, notes || null, 'booking').run();

        const pretty = new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
        const tz = env.TIMEZONE_LABEL || '';

        await sendEmail(env, {
          to: env.NOTIFY_EMAIL,
          replyTo: email,
          subject: `New Zoom call booked — ${name} on ${date} at ${time}`,
          html: emailShell('New Zoom call booked', `
            <p><strong style="color:#F2F0EC;">${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
            <p><strong style="color:#C9A64B;">${escapeHtml(pretty)} at ${escapeHtml(time)} ${escapeHtml(tz)}</strong></p>
            ${notes ? `<p style="white-space:pre-wrap;">${escapeHtml(notes)}</p>` : ''}
            <p>Confirm it and send the Zoom link from your dashboard.</p>`),
        });

        await sendEmail(env, {
          to: email,
          subject: 'Your call with Cameron Cruz is booked',
          html: emailShell("You're booked", `
            <p>Hey ${escapeHtml(name)},</p>
            <p>Your Zoom call is scheduled for <strong style="color:#C9A64B;">${escapeHtml(pretty)} at ${escapeHtml(time)} ${escapeHtml(tz)}</strong>.</p>
            <p>You'll receive the Zoom link by email before the call. If you need to reschedule, just reply to this email.</p>
            <p>— Cameron</p>`),
        });

        return json({ ok: true });
      }

      // ---- Admin endpoints ----
      if (pathname.startsWith('/api/admin/')) {
        if (!requireAdmin(request, env)) return bad('Unauthorized', 401);

        if (pathname === '/api/admin/bookings' && request.method === 'GET') {
          const { results } = await env.DB.prepare('SELECT * FROM bookings ORDER BY slot_date DESC, slot_time DESC LIMIT 500').all();
          return json({ ok: true, bookings: results });
        }

        if (pathname === '/api/admin/contacts' && request.method === 'GET') {
          const { results } = await env.DB.prepare('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 1000').all();
          return json({ ok: true, contacts: results });
        }

        if (pathname === '/api/admin/booking-status' && request.method === 'POST') {
          const body = await request.json().catch(() => ({}));
          const id = Number(body.id);
          const status = clean(body.status, 20);
          const zoomLink = clean(body.zoom_link, 500);
          if (!Number.isInteger(id) || !['pending', 'confirmed', 'cancelled'].includes(status)) return bad('Invalid id or status.');

          await env.DB.prepare('UPDATE bookings SET status = ?, zoom_link = COALESCE(NULLIF(?, \'\'), zoom_link) WHERE id = ?')
            .bind(status, zoomLink, id).run();

          if (status === 'confirmed' && zoomLink) {
            const row = await env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first();
            if (row) {
              const pretty = new Date(`${row.slot_date}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
              await sendEmail(env, {
                to: row.email,
                subject: 'Your Zoom link — call with Cameron Cruz',
                html: emailShell('Your call is confirmed', `
                  <p>Hey ${escapeHtml(row.name)},</p>
                  <p>Your call is confirmed for <strong style="color:#C9A64B;">${escapeHtml(pretty)} at ${escapeHtml(row.slot_time)} ${escapeHtml(env.TIMEZONE_LABEL || '')}</strong>.</p>
                  <p>Join here: <a href="${escapeHtml(zoomLink)}" style="color:#C9A64B;">${escapeHtml(zoomLink)}</a></p>
                  <p>— Cameron</p>`),
              });
            }
          }
          return json({ ok: true });
        }
      }

      return bad('Not found', 404);
    } catch (err) {
      console.error(err);
      return bad('Something went wrong. Please try again.', 500);
    }
  },
};
