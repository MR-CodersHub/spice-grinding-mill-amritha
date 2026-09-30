/* ==========================================================================
   404 PAGE SCRIPT
   --------------------------------------------------------------------
   Handles both the 404 page and any coming-soon page, since the two share
   a hero, a route list and a service preview. Kept as one file so the
   markup contract stays identical across the pair.

   Provides:
     • a site search across services, journal articles and static pages
     • the "usual suspects" route cards
     • a service preview grid
   ========================================================================== */
(function (window, document) {
  'use strict';

  var ROUTES = [
    { icon: 'layers', title: 'Service catalogue', text: 'All nine mill services, with turnaround, minimums and what each one costs.', href: 'services.html' },
    { icon: 'book', title: 'The Journal', text: 'Measured comparisons, sourcing reports and blend development, written in the mill.', href: 'blog.html' },
    { icon: 'tag', title: 'Plans & pricing', text: 'Four standing arrangements, the three promises, and what actually moves a price.', href: 'pricing.html' },
    { icon: 'pin', title: 'Contact & visit', text: 'The trade desk, opening hours, and how to find us on Bazaar Road.', href: 'contact.html' },
    { icon: 'training', title: 'Chef programme', text: 'Two-day and three-day courses on the mill floor, six seats per cohort.', href: 'home-2.html' },
    { icon: 'info', title: 'Help centre', text: 'Thirty answers on granule, storage, shipping, gifting and private label.', href: 'FAQ.html' }
  ];

  var PAGES = [
    { title: 'The Amritha Spice Mill — home', href: '../index.html', text: 'Heritage cold stone-ground spices from Mattancherry, Kochi.' },
    { title: 'Our Story', href: 'about.html', text: 'Three generations on the same stones, since 1948.' },
    { title: 'Service catalogue', href: 'services.html', text: 'Nine services: milling, blending, grading, bulk, private label, consultancy, gifting, training, oils.' },
    { title: 'Plans & pricing', href: 'pricing.html', text: 'Pantry, Kitchen, Restaurant and Contract plans.' },
    { title: 'The Journal', href: 'blog.html', text: 'Nine long-form articles on spices, sourcing and the mill.' },
    { title: 'Contact & visit', href: 'contact.html', text: 'Trade desk, WhatsApp, opening hours and directions.' },
    { title: 'Chef & restaurant programme', href: 'home-2.html', text: 'Kitchen training on the mill floor in Kochi.' },
    { title: 'Help centre', href: 'FAQ.html', text: 'Answers to the questions we are asked most.' },
    { title: 'Privacy policy', href: 'Privacy-policy.html', text: 'What we collect, why, and how to get it back or deleted.' },
    { title: 'Terms of service', href: 'Terms-of-service.html', text: 'Orders, quotes, minimums, claims and liability.' }
  ];

  function injectIcons() {
    var K = window.PageKit;
    var search = K.q('#error-search-icon');
    if (search) search.innerHTML = K.icon('search');
  }

  function renderRoutes() {
    var K = window.PageKit;
    K.fill('route-cards', ROUTES.map(function (route) {
      return '<a class="icon-card reveal" href="' + K.esc(route.href) + '" style="text-decoration:none;">' +
        '<div class="icon-wrap">' + K.icon(route.icon) + '</div>' +
        '<h3>' + K.esc(route.title) + '</h3>' +
        '<p>' + K.esc(route.text) + '</p>' +
      '</a>';
    }).join(''));
  }

  function renderServicePreview() {
    var K = window.PageKit;
    var services = (window.AMRITHA_SERVICES || []).slice(0, 3);
    K.fill('service-preview', services.map(K.serviceCard).join(''));
  }

  /* ------------------------------------------------------------------ */
  /* Site search                                                         */
  /* ------------------------------------------------------------------ */
  function search(query) {
    var K = window.PageKit;
    var needle = query.trim().toLowerCase();
    if (!needle) return [];

    var results = [];

    (window.AMRITHA_SERVICES || []).forEach(function (service) {
      var hay = [service.name, service.tagline, service.summary, service.category, (service.tags || []).join(' ')]
        .join(' ').toLowerCase();
      if (hay.indexOf(needle) !== -1) {
        results.push({
          kind: 'Service brief',
          title: service.name,
          text: service.tagline,
          href: K.serviceHref(service.id)
        });
      }
    });

    (window.AMRITHA_POSTS || []).forEach(function (post) {
      var hay = [post.title, post.excerpt, post.category, post.author, (post.tags || []).join(' ')]
        .join(' ').toLowerCase();
      if (hay.indexOf(needle) !== -1) {
        results.push({
          kind: 'Journal · ' + post.readTime + ' min read',
          title: post.title,
          text: post.excerpt,
          href: K.postHref(post.id)
        });
      }
    });

    PAGES.forEach(function (page) {
      var hay = (page.title + ' ' + page.text).toLowerCase();
      if (hay.indexOf(needle) !== -1) {
        results.push({ kind: 'Page', title: page.title, text: page.text, href: page.href });
      }
    });

    return results;
  }

  function renderResults(query) {
    var K = window.PageKit;
    var results = search(query);

    var section = K.q('#search-section');
    if (section) section.hidden = false;

    K.q('#search-results').innerHTML = results.length
      ? '<div class="grid grid-2" style="gap:20px;">' + results.slice(0, 12).map(function (result) {
          return '<a class="card" href="' + K.esc(result.href) + '" style="text-decoration:none;display:block;">' +
            '<div class="card-body">' +
              '<span class="blog-cat">' + K.esc(result.kind) + '</span>' +
              '<h3 style="font-size:1.12rem;margin-top:8px;">' + K.esc(result.title) + '</h3>' +
              '<p style="font-size:.88rem;">' + K.esc(result.text) + '</p>' +
            '</div>' +
          '</a>';
        }).join('') + '</div>'
      : '';

    var empty = K.q('#error-empty');
    if (empty) empty.classList.toggle('show', results.length === 0);

    var count = K.q('#error-count');
    if (count) count.textContent = String(results.length);
  }

  function setupSearch() {
    var K = window.PageKit;
    var input = K.q('#error-search');
    if (!input) return;

    /* Deep link: 404.html?q=turmeric */
    var initial = K.param('q');
    if (initial) {
      input.value = initial;
      renderResults(initial);
      var section = K.q('#search-section');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    var timer = null;
    input.addEventListener('input', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () { renderResults(input.value); }, 180);
    });
  }

  function boot() {
    if (!window.PageKit) return;
    injectIcons();
    renderRoutes();
    renderServicePreview();
    setupSearch();
    if (window.UI) window.UI.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
