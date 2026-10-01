/* ==========================================================================
   SHARED NAVBAR — rendered from JavaScript on every public page
   --------------------------------------------------------------------
   The markup produced here is byte-for-byte the same on every page, so the
   navigation looks identical site-wide. Only the `active` class and
   `aria-current` attribute change depending on the current page.
   Page context is read from <body data-base="…" data-page="…">.
   ========================================================================== */
(function (window, document) {
  'use strict';

  var body = document.body;
  var BASE = body ? (body.getAttribute('data-base') || './') : './';
  var PAGE = body ? (body.getAttribute('data-page') || '') : '';

  var LINKS = [
    { key: 'home',      label: 'Home',      href: BASE + 'index.html' },
    { key: 'home-2',     label: 'Home 2',     href: BASE + 'pages/home-2.html' },
    { key: 'about',     label: 'About',     href: BASE + 'pages/about.html' },
    { key: 'services',  label: 'Services',  href: BASE + 'pages/services.html' },
    { key: 'blog',      label: 'Journal',   href: BASE + 'pages/blog.html' },
    { key: 'pricing',   label: 'Pricing',   href: BASE + 'pages/pricing.html' },
    { key: 'contact',   label: 'Contact',   href: BASE + 'pages/contact.html' },
    { key: 'login',     label: 'Login',     href: BASE + 'auth/login.html', isCta: true }
  ];

  /* Secondary destinations shown inside the mobile drawer */
  var SECONDARY = [

  ];

  var SEAL_SVG =
    '<svg class="seal-art" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<circle cx="32" cy="32" r="30" stroke="#082052" stroke-width="1.8" stroke-dasharray="3 2"/>' +
      '<circle cx="32" cy="32" r="26" stroke="#C9A45C" stroke-width="1.2"/>' +
      '<path d="M20 34C20 41 25.3726 46 32 46C38.6274 46 44 41 44 34H20Z" fill="#082052"/>' +
      '<path d="M18 33H46V36H18V33Z" fill="#C9A45C"/>' +
      '<path d="M26 46H38V49H26V46Z" fill="#082052"/>' +
      '<path d="M26 18L37 34H41L30 18H26Z" fill="#C9A45C"/>' +
      '<circle cx="32" cy="22" r="1.5" fill="#B52B1E"/>' +
      '<circle cx="21" cy="26" r="1.5" fill="#E89D1C"/>' +
      '<circle cx="43" cy="26" r="1.5" fill="#3E6347"/>' +
    '</svg>';

  var ICON_SUN =
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4.2"></circle>' +
      '<path d="M12 1.8v2.4M12 19.8v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M1.8 12h2.4M19.8 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7"></path>' +
    '</svg>';
  var ICON_MOON =
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>' +
    '</svg>';
  var ICON_LTR =
    '<svg class="icon-ltr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 7h9M4 12h13M4 17h7"></path><path d="M17 5l3 3-3 3"></path>' +
    '</svg>';
  var ICON_RTL =
    '<svg class="icon-rtl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M20 7h-9M20 12H7M20 17h-7"></path><path d="M7 5L4 8l3 3"></path>' +
    '</svg>';

  function toolsMarkup() {
    return (
      '<div class="nav-tools">' +
        '<button type="button" class="tool-btn" data-tool="theme" aria-pressed="false" aria-label="Switch appearance">' +
          ICON_SUN + ICON_MOON +
        '</button>' +
        '<button type="button" class="tool-btn" data-tool="dir" aria-pressed="false" aria-label="Switch text direction">' +
          ICON_LTR + ICON_RTL +
        '</button>' +
      '</div>'
    );
  }

  function navItem(item) {
    var active = PAGE === item.key || (item.key === 'home' && PAGE === 'home-2');
    if (item.isCta) {
      return (
        '<li class="nav-cta-item">' +
          '<a href="' + item.href + '" class="nav-btn-login' + (active ? ' active' : '') + '"' +
          (active ? ' aria-current="page"' : '') + '>' + item.label + '</a>' +
        '</li>'
      );
    }
    return (
      '<li><a href="' + item.href + '" class="nav-link' + (active ? ' active' : '') + '"' +
      (active ? ' aria-current="page"' : '') + '>' + item.label + '</a></li>'
    );
  }

  function secondaryItem(item) {
    var active = PAGE === item.key;
    return (
      '<li><a href="' + item.href + '" class="mobile-nav-link"' +
      (active ? ' aria-current="page" style="color:var(--color-soft-gold);"' : '') + '>' +
      item.label + '</a></li>'
    );
  }

  function ctaMarkup() {
    /* On the landing page the CTA opens the bespoke-blend dialog; on every
       other page it routes to the contact form pre-filled for blends. */
    if (document.getElementById('custom-blend-modal')) {
      return '<a href="#custom-blends" class="btn btn-primary open-custom-blend-btn">Request a Custom Blend</a>';
    }
    return '<a href="' + BASE + 'pages/contact.html?topic=custom-blend" class="btn btn-primary">Request a Custom Blend</a>';
  }

  function mobileCtaMarkup() {
    if (document.getElementById('custom-blend-modal')) {
      return '<button type="button" class="btn btn-primary open-custom-blend-btn" style="width:100%;">Request a Custom Blend</button>';
    }
    return '<a href="' + BASE + 'pages/contact.html?topic=custom-blend" class="btn btn-primary" style="width:100%;text-align:center;">Request a Custom Blend</a>';
  }

  function render() {
    var mount = document.getElementById('site-navbar');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'site-navbar';
      document.body.insertBefore(mount, document.body.firstChild);
    }

    var leftLinks = LINKS.slice(0, 4).map(navItem).join('');
    var rightLinks = LINKS.slice(4, 8).map(navItem).join('');

    mount.innerHTML =

      '<header class="sticky-header" id="header">' +
        '<div class="container">' +
          '<nav class="navbar" aria-label="Main Navigation">' +
            '<ul class="nav-menu nav-menu-left">' + leftLinks + '</ul>' +

            '<div class="brand-seal-wrapper">' +
              '<a href="' + BASE + 'index.html" class="brand-seal" aria-label="Amritha Spice Mill — home">' +
                '<img src="' + BASE + 'assets/logo.png" alt="Amritha Spice Mill — ESTD 1948" class="brand-seal-logo" width="96" height="96">' +
              '</a>' +
              '<a href="' + BASE + 'index.html" class="nav-brand-text" aria-hidden="true">' +
                '<span class="nav-brand-name">Amritha Spice Mill</span>' +
                '<span class="nav-brand-sub">Traditional Craft &bull; Estd 1948</span>' +
              '</a>' +
            '</div>' +

            '<ul class="nav-menu nav-menu-right">' + rightLinks + '</ul>' +

            '<div class="nav-actions">' +
              toolsMarkup() +
              '<button type="button" class="mobile-toggle" id="mobile-toggle-btn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-nav">&#9776;</button>' +
            '</div>' +
          '</nav>' +
        '</div>' +
      '</header>' +

      '<div class="mobile-nav" id="mobile-nav" aria-hidden="true">' +
        '<div class="mobile-nav-header">' +
          '<div style="display:flex;align-items:center;gap:12px;">' +
            '<img src="' + BASE + 'assets/logo.png" alt="Amritha Spice Mill" style="width:40px;height:40px;border-radius:50%;object-fit:contain;box-shadow:0 2px 8px rgba(0,0,0,0.2);">' +
            '<div class="brand-title" style="font-family:var(--font-serif);font-size:1.35rem;color:var(--color-primary);font-weight:700;">Amritha Spice Mill</div>' +
          '</div>' +
          '<button type="button" class="mobile-nav-close" style="font-size:28px;background:none;color:var(--color-primary);cursor:pointer;" aria-label="Close navigation menu">&times;</button>' +
        '</div>' +
        '<ul class="mobile-nav-links">' +
          LINKS.map(secondaryItem).join('') + SECONDARY.map(secondaryItem).join('') +
        '</ul>' +
        toolsMarkup() +
        '<div style="height:24px;"></div>' +
        mobileCtaMarkup() +
      '</div>';
  }

  function setupHeaderBehaviour() {
    var header = document.querySelector('.sticky-header');
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    var drawer = document.getElementById('mobile-nav');
    var openBtn = document.getElementById('mobile-toggle-btn');
    var closeBtn = document.querySelector('.mobile-nav-close');

    function setDrawer(open) {
      if (!drawer) return;
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    if (openBtn) openBtn.addEventListener('click', function () { setDrawer(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });

    if (drawer) {
      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setDrawer(false); });
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setDrawer(false);
    });
  }

  function boot() {
    render();
    setupHeaderBehaviour();
    if (window.ThemeController) window.ThemeController.apply(window.ThemeController.get());
    if (window.DirectionController) window.DirectionController.apply(window.DirectionController.get());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
