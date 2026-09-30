/* ==========================================================================
   CONTACT PAGE SCRIPT
   --------------------------------------------------------------------
   • Populates the service dropdown from window.AMRITHA_SERVICES
   • Reads ?topic= and ?plan= so the navbar, pricing cards and the
     "request trade terms" links arrive with the form already filled in
   • Renders the "five things we always ask for" grid
   • Fills the inline icons
   ========================================================================== */
(function (window, document) {
  'use strict';

  var ASK_FOR = [
    { icon: 'recipe', title: 'The dish or the product', text: 'Not the brand — the dish. What goes in it, and what it is supposed to taste like when it is right.' },
    { icon: 'package', title: 'The quantity, per month', text: 'Per month rather than per order. It decides which line of the catalogue is realistic for you.' },
    { icon: 'sieve', title: 'The granule you want', text: 'Fine for saree, medium for masala, coarse for pickling. If you are unsure, say so — we will send samples.' },
    { icon: 'label', title: 'The packaging', text: 'Plain foil pouch, printed pouch or rigid box. If you have artwork, send it early, it is the long pole.' },
    { icon: 'clock', title: 'The date it is needed by', text: 'A real date, not an aspiration. It decides whether the run goes on the slow schedule or the rush one.' }
  ];

  /* Narration used when a link pre-fills the form, keyed by ?topic= */
  var TOPIC_NOTES = {
    'custom-blend': 'You are one click from a custom blend enquiry. Tell us the dish it is for, the components you already have, and the intensity you are chasing.',
    'trade-terms': 'Trade terms are available to registered kitchens and hotels. Tell us the trading name, the registration number if you have one, and roughly what you buy each month.',
    'bulk': 'For bulk or contract supply, the monthly volume and the number of sites are the two things that decide the rate. Everything else we can work around.',
    'private-label': 'For private label, the artwork status matters more than anything else. Send what you have, even a rough mock-up, and we will tell you what is feasible.',
    'training': 'For kitchen training, tell us the cohort size, the level, and whether you want the theory, the technique, or both.',
    'gifting': 'For hampers and gifting, tell us the number of kits, the month, and whether the packaging needs to carry a message or a name.',
    'visit': 'To book a visit, tell us how many people are coming and which day suits. We close the mill floor to visitors on Sundays.'
  };

  var PLAN_NOTES = {
    'pantry': 'You were looking at the Pantry plan. If the volume turns out to be higher, we will say so rather than let you overpay for the wrong tier.',
    'kitchen': 'You were looking at the Kitchen plan. The most useful thing you can tell us is which dishes it is for.',
    'restaurant': 'You were looking at the Restaurant plan. Tell us the number of sites and your current monthly volume so we can check the break point.',
    'contract': 'You were looking at a Contract. Send the specification and the annual volume, and we will come back with contracted rates.'
  };

  function injectIcons() {
    var K = window.PageKit;
    K.qa('[data-contact-icon]').forEach(function (node) {
      node.innerHTML = K.icon(node.getAttribute('data-contact-icon'));
    });
    K.qa('[data-dept-icon]').forEach(function (node) {
      node.innerHTML = K.icon(node.getAttribute('data-dept-icon'));
    });
    var note = K.q('[data-note-icon]');
    if (note) note.innerHTML = K.icon(note.getAttribute('data-note-icon') || 'info');
  }

  function renderAskFor() {
    var K = window.PageKit;
    K.fill('ask-for', ASK_FOR.map(function (item) {
      return '<div class="icon-card reveal">' +
        '<div class="icon-wrap">' + K.icon(item.icon) + '</div>' +
        '<h3>' + K.esc(item.title) + '</h3>' +
        '<p>' + K.esc(item.text) + '</p>' +
      '</div>';
    }).join(''));
  }

  function populateServices() {
    var K = window.PageKit;
    var services = window.AMRITHA_SERVICES || [];
    if (!services.length) return;

    var select = K.q('#c-service');
    if (!select) return;
    select.innerHTML =
      '<option value="unsure">Not sure — advise me</option>' +
      services.map(function (service) {
        return '<option value="' + K.esc(service.id) + '">' + K.esc(service.name) + '</option>';
      }).join('');
  }

  /* ------------------------------------------------------------------ */
  /* Deep links: ?topic=… and ?plan=…                                    */
  /* ------------------------------------------------------------------ */
  function applyDeepLink() {
    var K = window.PageKit;
    var topic = K.param('topic');
    var plan = K.param('plan');
    var intro = K.q('#form-intro');
    var message = K.q('#c-message');

    var note = null;
    var placeholder = null;

    if (topic && TOPIC_NOTES[topic]) {
      var select = K.q('#c-topic');
      if (select) select.value = topic;
      note = TOPIC_NOTES[topic];
    }

    if (plan && PLAN_NOTES[plan]) {
      note = PLAN_NOTES[plan];
    }

    if (note) {
      if (intro) intro.textContent = note;
      if (message && !message.value) {
        message.placeholder = 'Start with the dish or product, the quantity, and the date it is needed by.';
      }
      var heading = K.q('#form-heading');
      if (heading && !plan && !topic) heading.textContent = 'Tell Us What You Need';

      /* Bring the form into view so the visitor can see it is ready. */
      if (window.location.hash !== '#enquiry') {
        var form = K.q('#contact-form');
        if (form) form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  function boot() {
    if (!window.PageKit) return;
    injectIcons();
    renderAskFor();
    populateServices();
    applyDeepLink();
    if (window.UI) window.UI.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
