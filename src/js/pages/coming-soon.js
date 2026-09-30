/* ==========================================================================
   COMING SOON PAGE SCRIPT
   --------------------------------------------------------------------
   Renders the three builds, the inline icons, and the countdown to the
   tasting-room opening. The target date is fixed rather than rolling, so
   the page cannot quietly reset itself to look fresh; once the date has
   passed the countdown is replaced with a plain statement.
   ========================================================================== */
(function (window, document) {
  'use strict';

  /* 15 January 2027, 9:00 IST — tasting room and online ordering. */
  var TARGET = new Date('2027-01-15T09:00:00+05:30');

  var BUILDS = [
    {
      icon: 'chakki',
      title: 'A second milling line',
      text: 'Two more sets of granite runners, calibrated to the same four profiles. It doubles capacity, so a busy week stops pushing a dispatch date.'
    },
    {
      icon: 'utensils',
      title: 'A public tasting room',
      text: 'Six seats at a bench facing the mill floor. You will taste four granule profiles blind, with nobody from the mill explaining them first.'
    },
    {
      icon: 'cart',
      title: 'Online ordering for home kitchens',
      text: 'The trade ordering flow, simplified to 250 g and 1 kg packs, with delivery inside Kochi and to the four neighbouring states.'
    }
  ];

  function renderBuilds() {
    var K = window.PageKit;
    K.fill('build-grid', BUILDS.map(function (build) {
      return '<div class="icon-card reveal">' +
        '<div class="icon-wrap">' + K.icon(build.icon) + '</div>' +
        '<h3>' + K.esc(build.title) + '</h3>' +
        '<p>' + K.esc(build.text) + '</p>' +
      '</div>';
    }).join(''));
  }

  function injectIcons() {
    var K = window.PageKit;
    K.qa('[data-build-icon]').forEach(function (node) {
      node.innerHTML = K.icon(node.getAttribute('data-build-icon'));
    });
    var note = K.q('[data-note-icon]');
    if (note) note.innerHTML = K.icon(note.getAttribute('data-note-icon') || 'info');
  }

  function formatDate(date) {
    try {
      return date.toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        timeZone: 'Asia/Kolkata'
      }) + ', 9:00 am IST';
    } catch (error) {
      return '15 January 2027';
    }
  }

  function startCountdown() {
    var K = window.PageKit;
    var box = K.q('#countdown');
    var note = K.q('#countdown-target');
    if (!box) return;

    if (note) {
      note.innerHTML = 'Target opening: <strong style="color:var(--color-soft-gold);">' +
        formatDate(TARGET) + '</strong>';
    }

    var units = {};
    K.qa('[data-unit]', box).forEach(function (node) {
      units[node.getAttribute('data-unit')] = node;
    });

    function pad(value) {
      return value < 10 ? '0' + value : String(value);
    }

    function tick() {
      var remaining = TARGET.getTime() - Date.now();

      if (remaining <= 0) {
        box.innerHTML =
          '<div class="count-cell" style="min-width:auto;padding:20px 28px;">' +
            '<div class="count-num" style="font-size:1.4rem;">Now open</div>' +
            '<div class="count-label">Tasting room &amp; online ordering</div>' +
          '</div>';
        if (note) note.innerHTML = 'The tasting room and online ordering are now live. ' +
          '<a href="contact.html?topic=visit" style="color:var(--color-soft-gold);font-weight:700;">Book a seat.</a>';
        return;
      }

      var seconds = Math.floor(remaining / 1000);
      if (units.days) units.days.textContent = String(Math.floor(seconds / 86400));
      if (units.hours) units.hours.textContent = pad(Math.floor(seconds / 3600) % 24);
      if (units.minutes) units.minutes.textContent = pad(Math.floor(seconds / 60) % 60);
      if (units.seconds) units.seconds.textContent = pad(seconds % 60);

      window.setTimeout(tick, 1000);
    }

    tick();
  }

  function boot() {
    if (!window.PageKit) return;
    renderBuilds();
    injectIcons();
    startCountdown();
    if (window.UI) window.UI.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
