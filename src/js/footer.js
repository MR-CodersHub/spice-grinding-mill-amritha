/* ==========================================================================
   SHARED FOOTER — rendered from JavaScript on every public page
   --------------------------------------------------------------------
   Produces the newsletter band, the ornamental frieze and the footer
   itself. Identical on all pages; the legal strip year is injected at
   runtime so it never goes stale.
   ========================================================================== */
(function (window, document) {
  'use strict';

  var body = document.body;
  var BASE = body ? (body.getAttribute('data-base') || './') : './';
  var PAGE = body ? (body.getAttribute('data-page') || '') : '';

  var QUICK_LINKS = [
    { key: 'home',     label: 'Home',                href: BASE + 'index.html' },
    { key: 'home-2',   label: 'Chef Program',        href: BASE + 'pages/home-2.html' },
    { key: 'about',    label: 'Our Story',           href: BASE + 'pages/about.html' },
    { key: 'services', label: 'Services Catalogue',  href: BASE + 'pages/services.html' },
    { key: 'pricing',  label: 'Plans & Pricing',     href: BASE + 'pages/pricing.html' },
    { key: 'blog',     label: 'The Journal',         href: BASE + 'pages/blog.html' },
    { key: 'contact',  label: 'Contact & Visit',     href: BASE + 'pages/contact.html' }
  ];

  var SERVICE_LINKS = [
    { label: 'Cold Stone Chakki Milling', href: BASE + 'pages/service-details.html?id=stone-chakki-milling' },
    { label: 'Signature Masala Blending',  href: BASE + 'pages/service-details.html?id=custom-masala-blending' },
    { label: 'Whole Spice Cleaning & Grading', href: BASE + 'pages/service-details.html?id=whole-spice-grading' },
    { label: 'Commercial Bulk Supply',     href: BASE + 'pages/service-details.html?id=commercial-bulk-supply' },
    { label: 'Private Label Packaging',    href: BASE + 'pages/service-details.html?id=private-label-packaging' },
    { label: 'Flavour Consultancy',        href: BASE + 'pages/service-details.html?id=spice-consultancy' }
  ];

  var LEGAL_LINKS = [
    { key: 'privacy', label: 'Privacy Policy',   href: BASE + 'pages/Privacy-policy.html' },
    { key: 'terms',   label: 'Terms of Service', href: BASE + 'pages/Terms-of-service.html' },
    { key: 'faq',     label: 'Help & FAQs',       href: BASE + 'pages/FAQ.html' },
    { key: '404',     label: 'Sitemap',           href: BASE + 'pages/404.html' }
  ];

  var ICON = {
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    mortar: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><path d="M7 14c0 2.5 2 4.5 5 4.5s5-2 5-4.5H7z"></path></svg>',
    instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    facebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    youtube: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>',
    whatsapp: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>'
  };

  function list(items, extraClass) {
    return items.map(function (item) {
      var current = PAGE === item.key ? ' aria-current="page"' : '';
      return '<li><a href="' + item.href + '"' + current + '>' + item.label + '</a></li>';
    }).join('');
  }

  function render() {
    var mount = document.getElementById('site-footer');
    if (!mount) {
      mount = document.createElement('div');
      mount.id = 'site-footer';
      document.body.appendChild(mount);
    }

    mount.innerHTML =
      '<section class="newsletter-band" aria-labelledby="newsletter-heading">' +
        '<div class="container">' +
          '<div class="newsletter-grid">' +
            '<div>' +
              '<h2 id="newsletter-heading">Letters from the Mill</h2>' +
              '<p>One short letter each month: a harvest note, one technique we have refined, ' +
                'and first access to limited single-estate lots. No noise, unsubscribe any time.</p>' +
            '</div>' +
            '<form class="newsletter-form" id="newsletter-form" novalidate>' +
              '<div class="news-field">' +
                '<label class="sr-only" for="newsletter-email">Email address</label>' +
                '<input class="news-input" type="email" id="newsletter-email" name="email" ' +
                  'placeholder="you@kitchen.com" autocomplete="email" required>' +
                '<div class="form-error" data-error-for="newsletter-email">' +
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="7" x2="12" y2="13"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' +
                  '<span>Enter a valid email address.</span>' +
                '</div>' +
              '</div>' +
              '<button type="submit" class="btn btn-gold">Join the Letter</button>' +
            '</form>' +
          '</div>' +
          '<p class="newsletter-note">By subscribing you accept our ' +
            '<a href="' + BASE + 'pages/Privacy-policy.html" style="color:var(--color-soft-gold);text-decoration:underline;">privacy policy</a>.</p>' +
        '</div>' +
      '</section>' +

      '<div class="footer-frieze" aria-hidden="true"></div>' +

      '<footer class="site-footer" id="footer-contact">' +
        '<div class="container">' +
          '<div class="footer-top">' +
            '<div class="footer-brand">' +
              '<div class="brand-footer-seal">' +
                '<div class="footer-seal-icon">' + ICON.mortar + '</div>' +
                '<div><h3>Amritha Spice Mill</h3><span>Traditional Craft • Estd 1948</span></div>' +
              '</div>' +
              '<p>Preserving South Asia\'s proud heritage of slow stone-ground spices, pure ' +
                'single-estate harvests, and custom bespoke masala recipes for discerning ' +
                'kitchens worldwide.</p>' +
              '<div class="footer-socials">' +
                '<a href="#" class="social-icon-btn" aria-label="Amritha Spice Mill on Instagram">' + ICON.instagram + '</a>' +
                '<a href="#" class="social-icon-btn" aria-label="Amritha Spice Mill on Facebook">' + ICON.facebook + '</a>' +
                '<a href="#" class="social-icon-btn" aria-label="Amritha Spice Mill on YouTube">' + ICON.youtube + '</a>' +
                '<a href="#" class="social-icon-btn" aria-label="Chat with us on WhatsApp">' + ICON.whatsapp + '</a>' +
              '</div>' +
            '</div>' +

            '<div class="footer-col">' +
              '<h4>Quick Links</h4>' +
              '<ul class="footer-links">' + list(QUICK_LINKS) + '</ul>' +
            '</div>' +

            '<div class="footer-col">' +
              '<h4>Our Services</h4>' +
              '<ul class="footer-links">' + list(SERVICE_LINKS) + '</ul>' +
            '</div>' +

            '<div class="footer-col">' +
              '<h4>Visit &amp; Contact</h4>' +
              '<ul class="footer-contact-info">' +
                '<li>' + ICON.pin + '<span>48 Heritage Spice Quarter, Bazaar Road, Mattancherry, Kochi 682002</span></li>' +
                '<li>' + ICON.phone + '<span>+91 98401 23456 / 0484 2221948</span></li>' +
                '<li>' + ICON.mail + '<span>mill@amrithaspices.in</span></li>' +
                '<li>' + ICON.clock + '<span>Mon – Sat: 8:00 AM – 8:00 PM<br>Sunday: 9:00 AM – 2:00 PM</span></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +

          '<div class="footer-bottom">' +
            '<div>&copy; <span data-year>2026</span> Amritha Traditional Spice Mill Pvt Ltd. All Rights Reserved.</div>' +
            '<div class="footer-legal-links">' +
              LEGAL_LINKS.map(function (item) {
                return '<a href="' + item.href + '">' + item.label + '</a>';
              }).join('') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>';

    var yearSlot = mount.querySelector('[data-year]');
    if (yearSlot) yearSlot.textContent = String(new Date().getFullYear());
  }

  function boot() {
    render();
    if (window.ThemeController) window.ThemeController.apply(window.ThemeController.get());
    if (window.DirectionController) window.DirectionController.apply(window.DirectionController.get());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
