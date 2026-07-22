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

  function initialsOf(name) {
    var words = name.replace(/[^A-Za-z0-9& ]/g, '').split(/[\s&]+/).filter(Boolean);
    var first = words[0] ? words[0][0] : '';
    var second = words[1] ? words[1][0] : '';
    return (first + second).toUpperCase();
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
      portrait.appendChild(el('span', 'initials', initialsOf(t.name)));
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
     Render: trusted-by names (photo + dash + name)
     Photos live at /assets/names/<slug>.jpg, e.g. "Dr. Daniel Pompa"
     → /assets/names/dr-daniel-pompa.jpg. Missing photos fall back
     to a subtle blank circle.
     ============================================================ */
  function nameSlug(n) {
    return n.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  var namesList = document.getElementById('names-list');
  NAMES.forEach(function (n) {
    var row = el('span', 'name');
    var photo = el('span', 'name-photo');
    var img = document.createElement('img');
    img.src = '/assets/names/' + nameSlug(n) + '.jpg';
    img.alt = '';
    img.loading = 'lazy';
    img.onerror = function () {
      photo.innerHTML = '';
      photo.appendChild(el('span', 'initials', initialsOf(n)));
    };
    photo.appendChild(img);
    row.appendChild(photo);
    row.appendChild(el('span', 'name-dash', '—'));
    row.appendChild(el('span', 'name-label', n));
    namesList.appendChild(row);
  });

  /* ============================================================
     Video players (hero VSL + all testimonial videos)
     ============================================================ */
  // Two modes per video:
  //  - preview: muted, looping, auto-starts on hover or when scrolled into
  //    view, pauses when the pointer leaves or it scrolls away
  //  - engaged: user clicked — sound on, native controls, previews elsewhere stop
  function wireVideo(container) {
    var video = container.querySelector('video');
    if (!video) return;

    // Show the video's own first frame instead of the striped placeholder
    video.addEventListener('loadeddata', function () {
      container.classList.add('has-frame');
    });
    if (video.readyState >= 2) container.classList.add('has-frame');

    function startPreview() {
      if (container.classList.contains('is-playing')) return;
      if (document.querySelector('.is-playing')) return; // don't compete with an engaged video
      video.muted = true;
      video.loop = true;
      video.play().then(function () {
        container.classList.add('is-previewing');
      }).catch(function () { /* not loaded yet / autoplay blocked */ });
    }

    function stopPreview() {
      if (container.classList.contains('is-playing')) return;
      video.pause();
      container.classList.remove('is-previewing');
    }

    function engage() {
      document.querySelectorAll('.vsl, .testi-video').forEach(function (c) {
        if (c === container) return;
        var v = c.querySelector('video');
        if (v && !v.paused) v.pause();
        c.classList.remove('is-playing', 'is-previewing');
        if (v) v.controls = false;
      });
      video.muted = false;
      video.loop = false;
      video.currentTime = 0;
      video.play().then(function () {
        container.classList.remove('is-previewing');
        container.classList.add('is-playing');
        video.controls = true;
      }).catch(function () {
        container.classList.remove('is-playing');
      });
    }

    container.addEventListener('mouseenter', startPreview);
    container.addEventListener('mouseleave', stopPreview);

    container.addEventListener('click', function (e) {
      if (container.classList.contains('is-playing')) return; // native controls take over
      e.preventDefault();
      engage();
    });
    container.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && !container.classList.contains('is-playing')) {
        e.preventDefault();
        engage();
      }
    });
    video.addEventListener('ended', function () {
      container.classList.remove('is-playing');
      video.controls = false;
    });

    // Auto-start (muted) while scrolled into view, stop when scrolled away
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) startPreview();
          else {
            if (container.classList.contains('is-playing')) {
              video.pause(); // engaged video also stops when scrolled away
              container.classList.remove('is-playing');
              video.controls = false;
            } else {
              stopPreview();
            }
          }
        });
      }, { threshold: 0.55 });
      vio.observe(container);
    }
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
