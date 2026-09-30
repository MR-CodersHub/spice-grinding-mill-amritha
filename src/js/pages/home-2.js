/* ==========================================================================
   CHEF & RESTAURANT PROGRAMME PAGE SCRIPT (home-2.html)
   --------------------------------------------------------------------
   Renders the three programmes, the cohort run-of-play, the student
   testimonials, the upcoming cohort dates and the programme dropdown,
   then fills the inline icons used by the static markup.
   ========================================================================== */
(function (window, document) {
  'use strict';

  var PROGRAMMES = [
    {
      id: 'two-day',
      name: 'The Two-Day Intensive',
      for: 'Working chefs · one dish',
      price: 14500,
      ribbon: 'Most booked',
      trial: 'Includes two kilos of your own blend',
      features: [
        'Eight sessions across two days, on the mill floor',
        'Four granule profiles compared side by side',
        'Build a masala for a dish you bring with you',
        'Storage, rotation and costing covered',
        'Reference card to take away'
      ],
      cta: 'Book the two-day'
    },
    {
      id: 'three-day',
      name: 'The Three-Day Studio',
      for: 'Multi-dish kitchens',
      price: 21500,
      ribbon: null,
      trial: 'Includes a written costing sheet',
      features: [
        'Everything in the two-day, plus a third day',
        'Develop two blends and cost both',
        'Blend scaling: 2 kg up to 200 kg',
        'Private-label packaging walkthrough',
        'Two kilos of each blend to take home'
      ],
      cta: 'Book the three-day'
    },
    {
      id: 'residency',
      name: 'The Residency',
      for: 'Chefs who will run the bench',
      price: null,
      ribbon: null,
      trial: 'One place per cohort',
      features: [
        'One month on the mill floor, four days a week',
        'Blend development for a live menu',
        'Sourcing trip to one of our five regions',
        'Stock rotation and supplier negotiation',
        'A reference letter, if you want one'
      ],
      cta: 'Ask about the residency'
    }
  ];

  var RUN_OF_PLAY = [
    {
      step: '01',
      title: 'Arrival and the smell',
      text: 'Coffee on the packing bench, then straight to the mill floor while the stones are turning. Nobody talks for the first twenty minutes.'
    },
    {
      step: '02',
      title: 'Raw material and origin',
      text: 'Five regions, five harvests, and what actually changes between them. You will handle whole pepper, green cardamom, Guntur chilli and Salem turmeric.'
    },
    {
      step: '03',
      title: 'The four granule profiles',
      text: 'The same spice ground four ways, tasted side by side. This is the session people argue about, and they are usually wrong about their first guess.'
    },
    {
      step: '04',
      title: 'The lab bench',
      text: 'Moisture, volatile oil and curcumin on a meter you can use yourself afterwards. What the numbers mean, and where they stop being useful.'
    },
    {
      step: '05',
      title: 'Building your blend',
      text: 'Components roasted separately, ground in small charges, assembled by weight. You do the work; we argue about ratios.'
    },
    {
      step: '06',
      title: 'Cooking it and judging it',
      text: 'Your blend goes into your dish. Then the honest part: it is tasted blind by everyone in the room, including the person who paid for the course.'
    },
    {
      step: '07',
      title: 'Storage and rotation',
      text: 'Container, temperature, head-space and how long you genuinely have. Most kitchens lose a third of their stock in the first three months.'
    },
    {
      step: '08',
      title: 'Costing and reorder',
      text: 'Cost per portion at four volumes, and how to reorder so the batch card stays consistent. Then the trade desk takes your questions.'
    }
  ];

  var TESTIMONIALS = [
    {
      text: 'I came believing my masala problem was my cook. It was my cardamom — the oil had left it months before it reached my kitchen. Three cohorts later I have a granule card taped inside the prep door.',
      name: 'Chef Anita Menon',
      role: 'Head Chef, Copper Leaf · Bengaluru',
      rating: 5
    },
    {
      text: 'The two kilos I took home were the first spice I have ever been able to explain to my supplier. That has made the last four years of ordering much cheaper.',
      name: 'Daniel Okafor',
      role: 'Owner, Ember & Rye · London',
      rating: 5
    },
    {
      text: 'We sent four chefs. All four changed our pepper masala within a fortnight, and the dish cost went down because we stopped buying a masala at all.',
      name: 'Chef Radhika Iyer',
      role: 'Group Executive Chef · Chennai',
      rating: 4
    }
  ];

  var COHORTS = [
    { date: '14 – 15 November', seats: '2 seats left', tone: 'success' },
    { date: '5 – 7 December', seats: 'Full — waiting list', tone: 'danger' },
    { date: '16 – 17 January', seats: 'Open', tone: 'success' },
    { date: '13 – 15 February', seats: 'Open', tone: 'success' }
  ];

  function programmeCard(programme) {
    var K = window.PageKit;
    var price = programme.price === null
      ? '<span class="cur" style="font-size:1.5rem;">By application</span>'
      : '<span class="cur">₹</span>' + K.inr(programme.price);

    return '<div class="plan-card' + (programme.ribbon ? ' featured' : '') + '">' +
      (programme.ribbon ? '<span class="plan-ribbon">' + K.esc(programme.ribbon) + '</span>' : '') +
      '<div class="plan-name">' + K.esc(programme.name) + '</div>' +
      '<div class="plan-for">' + K.esc(programme.for) + '</div>' +
      '<div class="plan-price">' + price +
        '<div class="per" style="margin-top:8px;">' +
          (programme.price === null ? 'one place per cohort' : 'per seat, all raw material included') +
        '</div>' +
      '</div>' +
      '<div class="plan-trial">' + K.icon('checkCircle') + K.esc(programme.trial) + '</div>' +
      '<ul class="col-check">' + programme.features.map(function (feature) {
        return '<li>' + K.esc(feature) + '</li>';
      }).join('') + '</ul>' +
      '<a class="btn ' + (programme.ribbon ? 'btn-primary' : 'btn-outline-dark') + ' btn-block" ' +
        'href="#enrol-heading" data-programme="' + K.esc(programme.id) + '">' + K.esc(programme.cta) + '</a>' +
    '</div>';
  }

  function renderProgrammes() {
    var K = window.PageKit;
    K.fill('programme-grid', PROGRAMMES.map(programmeCard).join(''));

    var select = K.q('#pe-cohort');
    if (select) {
      select.innerHTML = '<option value="unsure">Not sure — advise me</option>' +
        PROGRAMMES.map(function (programme) {
          return '<option value="' + K.esc(programme.id) + '">' + K.esc(programme.name) + '</option>';
        }).join('');
    }
  }

  function renderRunOfPlay() {
    var K = window.PageKit;
    K.fill('cohort-process', RUN_OF_PLAY.map(function (item) {
      return '<div class="process-step reveal">' +
        '<div class="process-num">' + K.esc(item.step) + '</div>' +
        '<h3>' + K.esc(item.title) + '</h3>' +
        '<p>' + K.esc(item.text) + '</p>' +
      '</div>';
    }).join(''));
  }

  function renderTestimonials() {
    var K = window.PageKit;
    K.fill('testimonial-grid', TESTIMONIALS.map(function (item) {
      return '<div class="quote-card reveal">' +
        '<div class="quote-mark" aria-hidden="true">&ldquo;</div>' +
        '<p class="quote-text">' + K.esc(item.text) + '</p>' +
        '<div class="quote-author">' +
          '<span class="avatar">' + K.esc(item.name.replace(/^Chef\s+/, '').split(' ').map(function (part) {
            return part.charAt(0);
          }).join('').slice(0, 2).toUpperCase()) + '</span>' +
          '<div><strong>' + K.esc(item.name) + '</strong><span>' + K.esc(item.role) + '</span></div>' +
        '</div>' +
        '<div class="stars" style="margin-top:14px;" aria-label="' + item.rating + ' out of 5">' + K.stars(item.rating) + '</div>' +
      '</div>';
    }).join(''));
  }

  function renderCohorts() {
    var K = window.PageKit;
    K.q('#cohort-dates').innerHTML = COHORTS.map(function (cohort) {
      return '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;' +
        'padding-bottom:11px;border-bottom:1px solid var(--line-hair);margin-bottom:11px;">' +
        '<strong style="font-size:.88rem;color:var(--color-primary);">' + K.esc(cohort.date) + '</strong>' +
        '<span class="pill' + (cohort.tone === 'success' ? ' gold' : '') + '">' + K.esc(cohort.seats) + '</span>' +
      '</div>';
    }).join('');
  }

  function renderImage() {
    var K = window.PageKit;
    var IMG = window.AMRITHA_IMG || {};
    var node = K.q('#programme-image');
    if (!node) return;
    node.setAttribute('src', IMG.stepGrind || IMG.masala);
    node.setAttribute('alt', 'Spice being ground on the mill stones during a cohort session');
  }

  function injectIcons() {
    var K = window.PageKit;
    var note = K.q('[data-note-icon]');
    if (note) note.innerHTML = K.icon(note.getAttribute('data-note-icon') || 'info');
  }

  /* A programme card pre-selects itself in the enrolment form. */
  function setupProgrammeLinks() {
    var K = window.PageKit;
    K.qa('[data-programme]').forEach(function (link) {
      link.addEventListener('click', function () {
        var select = K.q('#pe-cohort');
        if (select) select.value = link.getAttribute('data-programme');
      });
    });
  }

  function boot() {
    if (!window.PageKit) return;
    renderProgrammes();
    renderRunOfPlay();
    renderTestimonials();
    renderCohorts();
    renderImage();
    injectIcons();
    setupProgrammeLinks();
    if (window.UI) window.UI.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
