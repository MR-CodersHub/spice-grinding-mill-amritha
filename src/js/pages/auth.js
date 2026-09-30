/* ==========================================================================
   AUTH PAGE SCRIPT (login / signup)
   --------------------------------------------------------------------
   The mill has no customer login: orders are placed with the trade desk by
   phone or email. These pages therefore do three small things and no more:
     • show and hide the passphrase
     • rate a passphrase as it is typed
     • stop the "social" buttons pretending to be OAuth

   Submission itself is handled by the shared static form validation, whose
   success copy says plainly that nothing was transmitted.
   ========================================================================== */
(function (window, document) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Icons                                                               */
  /* ------------------------------------------------------------------ */
  function injectIcons() {
    var K = window.PageKit;
    K.qa('[data-mark-icon]').forEach(function (node) {
      node.innerHTML = K.icon(node.getAttribute('data-mark-icon'));
    });
    K.qa('[data-aside-icon]').forEach(function (node) {
      node.innerHTML = K.icon(node.getAttribute('data-aside-icon'));
    });
    K.qa('[data-social-icon]').forEach(function (node) {
      node.innerHTML = K.icon(node.getAttribute('data-social-icon'));
    });
    K.qa('[data-pw-toggle]').forEach(function (button) {
      button.innerHTML = K.icon('eye');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Passphrase visibility                                               */
  /* ------------------------------------------------------------------ */
  function initPasswordToggles() {
    var K = window.PageKit;
    K.qa('[data-pw-toggle]').forEach(function (button) {
      var input = K.q('#' + button.getAttribute('data-pw-toggle'));
      if (!input) return;

      button.addEventListener('click', function () {
        var shown = input.type === 'text';
        input.type = shown ? 'password' : 'text';
        button.innerHTML = K.icon(shown ? 'eye' : 'eyeOff');
        button.setAttribute('aria-pressed', shown ? 'false' : 'true');
        button.setAttribute('aria-label', shown ? 'Show passphrase' : 'Hide passphrase');
        input.focus();
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Passphrase strength                                                 */
  /*                                                                     */
  /* Four segments, four honest labels. Length dominates because that   */
  /* is what actually matters; we do not pretend a symbol adds much.     */
  /* ------------------------------------------------------------------ */
  var LABELS = ['Too short', 'Weak', 'Reasonable', 'Strong'];
  var COPY = {
    0: 'At least 8 characters. Longer beats stranger.',
    1: 'Add a number or a symbol, and avoid the name of your kitchen.',
    2: 'That will do for a trade account. Nine characters is better.',
    3: 'Good. Do not reuse it anywhere else.'
  };

  function score(value) {
    if (!value || value.length < 8) return 0;
    var score_ = 1;
    if (value.length >= 12) score_++;
    var classes = 0;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) classes++;
    if (/\d/.test(value)) classes++;
    if (/[^\w\s]/.test(value)) classes++;
    if (classes >= 2) score_++;
    if (score_ > 4) score_ = 4;
    return score_;
  }

  function initStrengthMeter() {
    var K = window.PageKit;
    var input = K.q('[data-strength-for]');
    var meter = K.q('#pw-meter');
    if (!input || !meter) return;

    var label = K.q('#pw-label');

    function paint() {
      var level = score(input.value);
      meter.className = 'pw-meter' + (level ? ' level-' + level : '');
      if (label) label.textContent = input.value ? COPY[level] : 'Not measured yet.';
    }

    input.addEventListener('input', paint);
    paint();
  }

  /* ------------------------------------------------------------------ */
  /* Social buttons                                                     */
  /* ------------------------------------------------------------------ */
  function initSocialButtons() {
    var K = window.PageKit;
    K.qa('[data-social]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var name = link.getAttribute('data-social');
        var label = name === 'google' ? 'Google' : 'WhatsApp';
        if (window.Toast) {
          window.Toast.show('Signing in with ' + label +
            ' is not connected on this build. Use the form, or call the trade desk.', { duration: 5000 });
        }
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Fill the form from ?plan= or ?topic= so a pricing link can land     */
  /* directly on the right application.                                   */
  /* ------------------------------------------------------------------ */
  function applyDeepLink() {
    var K = window.PageKit;
    var plan = K.param('plan');
    var topic = K.param('topic');
    if (!plan && !topic) return;

    var note = K.q('#auth-note');
    if (!note) return;

    var text = plan
      ? 'You came from the ' + K.esc(plan.charAt(0).toUpperCase() + plan.slice(1)) +
        ' plan — say so below and we will quote against that arrangement.'
      : 'You asked about ' + K.esc(topic.replace(/-/g, ' ')) +
        ' — the trade desk will pick this up in the note field below.';

    note.innerHTML = '<span class="note-icon" aria-hidden="true">' + K.icon('info') + '</span>' +
      '<p>' + text + '</p>';
    note.hidden = false;
  }

  function boot() {
    if (!window.PageKit) return;
    injectIcons();
    initPasswordToggles();
    initStrengthMeter();
    initSocialButtons();
    applyDeepLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
