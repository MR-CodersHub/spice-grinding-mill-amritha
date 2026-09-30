/* ==========================================================================
   TOAST NOTIFICATION SERVICE
   --------------------------------------------------------------------
   Single shared implementation for every page. Keeps the original
   navy + gold toast look from index.html, adds an error variant and a
   stacking container so messages never overlap.
   Usage: window.Toast.show('Message', { type: 'success' | 'error', duration: 4000 })
   ========================================================================== */
(function (window, document) {
  'use strict';

  var ICONS = {
    success:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A45C" stroke-width="2" aria-hidden="true">' +
      '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    error:
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E88274" stroke-width="2" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
  };

  function ensureContainer() {
    var stack = document.getElementById('toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'toast-stack';
      stack.className = 'toast-stack';
      stack.setAttribute('role', 'status');
      stack.setAttribute('aria-live', 'polite');
      document.body.appendChild(stack);
    }
    return stack;
  }

  function show(message, options) {
    if (!message) return;
    var opts = options || {};
    var type = opts.type === 'error' ? 'error' : 'success';
    var duration = opts.duration || 4000;
    var stack = ensureContainer();

    var toast = document.createElement('div');
    toast.className = 'toast-notification' + (type === 'error' ? ' is-error' : '');
    toast.innerHTML = (ICONS[type] || '') + '<span>' + message + '</span>';
    stack.appendChild(toast);

    window.requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    window.setTimeout(function () {
      toast.classList.remove('show');
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, duration);

    return toast;
  }

  function success(message, options) {
    return show(message, Object.assign({ type: 'success' }, options || {}));
  }

  function error(message, options) {
    return show(message, Object.assign({ type: 'error' }, options || {}));
  }

  document.addEventListener('DOMContentLoaded', ensureContainer);

  window.Toast = { show: show, success: success, error: error };
})(window, document);
