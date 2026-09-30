/* ==========================================================================
   CLIENT-SIDE FORM VALIDATION
   --------------------------------------------------------------------
   Vanilla, attribute-driven validator shared by every form on the site
   (contact, newsletter, custom blend, login, signup, notify, review).

   Markup contract
   ---------------
   <form data-validate>                       enables automatic validation
   <div class="field">                        wrapper that turns red/green
     <label for="x">…<span class="req">*</span></label>
     <input id="x" name="x" required>
     <div class="form-error" data-error-for="x">…<span>message</span></div>
     <div class="form-ok" data-ok-for="x">…<span>Looks good</span></div>
   </div>
   <div class="form-status" data-status>      success / failure panel

   Supported field rules
   ---------------------
   required · type="email" · type="tel" · minlength · maxlength
   pattern · data-min · data-max · data-match="#otherFieldId"
   data-required-group="name" (at least one checkbox/radio must be ticked)
   data-validate-message="custom text" (overrides the default message)
   ========================================================================== */
(function (window, document) {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  var PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
  var URL_RE = /^(https?:\/\/)[^\s$.?#].[^\s]*$/i;

  var ALERT_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="7" x2="12" y2="13"></line>' +
    '<line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

  var OK_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true">' +
    '<polyline points="20 6 9 17 4 12"></polyline></svg>';

  var CHECK_ICON =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  function fieldWrapper(el) {
    return el.closest ? el.closest('.field, .news-field, .auth-card, .filter-bar') : null;
  }

  function errorNode(el) {
    var id = el.id;
    var scope = el.form || document;
    if (id) {
      var found = scope.querySelector('[data-error-for="' + id + '"]');
      if (found) return found;
    }
    var wrapper = fieldWrapper(el);
    if (!wrapper) return null;
    var existing = wrapper.querySelector('.form-error[data-auto]');
    if (existing) return existing;
    var node = document.createElement('div');
    node.className = 'form-error';
    node.setAttribute('data-auto', '1');
    node.innerHTML = ALERT_ICON + '<span></span>';
    if (el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
      el.insertAdjacentElement('afterend', node);
    } else {
      el.insertAdjacentElement('afterend', node);
    }
    return node;
  }

  function okNode(el) {
    var wrapper = fieldWrapper(el);
    if (!wrapper) return null;
    var existing = wrapper.querySelector('.form-ok[data-auto]');
    if (existing) return existing;
    var node = document.createElement('div');
    node.className = 'form-ok';
    node.setAttribute('data-auto', '1');
    node.innerHTML = OK_ICON + '<span>Looks good</span>';
    el.insertAdjacentElement('afterend', node);
    return node;
  }

  function setError(el, message) {
    var wrapper = fieldWrapper(el);
    var node = errorNode(el);
    if (node) {
      var span = node.querySelector('span');
      if (span) span.textContent = message;
      node.style.display = 'flex';
    }
    if (wrapper) wrapper.classList.add('is-invalid');
    el.setAttribute('aria-invalid', 'true');
  }

  function setValid(el) {
    var wrapper = fieldWrapper(el);
    if (wrapper) {
      wrapper.classList.remove('is-invalid');
      wrapper.classList.add('is-valid');
    }
    el.removeAttribute('aria-invalid');
  }

  function clearState(el) {
    var wrapper = fieldWrapper(el);
    if (wrapper) wrapper.classList.remove('is-invalid', 'is-valid');
    var node = el.id ? (el.form || document).querySelector('[data-error-for="' + el.id + '"]') : null;
    if (node) node.style.display = 'none';
  }

  function fieldLabel(el) {
    var wrapper = fieldWrapper(el);
    var label = wrapper ? wrapper.querySelector('label') : null;
    var text = label ? label.textContent.replace('*', '').trim() : (el.name || 'This field');
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function valueOf(el) {
    if (el.type === 'checkbox') return el.checked;
    return String(el.value || '').trim();
  }

  /* ------------------------------------------------------------------ */
  /* Rule engine                                                         */
  /* ------------------------------------------------------------------ */
  function validateField(el, form) {
    var custom = el.getAttribute('data-validate-message');
    var value = valueOf(el);
    var label = fieldLabel(el);
    var message = '';

    /* required group (checkbox / radio cluster) */
    var groupName = el.getAttribute('data-required-group');
    if (groupName) {
      var group = form.querySelectorAll('[data-required-group="' + groupName + '"]');
      var anyChecked = Array.prototype.some.call(group, function (input) { return input.checked; });
      if (!anyChecked) {
        message = custom || 'Please select at least one option.';
        setError(el, message);
        return false;
      }
      setValid(el);
      return true;
    }

    if (el.type === 'checkbox' && el.hasAttribute('required')) {
      if (!el.checked) {
        setError(el, custom || 'This confirmation is required.');
        return false;
      }
      setValid(el);
      return true;
    }

    if (value === '' || value === false) {
      if (el.hasAttribute('required')) {
        setError(el, custom || (label + ' is required.'));
        return false;
      }
      clearState(el);
      return true;
    }

    switch (el.type) {
      case 'email':
        if (!EMAIL_RE.test(value)) {
          setError(el, custom || 'Enter a valid email address, e.g. name@kitchen.com');
          return false;
        }
        break;
      case 'tel':
        if (!PHONE_RE.test(value)) {
          setError(el, custom || 'Enter a valid phone number (digits, spaces and + only).');
          return false;
        }
        break;
      case 'url':
        if (!URL_RE.test(value)) {
          setError(el, custom || 'Enter a full URL starting with https://');
          return false;
        }
        break;
      case 'number':
        var min = el.getAttribute('min') || el.getAttribute('data-min');
        var max = el.getAttribute('max') || el.getAttribute('data-max');
        var num = parseFloat(value);
        if (isNaN(num)) {
          setError(el, custom || (label + ' must be a number.'));
          return false;
        }
        if (min !== null && min !== '' && num < parseFloat(min)) {
          setError(el, custom || (label + ' cannot be less than ' + min + '.'));
          return false;
        }
        if (max !== null && max !== '' && num > parseFloat(max)) {
          setError(el, custom || (label + ' cannot be more than ' + max + '.'));
          return false;
        }
        break;
      default:
        break;
    }

    if (el.hasAttribute('pattern')) {
      var pattern = new RegExp('^(?:' + el.getAttribute('pattern') + ')$');
      if (!pattern.test(value)) {
        setError(el, custom || (label + ' is not in the expected format.'));
        return false;
      }
    }

    var minLength = el.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength, 10)) {
      setError(el, custom || (label + ' needs at least ' + minLength + ' characters.'));
      return false;
    }

    var maxLength = el.getAttribute('maxlength');
    if (maxLength && value.length > parseInt(maxLength, 10)) {
      setError(el, custom || (label + ' cannot exceed ' + maxLength + ' characters.'));
      return false;
    }

    var matchId = el.getAttribute('data-match');
    if (matchId) {
      var other = form.querySelector('#' + matchId);
      if (other && other.value !== el.value) {
        setError(el, custom || (label + ' does not match.'));
        return false;
      }
    }

    setValid(el);
    return true;
  }

  function validateForm(form) {
    var fields = Array.prototype.slice.call(
      form.querySelectorAll('input, select, textarea')
    ).filter(function (el) {
      return el.type !== 'hidden' && !el.disabled && el.offsetParent !== null;
    });

    var firstInvalid = null;
    var valid = true;

    fields.forEach(function (el) {
      if (el.type === 'radio' && el.name) {
        var radios = Array.prototype.slice.call(form.querySelectorAll('input[type="radio"][name="' + el.name + '"]'));
        if (radios.indexOf(el) !== 0) return; /* validate the cluster once */
      }
      if (!validateField(el, form)) {
        valid = false;
        if (!firstInvalid) firstInvalid = el;
      } else if (el.hasAttribute('required') || el.type === 'email' || el.hasAttribute('pattern')) {
        setValid(el);
      } else {
        clearState(el);
      }
    });

    if (firstInvalid) {
      try { firstInvalid.focus({ preventScroll: true }); } catch (e) { firstInvalid.focus(); }
      if (firstInvalid.scrollIntoView) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return valid;
  }

  function collect(form) {
    var data = {};
    Array.prototype.slice.call(form.elements).forEach(function (el) {
      if (!el.name || el.type === 'submit' || el.type === 'button') return;
      if (el.type === 'checkbox') {
        if (el.getAttribute('data-required-group')) {
          data[el.name] = data[el.name] || [];
          if (el.checked) data[el.name].push(el.value);
        } else {
          data[el.name] = el.checked;
        }
      } else if (el.type === 'radio') {
        if (el.checked) data[el.name] = el.value;
      } else {
        data[el.name] = el.value;
      }
    });
    return data;
  }

  function statusPanel(form, type, title, message) {
    var panel = form.querySelector('[data-status]');
    if (!panel) {
      panel = document.createElement('div');
      panel.className = 'form-status';
      panel.setAttribute('data-status', '');
      panel.setAttribute('role', 'status');
      panel.setAttribute('aria-live', 'polite');
      form.insertBefore(panel, form.firstChild);
    }
    panel.className = 'form-status show';
    panel.style.borderColor = type === 'error' ? 'var(--danger)' : 'var(--success)';
    panel.style.background = type === 'error' ? 'var(--danger-soft)' : 'var(--success-soft)';
    panel.style.color = type === 'error' ? 'var(--danger)' : 'var(--success)';
    panel.innerHTML =
      (type === 'error'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="7" x2="12" y2="13"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
        : CHECK_ICON) +
      '<div><strong>' + title + '</strong><div class="status-body">' + message + '</div></div>';
    return panel;
  }

  function clearStatus(form) {
    var panel = form.querySelector('[data-status]');
    if (panel) panel.classList.remove('show');
  }

  function buttonLoading(form, state) {
    var button = form.querySelector('[type="submit"]');
    if (!button) return;
    if (state) {
      button.dataset.originalLabel = button.innerHTML;
      button.disabled = true;
      button.innerHTML = 'Sending…';
    } else {
      button.disabled = false;
      if (button.dataset.originalLabel) button.innerHTML = button.dataset.originalLabel;
    }
  }

  /* ------------------------------------------------------------------ */
  /* Public API                                                          */
  /* ------------------------------------------------------------------ */
  /* Per-form overrides live on the element as data-* attributes so a single
     form-data-validate="true" can carry its own acknowledgement copy:
       data-success-title · data-success-message · data-success-toast
       data-error-message · data-delay
     Global defaults come from the options object passed to attach().     */
  function formConfig(form, opts) {
    var config = {};
    var key;
    for (key in opts) if (Object.prototype.hasOwnProperty.call(opts, key)) config[key] = opts[key];

    ['successTitle', 'successMessage', 'successToast', 'errorMessage'].forEach(function (name) {
      var attr = 'data-' + name.replace(/[A-Z]/g, function (c) { return '-' + c.toLowerCase(); });
      var value = form.getAttribute(attr);
      if (value) config[name] = value;
    });

    if (form.getAttribute('data-delay')) config.delay = parseInt(form.getAttribute('data-delay'), 10);
    if (form.hasAttribute('data-no-reset')) config.reset = false;
    return config;
  }

  function attach(form, options) {
    if (!form) return null;
    var opts = formConfig(form, options || {});
    var submitted = false;

    var validator = function (event) {
      if (event) event.preventDefault();
      submitted = true;
      clearStatus(form);

      if (!validateForm(form)) {
        statusPanel(
          form,
          'error',
          'Almost there — a few details need attention',
          opts.errorMessage ||
            'Please correct the highlighted fields and try again. Nothing has been sent yet.'
        );
        if (window.Toast) window.Toast.error('Please fix the highlighted fields.');
        form.dispatchEvent(new CustomEvent('formvalidation:error', { bubbles: true }));
        return false;
      }

      buttonLoading(form, true);
      var payload = collect(form);
      var reference = 'ASM-' + Date.now().toString(36).toUpperCase().slice(-6);

      window.setTimeout(function () {
        buttonLoading(form, false);
        if (typeof opts.onSuccess === 'function') {
          opts.onSuccess(payload, form, reference);
        } else {
          statusPanel(
            form,
            'success',
            opts.successTitle || 'Thank you — received',
            opts.successMessage || 'We have your details and will reply shortly. Reference ' + reference + '.'
          );
          if (window.Toast) window.Toast.success(opts.successToast || 'Your submission has been received.');
        }
        form.dispatchEvent(new CustomEvent('formvalidation:success', {
          bubbles: true,
          detail: { payload: payload, reference: reference, form: form }
        }));
        if (opts.reset !== false) form.reset();
      }, opts.delay || 700);
      return true;
    };

    form.addEventListener('submit', validator);

    /* Live re-validation only after the first attempt, so the form never
       shouts at someone who is still typing their first field. */
    function liveCheck(event) {
      var el = event.target;
      if (!el || !el.name) return;
      if (!submitted) return;
      if (el.type === 'radio' && el.name) {
        var radios = Array.prototype.slice.call(form.querySelectorAll('input[type="radio"][name="' + el.name + '"]'));
        if (radios.indexOf(el) !== 0) return;
      }
      if (el.closest && el.closest('[data-required-group]')) {
        var group = form.querySelectorAll('[data-required-group="' + el.getAttribute('data-required-group') + '"]');
        if (Array.prototype.some.call(group, function (input) { return input.checked; })) {
          el.closest('.field').classList.remove('is-invalid');
        } else {
          validateField(el, form);
        }
        return;
      }
      validateField(el, form);
    }

    form.addEventListener('blur', liveCheck, true);
    form.addEventListener('input', liveCheck);
    form.addEventListener('change', liveCheck);

    return {
      validate: function () { return validateForm(form); },
      submit: validator,
      status: function (type, title, message) { return statusPanel(form, type, title, message); },
      data: function () { return collect(form); }
    };
  }

  function attachAll(options) {
    var instances = [];
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      if (form.dataset.validateReady === '1') return;
      form.dataset.validateReady = '1';
      var instance = attach(form, options);
      if (instance) instances.push(instance);
    });
    return instances;
  }

  /* Password strength meter — pairs an <input data-strength-for="id">
     with a sibling .pw-meter element. */
  function initPasswordMeters() {
    document.querySelectorAll('[data-strength-for]').forEach(function (input) {
      var target = document.getElementById(input.getAttribute('data-strength-for')) || input;
      var wrapper = fieldWrapper(target) || document;
      var meter = wrapper.querySelector('.pw-meter');
      var label = wrapper.querySelector('.pw-label');
      if (!meter) return;

      input.addEventListener('input', function () {
        var value = target.value;
        var score = 0;
        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
        if (/\d/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value) && value.length >= 10) score++;
        meter.className = 'pw-meter level-' + score;
        if (label) {
          label.textContent = !value
            ? 'Use 8+ characters with a number and a symbol.'
            : ['', 'Weak — add length and variety.', 'Fair — add a number or symbol.',
               'Good — one more character class helps.', 'Excellent password.'][score];
        }
      });
    });
  }

  function boot() {
    initPasswordMeters();
    if (typeof window.FormValidationDefaults === 'function') {
      attachAll(window.FormValidationDefaults());
    } else {
      attachAll();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.FormValidation = {
    attach: attach,
    attachAll: attachAll,
    validateForm: validateForm,
    collect: collect,
    status: statusPanel,
    initPasswordMeters: initPasswordMeters
  };
})(window, document);
