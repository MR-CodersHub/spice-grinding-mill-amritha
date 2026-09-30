/* ==========================================================================
   SERVICES PAGE SCRIPT
   --------------------------------------------------------------------
   • Injects the inline SVG icons used in the static markup
   • Renders the 9-card catalogue grid from window.AMRITHA_SERVICES
   • Live search + category chips (registered with window.UI)
   • Renders the "at a glance" briefs table
   • Populates the enquiry form's service dropdown
   ========================================================================== */
(function (window, document) {
  'use strict';

  function injectIcons() {
    var K = window.PageKit;
    if (!K) return;
    var map = {
      'svc-search-icon': 'search',
      'icon-cold': 'flame',
      'icon-batch': 'layers',
      'icon-trace': 'shield',
      'icon-lab': 'flask',
      'icon-phone': 'phone',
      'icon-mail': 'mail',
      'icon-building': 'building'
    };
    K.qa('[id]').forEach(function (node) {
      var name = map[node.id];
      if (name) node.innerHTML = K.icon(name);
    });
  }

  function haystack(service) {
    return [
      service.name, service.category, service.tagline, service.summary,
      (service.tags || []).join(' ')
    ].join(' ').toLowerCase();
  }

  function state() {
    return { query: '', category: 'all' };
  }

  function render(services, view) {
    var K = window.PageKit;
    var visible = services.filter(function (service) {
      var catOk = view.category === 'all' || service.category === view.category;
      var queryOk = !view.query || haystack(service).indexOf(view.query) !== -1;
      return catOk && queryOk;
    });

    K.fill('service-grid', visible.map(K.serviceCard).join(''));

    var empty = K.q('#service-empty');
    if (empty) empty.classList.toggle('show', visible.length === 0);

    var counter = K.q('#service-count');
    if (counter) counter.textContent = String(visible.length);
  }

  function renderTable(services) {
    var K = window.PageKit;
    var body = K.q('#service-briefs tbody');
    if (!body) return;
    body.innerHTML = services.map(function (service) {
      return '<tr>' +
        '<th scope="row"><strong>' + K.esc(service.name) + '</strong></th>' +
        '<td>' + K.esc(service.category) + '</td>' +
        '<td>' + K.esc(service.turnaround) + '</td>' +
        '<td>' + K.esc(service.minOrder) + '</td>' +
        '<td>' + K.esc(service.summary.length > 92 ? service.summary.slice(0, 92) + '…' : service.summary) + '</td>' +
        '<td><a class="card-link" href="' + K.esc(K.serviceHref(service.id)) + '">Open ' + K.icon('arrowRight') + '</a></td>' +
      '</tr>';
    }).join('');
  }

  function populateSelect(services) {
    var K = window.PageKit;
    var select = K.q('#enq-service');
    if (!select) return;
    select.innerHTML =
      '<option value="unsure">Not sure — advise me</option>' +
      services.map(function (service) {
        return '<option value="' + K.esc(service.id) + '">' + K.esc(service.name) + '</option>';
      }).join('');
  }

  function boot() {
    injectIcons();

    var K = window.PageKit;
    var services = window.AMRITHA_SERVICES || [];
    if (!K || !services.length) return;

    var view = state();
    render(services, view);
    renderTable(services);
    populateSelect(services);

    /* Category chips are wired by ui.js — it calls back into registerFilter */
    if (window.UI) {
      window.UI.registerFilter('services', function (value) {
        view.category = value;
        render(services, view);
      });
    }

    /* Debounced live search over name, tagline, summary and tags */
    var input = K.q('#service-search');
    if (input) {
      var timer = null;
      input.addEventListener('input', function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          view.query = input.value.trim().toLowerCase();
          render(services, view);
        }, 160);
      });
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          input.value = '';
          view.query = '';
          render(services, view);
        }
      });
    }

    /* Deep link support: services.html?category=trade */
    var requested = K.param('category');
    if (requested) {
      var chip = K.q('[data-filter-value="' + requested.replace(/"/g, '') + '"]');
      if (chip) chip.click();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
