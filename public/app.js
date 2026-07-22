/* Cameron Cruz — landing page behavior */
(function () {
  'use strict';

  /* ============================================================
     Data
     ============================================================ */
  var RAIL = [
    { name: 'Marie & Jake Snow', tag: 'Club Life Design', story: 'Marie & Jake run a travel-and-lifestyle brand with a big email list but no clear monetization path. We built a campaign sequence around one of their signature offers — story-driven, tied to their audience\'s deeper motivations. Single campaign, single month, seven-figure result.', result: '$1M month', photo: 'profile-snow.jpg' },
    { name: 'Julian Alexander', tag: 'Coaching', story: 'Julian was running a part-time practice when we started. Over the next year we rebuilt his entire offer, wrote the sales pages and email flows, and turned what was a side-project into a full coaching business doing $1.2M/yr in run rate.', result: '$1.2M/yr', photo: 'profile-julian.jpg' },
    { name: 'Sam Kolder', tag: 'Creator · Filmmaker', story: 'Sam reached out about positioning — his audience was massive but he wasn\'t sure how to translate it into a repeatable product line. We worked on the core offer, the launch copy, and the way the product was framed inside his existing content. The result was a launch that actually matched the size of his audience.', result: 'Full product launch', photo: 'profile-sam-kolder.jpg' },
    { name: 'Eva Hooft', tag: 'Coach', story: 'Eva\'s brand lives on a deeper, more personal register than most coaches. The challenge was finding the right voice for her emails — one that moved her audience without losing the soul of what she does. We developed a signature email style and a nurture sequence that now carries her sales on autopilot.', result: 'Voice-led email engine', photo: 'profile-eva.jpg' },
    { name: 'Dennis Echelbarger', tag: 'Business Owner', story: 'Dennis runs a real-world business and came to me needing copy that could hold its own in a crowded category. We rewrote his core sales assets — long-form page, email follow-ups, and a retargeting sequence — with a strategic angle designed to outflank his competitors instead of copying them.', result: 'Repositioned from the ground up', photo: 'profile-dennis.jpg' },
    { name: 'Dr. Daniel Pompa', tag: 'Health Authority', story: 'Dr. Pompa is one of the most respected voices in cellular health. The work was about translating his deep expertise into copy that could actually move people who were new to his world — without dumbing it down. We built email flows and sales assets that honored the science and still converted cold traffic.', result: 'Translated authority to copy', photo: 'profile-pompa.jpg' },
    { name: 'Adam Horwitz', tag: 'Info-product Operator', story: 'Adam has been in the game for a long time and is careful about who he hands his list to. We worked on a handful of promotions together — emails, sales pages, campaign strategy — and consistently produced numbers he could actually stand behind, not just vanity metrics.', result: 'Multi-promotion partner', photo: 'profile-horwitz.jpg' }
  ];

  var STUDENTS = [
    { name: 'Student Name 1', tag: 'Copy Accelerator Student', story: 'Went from writing emails for free to landing a $4k/mo retainer client within eight weeks of joining the program.', result: 'First $4k/mo client', file: 'student-testimonial-1.mp4' },
    { name: 'Student Name 2', tag: 'Course Student', story: 'Used the offer-building framework to relaunch a stalled course — tripled conversions on the same traffic.', result: '3× conversions', file: 'student-testimonial-2.mp4' },
    { name: 'Student Name 3', tag: 'Coaching Student', story: 'Left a 9-to-5 after six months of freelance copywriting using the client-acquisition system from the program.', result: 'Full-time freelancer', file: 'student-testimonial-3.mp4' }
  ];

  var NAMES = [
    'Eva Hooft', 'Joshua Macin', 'Dr. Daniel Pompa', 'Dr. John Demartini',
    'Marie & Jake Snow', 'Dennis Echelbarger', 'Matt Proper', 'AwesomeREI',
    'Arlin Moore', 'Sam Kolder', 'Brendon Hayward', 'Matt Komo',
    'Val Days', 'Adam Horwitz', 'Julian Alexander', 'Celia Smith',
    'Max Muench / FollowTheTracks', 'Kaizen Asuidu', 'Mike Gore-Hickman', 'Justin Goff',
    'Stefan Georgi', 'Jesse Showalter', 'Altis.World', 'Hoo.be / Jordan Taylor',
    'Jeff Salzenstein / Tennis Evolution'
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ============================================================
     Render: testimonial rail
     ============================================================ */
  var rail = document.getElementById('rail');
  RAIL.forEach(function (t) {
    var card = el('article', 'testi-small');
    var portrait = el('div', 'testi-small-portrait');
    var img = document.createElement('img');
    img.src = '/assets/' + t.photo;
    img.alt = 'Portrait of ' + t.name;
    img.loading = 'lazy';
    img.onerror = function () {
      portrait.innerHTML = '';
      var ph = el('div', 'placeholder');
      portrait.appendChild(ph);
    };
    portrait.appendChild(img);
    var body = el('div', 'testi-small-body');
    body.appendChild(el('h4', 'testi-small-name', t.name));
    body.appendChild(el('p', 'testi-small-tag', t.tag));
    body.appendChild(el('p', 'testi-small-story', t.story));
    body.appendChild(el('p', 'testi-small-result', t.result));
    card.appendChild(portrait);
    card.appendChild(body);
    rail.appendChild(card);
  });

  // Samples end card
  var samples = el('div', 'testi-small testi-samples');
  var samplesInner = el('div', 'testi-samples-inner');
  samplesInner.appendChild(el('h4', 'testi-samples-title', 'Samples of my work are available upon request.'));
  var samplesLink = el('a', 'testi-samples-email', 'cameron@cameroncruz.com');
  samplesLink.href = 'mailto:cameron@cameroncruz.com';
  samplesInner.appendChild(samplesLink);
  samples.appendChild(samplesInner);
  rail.appendChild(samples);

  // Rail scroll controls
  var prevBtn = document.getElementById('rail-prev');
  var nextBtn = document.getElementById('rail-next');
  function updateRailButtons() {
    prevBtn.disabled = rail.scrollLeft <= 8;
    nextBtn.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
  }
  function scrollRail(dir) {
    var card = rail.querySelector('.testi-small');
    var step = card ? card.offsetWidth + 16 : 300;
    rail.scrollBy({ left: dir * step, behavior: 'smooth' });
  }
  prevBtn.addEventListener('click', function () { scrollRail(-1); });
  nextBtn.addEventListener('click', function () { scrollRail(1); });
  rail.addEventListener('scroll', updateRailButtons, { passive: true });
  window.addEventListener('resize', updateRailButtons);
  updateRailButtons();

  /* ============================================================
     Render: student testimonials
     ============================================================ */
  var studentsGrid = document.getElementById('students-grid');
  STUDENTS.forEach(function (t, i) {
    var card = el('article', 'student-card reveal');
    card.style.setProperty('--reveal-i', String(i));

    var vid = el('div', 'testi-video');
    vid.setAttribute('role', 'button');
    vid.setAttribute('tabindex', '0');
    vid.setAttribute('aria-label', 'Play testimonial video from ' + t.name);
    var video = document.createElement('video');
    video.src = '/assets/' + t.file;
    video.playsInline = true;
    video.preload = 'metadata';
    vid.appendChild(video);
    var poster = el('div', 'testi-video-poster');
    poster.setAttribute('aria-hidden', 'true');
    var ph = el('div', 'placeholder');
    ph.appendChild(el('div', 'placeholder-label', t.file));
    poster.appendChild(ph);
    vid.appendChild(poster);
    var play = el('button', 'vsl-play');
    play.type = 'button';
    play.tabIndex = -1;
    play.setAttribute('aria-hidden', 'true');
    play.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    vid.appendChild(play);
    card.appendChild(vid);

    var body = el('div', 'student-body');
    body.appendChild(el('h4', 'testi-small-name', t.name));
    body.appendChild(el('p', 'testi-small-tag', t.tag));
    body.appendChild(el('p', 'testi-small-story', t.story));
    body.appendChild(el('p', 'testi-small-result', t.result));
    card.appendChild(body);

    studentsGrid.appendChild(card);
  });

  /* ============================================================
     Graceful placeholders for not-yet-uploaded images
     ============================================================ */
  document.querySelectorAll('.bio-photo img, .footer-logo img').forEach(function (img) {
    img.addEventListener('error', function () {
      var name = (img.getAttribute('src') || '').split('/').pop();
      var ph = el('div', 'placeholder');
      ph.appendChild(el('div', 'placeholder-label', name));
      img.replaceWith(ph);
    });
    if (img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
  });

  /* ============================================================
     Render: trusted-by names
     ============================================================ */
  var namesList = document.getElementById('names-list');
  NAMES.forEach(function (n) {
    namesList.appendChild(el('span', 'name', n));
  });

  /* ============================================================
     Video players (hero VSL + all testimonial videos)
     ============================================================ */
  function wireVideo(container) {
    var video = container.querySelector('video');
    if (!video) return;
    function toggle() {
      if (video.paused) {
        // Pause any other playing video first
        document.querySelectorAll('video').forEach(function (v) {
          if (v !== video && !v.paused) v.pause();
        });
        video.play().then(function () {
          container.classList.add('is-playing');
          video.controls = true;
        }).catch(function () {
          container.classList.remove('is-playing');
        });
      } else {
        video.pause();
      }
    }
    container.addEventListener('click', function (e) {
      if (container.classList.contains('is-playing')) return; // native controls take over
      e.preventDefault();
      toggle();
    });
    container.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && !container.classList.contains('is-playing')) {
        e.preventDefault();
        toggle();
      }
    });
    video.addEventListener('ended', function () {
      container.classList.remove('is-playing');
      video.controls = false;
    });
  }
  document.querySelectorAll('.vsl, .testi-video').forEach(wireVideo);

  /* ============================================================
     Staggered reveal on scroll
     ============================================================ */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (n) { io.observe(n); });
  } else {
    revealEls.forEach(function (n) { n.classList.add('is-visible'); });
  }

  /* ============================================================
     Cookie consent banner
     ============================================================ */
  (function cookieConsent() {
    var KEY = 'cc-cookie-consent';
    var banner = document.getElementById('cookie-banner');
    var acceptBtn = document.getElementById('cookie-accept');
    var rejectBtn = document.getElementById('cookie-reject');
    if (!banner) return;

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
    if (saved) return; // already chose — never show again

    banner.hidden = false;
    // Move focus to the banner's first action for keyboard users after a beat,
    // without stealing focus from someone already typing.
    setTimeout(function () {
      if (document.activeElement === document.body) acceptBtn.focus();
    }, 1200);

    function choose(value) {
      try {
        localStorage.setItem(KEY, JSON.stringify({ choice: value, at: new Date().toISOString() }));
      } catch (e) { /* private mode: banner will re-show next visit */ }
      banner.classList.add('is-leaving');
      setTimeout(function () { banner.hidden = true; }, 400);
      document.dispatchEvent(new CustomEvent('cookie-consent', { detail: { choice: value } }));
    }

    acceptBtn.addEventListener('click', function () { choose('accepted-all'); });
    rejectBtn.addEventListener('click', function () { choose('rejected-non-essential'); });
    banner.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') choose('rejected-non-essential');
    });
  })();

  /* ============================================================
     Booking calendar
     ============================================================ */
  (function booking() {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DOWS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    var calMonthEl = document.getElementById('cal-month');
    var calGrid = document.getElementById('cal-grid');
    var slotsGrid = document.getElementById('slots-grid');
    var slotsHint = document.getElementById('slots-hint');
    var form = document.getElementById('book-form');
    var msg = document.getElementById('book-msg');

    var today = new Date();
    var view = { y: today.getFullYear(), m: today.getMonth() };
    var selectedDate = null;
    var selectedTime = null;
    var slotTimes = [];
    var bookedByDate = {}; // 'YYYY-MM-DD' -> Set of times

    function pad(n) { return n < 10 ? '0' + n : String(n); }
    function ymKey() { return view.y + '-' + pad(view.m + 1); }

    function fetchAvailability() {
      return fetch('/api/availability?month=' + ymKey())
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data.ok) return;
          slotTimes = data.slotTimes || [];
          bookedByDate = {};
          (data.booked || []).forEach(function (b) {
            if (!bookedByDate[b.slot_date]) bookedByDate[b.slot_date] = {};
            bookedByDate[b.slot_date][b.slot_time] = true;
          });
        })
        .catch(function () { /* offline / local preview — leave slots open */
          if (!slotTimes.length) slotTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
        });
    }

    function renderCalendar() {
      calMonthEl.textContent = MONTHS[view.m] + ' ' + view.y;
      calGrid.innerHTML = '';
      DOWS.forEach(function (d) {
        var c = el('div', 'cal-dow', d);
        c.setAttribute('role', 'columnheader');
        calGrid.appendChild(c);
      });

      var first = new Date(view.y, view.m, 1);
      var startPad = first.getDay();
      var daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
      var todayStr = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

      for (var i = 0; i < startPad; i++) {
        var blank = el('button', 'cal-day is-other');
        blank.disabled = true;
        blank.tabIndex = -1;
        calGrid.appendChild(blank);
      }
      for (var d = 1; d <= daysInMonth; d++) {
        (function (d) {
          var dateStr = view.y + '-' + pad(view.m + 1) + '-' + pad(d);
          var dow = new Date(view.y, view.m, d).getDay();
          var btn = el('button', 'cal-day', String(d));
          btn.type = 'button';
          var isPastOrToday = dateStr <= todayStr;
          var isWeekend = dow === 0 || dow === 6;
          if (isPastOrToday || isWeekend) {
            btn.disabled = true;
          } else {
            btn.setAttribute('aria-label', 'Choose ' + MONTHS[view.m] + ' ' + d + ', ' + view.y);
            if (dateStr === selectedDate) {
              btn.classList.add('is-selected');
              btn.setAttribute('aria-pressed', 'true');
            }
            btn.addEventListener('click', function () {
              selectedDate = dateStr;
              selectedTime = null;
              renderCalendar();
              renderSlots();
            });
          }
          calGrid.appendChild(btn);
        })(d);
      }
    }

    function renderSlots() {
      slotsGrid.innerHTML = '';
      if (!selectedDate) {
        slotsHint.textContent = 'Select a date first — calls are Monday to Friday, 30 minutes.';
        form.hidden = true;
        return;
      }
      var d = new Date(selectedDate + 'T12:00:00');
      slotsHint.textContent = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      var booked = bookedByDate[selectedDate] || {};
      slotTimes.forEach(function (t) {
        var btn = el('button', 'slot-btn', formatTime(t));
        btn.type = 'button';
        btn.setAttribute('role', 'option');
        if (booked[t]) {
          btn.disabled = true;
          btn.setAttribute('aria-label', formatTime(t) + ' — unavailable');
        } else {
          btn.setAttribute('aria-label', 'Choose ' + formatTime(t));
          if (t === selectedTime) {
            btn.classList.add('is-selected');
            btn.setAttribute('aria-selected', 'true');
          }
          btn.addEventListener('click', function () {
            selectedTime = t;
            renderSlots();
            form.hidden = false;
            document.getElementById('book-name').focus();
          });
        }
        slotsGrid.appendChild(btn);
      });
      form.hidden = !selectedTime;
    }

    function formatTime(t) {
      var parts = t.split(':');
      var h = parseInt(parts[0], 10);
      var ampm = h >= 12 ? 'PM' : 'AM';
      var h12 = h % 12 === 0 ? 12 : h % 12;
      return h12 + ':' + parts[1] + ' ' + ampm;
    }

    document.getElementById('cal-prev').addEventListener('click', function () {
      view.m--;
      if (view.m < 0) { view.m = 11; view.y--; }
      fetchAvailability().then(renderCalendar);
    });
    document.getElementById('cal-next').addEventListener('click', function () {
      view.m++;
      if (view.m > 11) { view.m = 0; view.y++; }
      fetchAvailability().then(renderCalendar);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!selectedDate || !selectedTime) return;
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      msg.className = 'form-msg';
      msg.textContent = '';
      fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          notes: form.notes.value,
          date: selectedDate,
          time: selectedTime
        })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.ok) {
            msg.className = 'form-msg ok';
            msg.textContent = "You're booked. Check your inbox for confirmation — the Zoom link follows shortly.";
            form.reset();
            form.hidden = true;
            selectedTime = null;
            return fetchAvailability().then(function () { renderCalendar(); renderSlots(); });
          }
          msg.className = 'form-msg err';
          msg.textContent = data.error || 'Something went wrong. Please try again.';
        })
        .catch(function () {
          msg.className = 'form-msg err';
          msg.textContent = 'Network error. Please try again.';
        })
        .then(function () { btn.disabled = false; });
    });

    fetchAvailability().then(function () {
      renderCalendar();
      renderSlots();
    });
  })();

  /* ============================================================
     Contact + newsletter forms
     ============================================================ */
  function wireForm(formId, msgId, endpoint, payload, okText) {
    var form = document.getElementById(formId);
    var msg = document.getElementById(msgId);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      msg.className = 'form-msg';
      msg.textContent = '';
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload(form))
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.ok) {
            msg.className = 'form-msg ok';
            msg.textContent = okText;
            form.reset();
          } else {
            msg.className = 'form-msg err';
            msg.textContent = data.error || 'Something went wrong. Please try again.';
          }
        })
        .catch(function () {
          msg.className = 'form-msg err';
          msg.textContent = 'Network error. Please try again.';
        })
        .then(function () { btn.disabled = false; });
    });
  }

  wireForm('contact-form', 'contact-msg', '/api/contact', function (f) {
    return { name: f.name.value, email: f.email.value, message: f.message.value };
  }, "Message sent. I'll get back to you soon.");

  wireForm('newsletter-form', 'newsletter-msg', '/api/subscribe', function (f) {
    return { name: f.name.value, email: f.email.value };
  }, "You're in. Check your inbox.");

})();
