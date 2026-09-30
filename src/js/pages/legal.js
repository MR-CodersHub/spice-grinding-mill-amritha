/* ==========================================================================
   LEGAL PAGE SCRIPT
   --------------------------------------------------------------------
   Shared by Privacy-policy.html and Terms-of-service.html. It only does the
   two things both pages need and cannot be given away by the markup alone:
     • builds the "on this page" contents list from the section headings
     • marks the current section in the sidebar while reading
   ========================================================================== */
(function (window, document) {
  'use strict';

  /* Kept in one place so the two documents cannot drift apart. */
  var REVISED = {
    privacy: '1 September 2026',
    terms: '1 September 2026'
  };

  function renderRevised() {
    var K = window.PageKit;
    var node = K.q('#legal-updated');
    if (!node) return;
    var date = REVISED[K.PAGE] || REVISED.privacy;
    node.innerHTML = K.icon('check') +
      '<span>Last revised <strong style="color:var(--color-primary);">' + K.esc(date) + '</strong></span>';
  }

  function renderToc() {
    var K = window.PageKit;
    var list = K.q('#legal-toc-list');
    var body = K.q('#legal-body');
    if (!list || !body) return;

    var sections = K.qa('section[id]', body).filter(function (section) {
      return !!section.querySelector('h2');
    });

    if (!sections.length) return;

    list.innerHTML = sections.map(function (section, index) {
      var heading = section.querySelector('h2');
      return '<li><a href="#' + K.esc(section.id) + '">' +
        K.esc((index + 1) + '. ' + heading.textContent.replace(/^\d+\.\s*/, '')) +
      '</a></li>';
    }).join('');

    spyOn(sections, list);
  }

  /* Scroll spy without a scroll handler per section: one pass over the
     headings on scroll, plus a run on load and on resize. */
  function spyOn(sections, list) {
    var links = {};
    Array.prototype.forEach.call(list.querySelectorAll('a'), function (link) {
      links[link.getAttribute('href').slice(1)] = link.parentNode;
    });

    var current = null;

    function update() {
      var offset = window.innerHeight * 0.32;
      var active = sections[0].id;

      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top - offset <= 0) active = section.id;
      });

      /* At the very bottom the last section can never reach the trigger
         line, so promote it by hand rather than leaving a wrong highlight. */
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 8) {
        active = sections[sections.length - 1].id;
      }

      if (active === current) return;
      current = active;

      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle('is-active', id === active);
      });
    }

    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        update();
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function boot() {
    if (!window.PageKit) return;
    renderRevised();
    renderToc();
    if (window.UI) window.UI.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
