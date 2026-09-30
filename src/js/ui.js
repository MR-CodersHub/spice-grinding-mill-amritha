/* ==========================================================================
   SHARED UI BEHAVIOURS
   --------------------------------------------------------------------
   Small, framework-free helpers used across the whole site:
     • Accordion / FAQ toggles            data-accordion
     • Animated number counters           data-count-to
     • Scroll-reveal animations           .reveal
     • Group filter chips                 data-filter-group + data-filter-value
     • Newsletter sign-up (footer band)   #newsletter-form
     • Copy-to-clipboard share buttons    data-copy
   ========================================================================== */
(function (window, document) {
  'use strict';

  /* ----------------------------------------------------------------------
     1. ACCORDION
     ---------------------------------------------------------------------- */
  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(function (root) {
      var single = root.getAttribute('data-accordion') === 'single';
      var openFirst = root.getAttribute('data-open-first') === '1';

      /* Resolved at click time, not at bind time, so items injected after
         boot (service FAQs, pricing FAQ, the filtered help-centre list)
         take part in the single-open behaviour. */
      function items() {
        return Array.prototype.slice.call(root.querySelectorAll('.faq-item'));
      }

      function close(item) {
        item.classList.remove('is-open');
        var btn = item.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }

      function open(item) {
        item.classList.add('is-open');
        var btn = item.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }

      items().forEach(function (item) {
        var button = item.querySelector('.faq-question');
        if (!button) return;

        /* Guarded per question rather than per root, which is what makes
           this safe to re-run after a page script re-renders the list. */
        if (button.dataset.accordionBound === '1') return;
        button.dataset.accordionBound = '1';

        button.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');
        button.addEventListener('click', function () {
          var isOpen = item.classList.contains('is-open');
          if (single) items().forEach(function (other) { if (other !== item) close(other); });
          if (isOpen) close(item); else open(item);
        });
      });

      /* Only ever applied once, so a later refresh() cannot slam the
         accordion shut on a reader who has opened something else. */
      if (openFirst && root.dataset.accordionFirstDone !== '1' && items().length) {
        root.dataset.accordionFirstDone = '1';
        items().forEach(close);
        open(items()[0]);
      }
    });
  }

  /* ----------------------------------------------------------------------
     2. SCROLL REVEAL
     ---------------------------------------------------------------------- */
  function initReveal() {
    var nodes = document.querySelectorAll('.reveal');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    nodes.forEach(function (node, index) {
      node.style.transitionDelay = (index % 6) * 70 + 'ms';
      observer.observe(node);
    });
  }

  /* ----------------------------------------------------------------------
     3. NUMBER COUNTERS
     ---------------------------------------------------------------------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
    var duration = parseInt(el.getAttribute('data-count-duration') || '1800', 10);
    var start = null;

    function frame(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (progress < 1) window.requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    window.requestAnimationFrame(frame);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------------------
     4. FILTER CHIPS
     `data-filter-group` names a group; buttons inside it carry
   `data-filter-value`. Targets declare `data-filter-target="#id"` plus
   `data-filter-category="…"` (comma separated).
     ---------------------------------------------------------------------- */
  function initFilterGroups() {
    document.querySelectorAll('[data-filter-group]').forEach(function (group) {
      var buttons = Array.prototype.slice.call(group.querySelectorAll('[data-filter-value]'));

      buttons.forEach(function (button) {
        /* Bound per button, not per group, so chips injected after boot
           (blog categories, for example) still get wired. */
        if (button.dataset.filterBound === '1') return;
        button.dataset.filterBound = '1';

        button.addEventListener('click', function () {
          var value = button.getAttribute('data-filter-value');
          buttons.forEach(function (b) { b.classList.remove('active'); });
          button.classList.add('active');
          window.UI.applyFilter(group.getAttribute('data-filter-group'), value);
        });
      });
    });
  }

  var filterHooks = {};

  function applyFilter(group, value) {
    if (typeof filterHooks[group] === 'function') filterHooks[group](value);
  }

  function registerFilter(group, handler) {
    filterHooks[group] = handler;
  }

  /* ----------------------------------------------------------------------
     5. NEWSLETTER
     ---------------------------------------------------------------------- */
  function initNewsletter() {
    var form = document.getElementById('newsletter-form');
    if (!form || form.dataset.ready === '1') return;
    form.dataset.ready = '1';

    var input = form.querySelector('#newsletter-email');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = (input && input.value ? input.value : '').trim();
      var valid = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);

      if (!valid) {
        if (input) {
          var wrapper = input.closest('.news-field');
          if (wrapper) wrapper.classList.add('is-invalid');
        }
        if (window.Toast) window.Toast.error('Please enter a valid email address.', { duration: 3500 });
        return;
      }

      var wrapper = input ? input.closest('.news-field') : null;
      if (wrapper) wrapper.classList.remove('is-invalid');
      form.reset();
      if (window.Toast) {
        window.Toast.success('Welcome aboard — your first harvest letter arrives on the 1st of next month.');
      }
    });

    if (input) {
      input.addEventListener('input', function () {
        var wrapper = input.closest('.news-field');
        if (wrapper) wrapper.classList.remove('is-invalid');
      });
    }
  }

  /* ----------------------------------------------------------------------
     6. COPY TO CLIPBOARD (share row)
     ---------------------------------------------------------------------- */
  function initCopyButtons() {
    document.addEventListener('click', function (event) {
      var button = event.target.closest ? event.target.closest('[data-copy]') : null;
      if (!button) return;
      event.preventDefault();
      var text = button.getAttribute('data-copy') || window.location.href;
      var done = function () {
        if (window.Toast) window.Toast.success('Link copied to your clipboard.');
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          if (window.Toast) window.Toast.error('Could not copy automatically. Please copy from the address bar.');
        });
      } else {
        var area = document.createElement('textarea');
        area.value = text;
        document.body.appendChild(area);
        area.select();
        try { document.execCommand('copy'); done(); } catch (e) {
          if (window.Toast) window.Toast.error('Could not copy automatically.');
        }
        document.body.removeChild(area);
      }
    });
  }

  /* ----------------------------------------------------------------------
     BOOT
     ---------------------------------------------------------------------- */
  function boot() {
    initAccordions();
    initReveal();
    initCounters();
    initFilterGroups();
    initNewsletter();
    initCopyButtons();
  }

  /* Called after a page script injects new markup: re-runs only the
     idempotent visual enhancers, never the delegated event listeners. */
  function refresh() {
    initAccordions();
    initReveal();
    initCounters();
  }

  /* Called after a page script injects new filter chips, so the freshly
     added buttons are bound. Already-bound buttons are skipped. */
  function rebindFilters() {
    initFilterGroups();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.UI = {
    boot: boot,
    refresh: refresh,
    refreshAccordions: initAccordions,
    rebindFilters: rebindFilters,
    registerFilter: registerFilter,
    applyFilter: applyFilter,
    animateCount: animateCount
  };
})(window, document);
