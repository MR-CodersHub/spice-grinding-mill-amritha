/* ==========================================================================
   PAGE KIT — tiny helpers shared by every page-specific script
   --------------------------------------------------------------------
   No framework, no dependencies beyond the data libraries. Provides:
     • base-path resolution from <body data-base>
     • query-string reader (?id=… , ?topic=…)
     • HTML escaping
     • inline-icon lookup (window.AMRITHA_ICONS)
     • Indian-number formatting for prices
     • article-block renderer used by blog-details.html
   ========================================================================== */
(function (window, document) {
  'use strict';

  var body = document.body;

  var BASE = body ? (body.getAttribute('data-base') || './') : './';
  var PAGE = body ? (body.getAttribute('data-page') || '') : '';

  function q(selector, scope) { return (scope || document).querySelector(selector); }
  function qa(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function param(name, fallback) {
    var value = new URLSearchParams(window.location.search).get(name);
    return value === null ? (fallback === undefined ? '' : fallback) : value;
  }

  var ENTITIES = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  };

  function esc(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/[&<>"']/g, function (ch) { return ENTITIES[ch]; });
  }

  /* Icons are authored with <strong> for label text in a few places, so we
     only escape when the value is not already markup. */
  function icon(name, className) {
    var set = window.AMRITHA_ICONS || {};
    var svg = set[name];
    if (!svg) return '';
    if (className) return svg.replace('<svg', '<svg class="' + className + '"');
    return svg;
  }

  /* Indian grouping: 2450 → "2,450" · 125000 → "1,25,000" */
  function inr(number) {
    if (number === null || number === undefined) return '';
    var str = String(Math.round(Math.abs(number)));
    if (str.length <= 3) return (number < 0 ? '-' : '') + str;
    var last3 = str.slice(-3);
    var rest = str.slice(0, -3);
    var grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return (number < 0 ? '-' : '') + grouped + ',' + last3;
  }

  function money(number) { return '₹' + inr(number); }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function findById(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function serviceHref(id) { return BASE + 'pages/service-details.html?id=' + encodeURIComponent(id); }
  function postHref(id) { return BASE + 'pages/blog-details.html?id=' + encodeURIComponent(id); }

  function stars(rating) {
    var out = '';
    var full = Math.round(parseFloat(rating) || 0);
    for (var i = 0; i < 5; i++) {
      out += '<svg viewBox="0 0 24 24" fill="' + (i < full ? 'currentColor' : 'none') +
        '" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Article content-block renderer (data/posts.js → .prose)           */
  /* ------------------------------------------------------------------ */
  function renderBlocks(blocks) {
    return (blocks || []).map(function (block) {
      switch (block.type) {
        case 'h2':
          return '<h2>' + esc(block.text) + '</h2>';
        case 'h3':
          return '<h3>' + esc(block.text) + '</h3>';
        case 'p':
          /* Paragraph text is authored with <strong> emphasis, so the
             value is intentionally passed through unescaped. */
          return '<p>' + block.text + '</p>';
        case 'ul':
          return '<ul>' + block.items.map(function (item) { return '<li>' + item + '</li>'; }).join('') + '</ul>';
        case 'ol':
          return '<ol>' + block.items.map(function (item) { return '<li>' + item + '</li>'; }).join('') + '</ol>';
        case 'quote':
          return '<blockquote><p>' + esc(block.text) + '</p>' +
            (block.cite ? '<cite>' + esc(block.cite) + '</cite>' : '') + '</blockquote>';
        case 'figure':
          return '<figure class="article-figure"><img src="' + esc(block.src) + '" alt="' +
            esc(block.alt) + '" loading="lazy">' +
            (block.caption ? '<figcaption>' + esc(block.caption) + '</figcaption>' : '') + '</figure>';
        case 'note':
          return '<div class="note info"><span class="note-icon">' + icon('info') + '</span><p>' +
            (block.title ? '<strong>' + esc(block.title) + '.</strong> ' : '') +
            esc(block.text) + '</p></div>';
        default:
          return '';
      }
    }).join('');
  }

  /* ------------------------------------------------------------------ */
  /* Card factories — used by the home preview, services, blog, 404     */
  /* ------------------------------------------------------------------ */
  function serviceCard(service) {
    return (
      '<article class="card reveal" data-category="' + esc(service.category) + '">' +
        '<div class="card-media">' +
          '<img src="' + esc(service.image) + '" alt="' + esc(service.imageAlt) + '" loading="lazy">' +
          '<span class="card-media-tag">' + esc(service.category) + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<h3>' + esc(service.name) + '</h3>' +
          '<p>' + esc(service.tagline) + '</p>' +
          '<div class="tag-row" style="margin-top:14px;">' +
            service.tags.slice(0, 3).map(function (tag) {
              return '<span class="tag">' + esc(tag) + '</span>';
            }).join('') +
          '</div>' +
          '<div class="card-meta">' +
            '<span>' + esc(service.turnaround) + '</span>' +
            '<span>From ' + esc(service.minOrder) + '</span>' +
          '</div>' +
          '<div class="card-foot">' +
            '<a class="card-link" href="' + esc(serviceHref(service.id)) + '">Explore ' +
              icon('arrowRight') + '</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function postCard(post) {
    return (
      '<article class="card blog-card reveal" data-category="' + esc(post.category) + '">' +
        '<div class="card-media">' +
          '<img src="' + esc(post.image) + '" alt="' + esc(post.imageAlt) + '" loading="lazy">' +
        '</div>' +
        '<div class="card-body">' +
          '<span class="blog-cat">' + icon('book') + esc(post.category) + '</span>' +
          '<h3><a href="' + esc(postHref(post.id)) + '">' + esc(post.title) + '</a></h3>' +
          '<p>' + esc(post.excerpt) + '</p>' +
          '<div class="card-meta">' +
            '<span>' + esc(post.date.short) + '</span>' +
            '<span>' + esc(post.readTime) + ' min read</span>' +
          '</div>' +
          '<div class="card-foot">' +
            '<a class="card-link" href="' + esc(postHref(post.id)) + '">Read article' +
              icon('arrowRight') + '</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* Rewrites a container's contents and re-triggers the reveal observer. */
  function fill(containerId, html) {
    var node = q('#' + containerId);
    if (!node) return null;
    node.innerHTML = html;
    if (window.UI) window.UI.refresh();
    return node;
  }

  function setTitle(text) {
    if (text) document.title = text + ' | Amritha Spice Mill';
  }

  window.PageKit = {
    BASE: BASE,
    PAGE: PAGE,
    q: q,
    qa: qa,
    param: param,
    esc: esc,
    icon: icon,
    inr: inr,
    money: money,
    slugify: slugify,
    findById: findById,
    serviceHref: serviceHref,
    postHref: postHref,
    stars: stars,
    renderBlocks: renderBlocks,
    serviceCard: serviceCard,
    postCard: postCard,
    fill: fill,
    setTitle: setTitle
  };
})(window, document);
