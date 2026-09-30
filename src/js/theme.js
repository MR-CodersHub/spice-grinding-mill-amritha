/* ==========================================================================
   THEME CONTROLLER — DARK / LIGHT MODE
   --------------------------------------------------------------------
   • Reads the stored preference from localStorage.
   • Falls back to the operating system preference
     (window.matchMedia('(prefers-color-scheme: dark)')) and keeps
     following the OS live until the visitor picks a theme manually.
   • Exposes window.ThemeController for the navbar toggle buttons.
   ========================================================================== */
(function (window, document) {
  'use strict';

  var STORAGE_KEY = 'amritha-theme';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function readStored() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      if (value === 'light' || value === 'dark') return value;
    } catch (e) { /* storage blocked (private mode) */ }
    return null;
  }

  function store(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* no-op */ }
  }

  function systemTheme() {
    return media && media.matches ? 'dark' : 'light';
  }

  function currentTheme() {
    return root.getAttribute('data-theme') || 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    syncButtons();
    document.dispatchEvent(new CustomEvent('amritha:themechange', { detail: { theme: theme } }));
  }

  function syncButtons() {
    var theme = currentTheme();
    var buttons = document.querySelectorAll('[data-tool="theme"]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      buttons[i].setAttribute(
        'title',
        theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance'
      );
      buttons[i].setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance'
      );
    }
  }

  function toggle() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    store(next);
    apply(next);
    return next;
  }

  /* Apply the stored value (or the system one) as early as possible. */
  apply(readStored() || systemTheme());

  /* Follow the operating system until the visitor overrides it. */
  function onSystemChange(event) {
    if (!readStored()) apply(event.matches ? 'dark' : 'light');
  }
  if (media) {
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  /* Re-sync the toggle icons once the shared navbar has been injected. */
  document.addEventListener('DOMContentLoaded', syncButtons);
  window.addEventListener('load', syncButtons);

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest ? event.target.closest('[data-tool="theme"]') : null;
    if (trigger) {
      event.preventDefault();
      toggle();
    }
  });

  window.ThemeController = {
    toggle: toggle,
    apply: apply,
    get: currentTheme,
    isDark: function () { return currentTheme() === 'dark'; },
    system: systemTheme
  };
})(window, document);
