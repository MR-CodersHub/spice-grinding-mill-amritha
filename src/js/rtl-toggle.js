/* ==========================================================================
   DIRECTION CONTROLLER — RTL / LTR MODE
   --------------------------------------------------------------------
   • Reads the stored preference from localStorage.
   • When nothing is stored it auto-detects an RTL system locale
     (Arabic, Hebrew, Persian, Urdu, Pashto, Kurdish, Divehi, Yiddish).
   • Toggling swaps <html dir> and persists the choice.
   ========================================================================== */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = 'amritha-dir';
  var RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur', 'ps', 'ku', 'dv', 'yi'];
  var root = document.documentElement;

  function readStored() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      if (value === 'rtl' || value === 'ltr') return value;
    } catch (e) { /* storage blocked */ }
    return null;
  }

  function store(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* no-op */ }
  }

  function systemDirection() {
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || '').slice(0, 2).toLowerCase();
      if (RTL_LANGUAGES.indexOf(code) !== -1) return 'rtl';
    }
    return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
  }

  function currentDirection() {
    return root.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
  }

  function syncButtons() {
    var dir = currentDirection();
    var buttons = document.querySelectorAll('[data-tool="dir"]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', dir === 'rtl' ? 'true' : 'false');
      buttons[i].setAttribute(
        'title',
        dir === 'rtl' ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout'
      );
      buttons[i].setAttribute(
        'aria-label',
        dir === 'rtl' ? 'Switch to left-to-right layout' : 'Switch to right-to-left layout'
      );
    }
  }

  function apply(dir) {
    root.setAttribute('dir', dir);
    syncButtons();
    document.dispatchEvent(new CustomEvent('amritha:dirchange', { detail: { dir: dir } }));
  }

  function toggle() {
    var next = currentDirection() === 'rtl' ? 'ltr' : 'rtl';
    store(next);
    apply(next);
    return next;
  }

  apply(readStored() || systemDirection());

  document.addEventListener('DOMContentLoaded', syncButtons);
  window.addEventListener('load', syncButtons);

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest ? event.target.closest('[data-tool="dir"]') : null;
    if (trigger) {
      event.preventDefault();
      toggle();
    }
  });

  window.DirectionController = {
    toggle: toggle,
    apply: apply,
    get: currentDirection,
    isRtl: function () { return currentDirection() === 'rtl'; },
    system: systemDirection
  };
})(window, document);
