/* ==========================================================================
   PRICING PAGE SCRIPT
   --------------------------------------------------------------------
   • Renders the four plans and swaps the figures between pay-per-use and
     annual contract
   • Renders the service price index from window.AMRITHA_SERVICES
   • Renders the pricing FAQ accordion
   • Fills the inline icons used by the static markup
   ========================================================================== */
(function (window, document) {
  'use strict';

  var ANNUAL_DISCOUNT = 0.18;

  var PLANS = [
    {
      id: 'pantry',
      name: 'Pantry',
      for: 'Home kitchens & serious cooks',
      perUse: 1200,
      annual: 990,
      ribbon: null,
      trial: 'Free calibration pack with the first order',
      features: [
        'Up to 5 kg of single-origin spice a month',
        'Two granule profiles: fine and medium',
        'Batch card with every delivery',
        'Blends developed at 10 kg minimum'
      ],
      cta: 'Start with Pantry'
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      for: 'Restaurants up to 50 kg a month',
      perUse: 3900,
      annual: 3200,
      ribbon: 'Most chosen',
      trial: 'Blend trial batch before you commit',
      features: [
        'Up to 50 kg a month across all services',
        'All four granule profiles',
        'Custom masala development included',
        'One on-site calibration visit a year'
      ],
      cta: 'Start with Kitchen'
    },
    {
      id: 'restaurant',
      name: 'Restaurant',
      for: 'Multi-site kitchens & hotels',
      perUse: 9800,
      annual: 8000,
      ribbon: null,
      trial: 'Dispatch inside 24–48 hours',
      features: [
        'Up to 250 kg a month, single invoice',
        'Named contact at the mill',
        'Lab report with every delivery',
        'Private-label packaging from 100 kg'
      ],
      cta: 'Start with Restaurant'
    },
    {
      id: 'contract',
      name: 'Contract',
      for: 'Manufacturers & distributors',
      perUse: null,
      annual: null,
      ribbon: null,
      trial: 'Quoted against your specification',
      features: [
        'Unlimited volume at contracted rates',
        'Custom tooling and granule profiles',
        'Quarterly calibration visits',
        '60 days of free storage'
      ],
      cta: 'Request a contract quote'
    }
  ];

  var PRICING_FAQ = [
    {
      q: 'Why do you not publish fixed per-kilogram prices?',
      a: 'Because they would be wrong within a month. Raw spice moves with every harvest, and a confident-looking number from eight months ago helps nobody. What we publish instead is the entry point for each service and exactly which three factors move it.'
    },
    {
      q: 'What is the smallest order I can place?',
      a: 'Cold stone milling starts at 250 g, and a masala blend at 500 g. Whole-spice grading and cleaning start at 25 kg because the machinery has a minimum charge. Every brief states its own minimum.'
    },
    {
      q: 'Is the annual contract cheaper?',
      a: 'Yes — 18% below the pay-per-use figure, in exchange for a committed volume and a scheduled dispatch day. There is no joining fee and you can leave at the end of the term with thirty days notice.'
    },
    {
      q: 'Do you charge for storage?',
      a: 'Not for the first 30 days after dispatch on any plan. Beyond that, contracted customers get 60 days free and then a nominal pallet rate. Pantry customers are asked to collect or we ship.'
    },
    {
      q: 'What happens if a batch is wrong?',
      a: 'Tell us within 14 days and we re-mill it at no charge. In most cases it is granule size rather than the spice itself, and re-milling is cheaper than replacing the raw material.'
    },
    {
      q: 'Do you ship outside India?',
      a: 'Yes, to 34 countries. Air freight to the Gulf, the UK and the EU is quoted per consignment, and we ship spices by sea in food-grade lined containers for volume orders.'
    },
    {
      q: 'Can I buy a one-off batch without a plan?',
      a: 'Yes. Every service can be bought as a single order at its listed entry price. The plans exist for kitchens that want scheduled dispatch, volume rates and named contact.'
    },
    {
      q: 'How do private-label setups work?',
      a: 'Three to four weeks from artwork approval. You supply or approve the artwork, we quote the packaging, print and tooling, and every pack carries your batch code alongside ours.'
    }
  ];

  /* ------------------------------------------------------------------ */
  /* Plans                                                               */
  /* ------------------------------------------------------------------ */
  function planCard(plan, mode) {
    var K = window.PageKit;
    var price = mode === 'annual' ? plan.annual : plan.perUse;

    var priceHtml = price === null
      ? '<span class="cur" style="font-size:1.5rem;">Quoted</span>'
      : '<span class="cur">₹</span>' + K.inr(price);

    return '<div class="plan-card' + (plan.ribbon ? ' featured' : '') + '">' +
      (plan.ribbon ? '<span class="plan-ribbon">' + K.esc(plan.ribbon) + '</span>' : '') +
      '<div class="plan-name">' + K.esc(plan.name) + '</div>' +
      '<div class="plan-for">' + K.esc(plan.for) + '</div>' +
      '<div class="plan-price">' + priceHtml +
        '<div class="per" style="margin-top:8px;">' +
          (price === null ? 'against your specification' : 'per month, ' + (mode === 'annual' ? 'billed annually' : 'pay as you go')) +
        '</div>' +
      '</div>' +
      '<div class="plan-trial">' + K.icon('checkCircle') + K.esc(plan.trial) + '</div>' +
      '<ul class="col-check">' + plan.features.map(function (feature) {
        return '<li>' + K.esc(feature) + '</li>';
      }).join('') + '</ul>' +
      '<a class="btn ' + (plan.ribbon ? 'btn-primary' : 'btn-outline-dark') + ' btn-block" ' +
        'href="contact.html?plan=' + encodeURIComponent(plan.id) + '">' + K.esc(plan.cta) + '</a>' +
    '</div>';
  }

  function renderPlans(mode) {
    var K = window.PageKit;
    K.fill('plan-grid', PLANS.map(function (plan) { return planCard(plan, mode); }).join(''));

    var note = K.q('#save-note');
    if (note) {
      note.textContent = mode === 'annual'
        ? 'Annual pricing shown — ' + Math.round(ANNUAL_DISCOUNT * 100) + '% below pay-per-use'
        : 'Switch to an annual contract and save ' + Math.round(ANNUAL_DISCOUNT * 100) + '%';
    }
  }

  function setupBillingToggle() {
    var K = window.PageKit;
    var group = K.q('[data-billing-toggle]');
    if (!group) return;

    var buttons = Array.prototype.slice.call(group.querySelectorAll('button[data-billing]'));
    var mode = 'per-use';

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        mode = button.getAttribute('data-billing');
        buttons.forEach(function (b) { b.classList.toggle('active', b === button); });
        renderPlans(mode);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Service price index                                                 */
  /* ------------------------------------------------------------------ */
  function renderPriceIndex() {
    var K = window.PageKit;
    var services = window.AMRITHA_SERVICES || [];
    if (!services.length) return;

    K.q('#price-index').innerHTML = services.map(function (service) {
      var tier = service.pricing[1] || service.pricing[0];
      var figure = tier.price === null
        ? 'Quoted'
        : '₹' + K.inr(tier.price) + ' ' + K.esc(tier.unit);

      return '<a href="' + K.esc(K.serviceHref(service.id)) + '" ' +
        'style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;' +
        'padding-bottom:10px;border-bottom:1px solid var(--line-hair);text-decoration:none;">' +
        '<span style="font-size:.86rem;font-weight:600;color:var(--color-primary);">' + K.esc(service.name) + '</span>' +
        '<span style="font-size:.82rem;color:var(--color-soft-gold);font-weight:700;white-space:nowrap;">' + figure + '</span>' +
      '</a>';
    }).join('');
  }

  /* ------------------------------------------------------------------ */
  /* FAQ + icons                                                         */
  /* ------------------------------------------------------------------ */
  function renderFaq() {
    var K = window.PageKit;
    K.q('#pricing-faq').innerHTML = PRICING_FAQ.map(function (item) {
      return '<div class="faq-item">' +
        '<button class="faq-question" type="button">' + K.esc(item.q) +
          '<span class="faq-icon" aria-hidden="true">' + K.icon('chevronDown') + '</span>' +
        '</button>' +
        '<div class="faq-answer"><div class="faq-answer-inner"><p>' + K.esc(item.a) + '</p></div></div>' +
      '</div>';
    }).join('');
  }

  function injectIcons() {
    var K = window.PageKit;
    K.qa('[data-guarantee-icon]').forEach(function (node) {
      node.innerHTML = K.icon(node.getAttribute('data-guarantee-icon'));
    });
    var note = K.q('[data-note-icon]');
    if (note) note.innerHTML = K.icon(note.getAttribute('data-note-icon') || 'info');
  }

  function boot() {
    if (!window.PageKit) return;
    renderPlans('per-use');
    renderPriceIndex();
    renderFaq();
    injectIcons();
    setupBillingToggle();
    if (window.UI) window.UI.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
