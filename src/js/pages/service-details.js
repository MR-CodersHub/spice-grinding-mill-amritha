/* ==========================================================================
   SERVICE DETAILS PAGE SCRIPT
   --------------------------------------------------------------------
   Single physical page that renders any service in the catalogue, chosen
   with the ?id= query parameter:

     service-details.html?id=stone-chakki-milling
     service-details.html?id=spice-consultancy

   A missing or unknown id falls back to the first service and, for an
   unknown id, tells the visitor rather than failing silently.
   ========================================================================== */
(function (window, document) {
  'use strict';

  function setText(id, value) {
    var node = window.PageKit.q('#' + id);
    if (node) node.textContent = value;
  }

  function setHTML(id, value) {
    var node = window.PageKit.q('#' + id);
    if (node) node.innerHTML = value;
  }

  /* ------------------------------------------------------------------ */
  /* Sections                                                            */
  /* ------------------------------------------------------------------ */
  function renderHero(service) {
    document.title = service.name + ' | Amritha Spice Mill';

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', service.tagline + ' ' + service.summary);

    setText('crumb-current', service.name);
    setText('service-category', service.category + ' service');
    setText('service-title', service.name);
    setText('service-tagline', service.tagline);
    setText('enquiry-service-name', service.name);

    setHTML('service-tags', (service.tags || []).map(function (tag) {
      return '<span class="tag">' + window.PageKit.esc(tag) + '</span>';
    }).join(''));

    var img = window.PageKit.q('#service-image');
    if (img) {
      img.setAttribute('src', service.image);
      img.setAttribute('alt', service.imageAlt);
      img.setAttribute('loading', 'eager');
    }
  }

  function renderFacts(service) {
    setText('fact-turnaround', service.turnaround);
    setText('fact-minorder', service.minOrder);
    setText('fact-rating', service.rating + ' / 5');
    setText('fact-price', 'from ' + window.PageKit.money(service.pricing[1].price));
  }

  function renderOverview(service) {
    setHTML('service-overview', (service.overview || []).map(function (para) {
      return '<p>' + window.PageKit.esc(para) + '</p>';
    }).join(''));

    setHTML('service-highlights', (service.highlights || []).map(function (item) {
      return '<li><strong>' + window.PageKit.esc(item.title) + '</strong> — ' +
        window.PageKit.esc(item.text) + '</li>';
    }).join(''));
  }

  function renderFeatures(service) {
    setHTML('service-features', (service.features || []).map(function (feature) {
      return '<div class="icon-card reveal" style="background:rgba(255,255,255,.04);border-color:rgba(201,164,92,.35);">' +
        '<div class="icon-wrap" style="background:rgba(201,164,92,.16);border-color:var(--color-soft-gold);color:var(--color-soft-gold);">' +
        window.PageKit.icon('check') + '</div>' +
        '<h3 style="color:var(--color-soft-gold);font-size:1.06rem;margin-top:14px;">' +
        window.PageKit.esc(feature) + '</h3></div>';
    }).join(''));
  }

  function renderProcess(service) {
    setHTML('service-process', (service.process || []).map(function (step) {
      return '<div class="process-step reveal">' +
        '<div class="process-num">' + window.PageKit.esc(step.step) + '</div>' +
        '<h3>' + window.PageKit.esc(step.title) + '</h3>' +
        '<p>' + window.PageKit.esc(step.text) + '</p>' +
      '</div>';
    }).join(''));
  }

  function renderSpecs(service) {
    var body = window.PageKit.q('#service-specs tbody');
    if (!body) return;
    body.innerHTML = (service.specs || []).map(function (spec) {
      return '<tr><th scope="row"><strong>' + window.PageKit.esc(spec.label) + '</strong></th>' +
        '<td>' + window.PageKit.esc(spec.value) + '</td></tr>';
    }).join('');
  }

  function renderPricing(service) {
    setHTML('service-pricing', (service.pricing || []).map(function (plan) {
      var price = plan.price === null
        ? '<span class="cur" style="font-size:1.1rem;">Custom</span>'
        : '<span class="cur">₹</span>' + window.PageKit.inr(plan.price);
      return '<div class="plan-card' + (plan.popular ? ' featured' : '') + '">' +
        (plan.popular ? '<span class="plan-ribbon">Most chosen</span>' : '') +
        '<div class="plan-name">' + window.PageKit.esc(plan.name) + '</div>' +
        '<div class="plan-for">' + window.PageKit.esc(plan.note) + '</div>' +
        '<div class="plan-price">' + price +
          '<div class="per" style="margin-top:6px;">' + window.PageKit.esc(plan.unit) + '</div></div>' +
        '<ul class="col-check">' + plan.features.map(function (f) {
          return '<li>' + window.PageKit.esc(f) + '</li>';
        }).join('') + '</ul>' +
        '<a class="btn ' + (plan.popular ? 'btn-primary' : 'btn-outline-dark') + '" href="#service-enquiry">' +
        window.PageKit.esc(plan.cta) + '</a>' +
      '</div>';
    }).join(''));
  }

  function renderFaqs(service) {
    setHTML('service-faqs', (service.faqs || []).map(function (faq) {
      return '<div class="faq-item">' +
        '<button class="faq-question" type="button">' + window.PageKit.esc(faq.q) +
          '<span class="faq-icon" aria-hidden="true">' + window.PageKit.icon('chevronDown') + '</span>' +
        '</button>' +
        '<div class="faq-answer"><div class="faq-answer-inner">' +
          '<p>' + window.PageKit.esc(faq.a) + '</p>' +
        '</div></div>' +
      '</div>';
    }).join(''));
  }

  function renderRelated(service) {
    var all = window.AMRITHA_SERVICES || [];
    var others = all.filter(function (item) { return item.id !== service.id; }).slice(0, 6);
    setHTML('related-services', others.map(function (item) {
      return '<li><a href="' + window.PageKit.serviceHref(item.id) + '">' +
        window.PageKit.esc(item.name) + '</a></li>';
    }).join(''));
  }

  function prefillForm(service) {
    var hidden = window.PageKit.q('#enquiry-service-id');
    if (hidden) hidden.value = service.id;
    var select = window.PageKit.q('#sd-volume');
    if (select) {
      /* Sensible default from the catalogue minimum */
      var min = service.minOrder;
      if (/kg/i.test(min)) select.value = 'unsure';
    }
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  function boot() {
    var K = window.PageKit;
    if (!K) return;

    var all = window.AMRITHA_SERVICES || [];
    if (!all.length) return;

    var id = K.param('id');
    var service = K.findById(all, id);

    if (!service) {
      service = all[0];
      if (id) {
        if (window.Toast) {
          window.Toast.error('That service is no longer listed — showing our most requested service instead.', { duration: 6000 });
        }
      }
    }

    renderHero(service);
    renderFacts(service);
    renderOverview(service);
    renderFeatures(service);
    renderProcess(service);
    renderSpecs(service);
    renderPricing(service);
    renderFaqs(service);
    renderRelated(service);
    prefillForm(service);

    var guarantee = K.q('#guarantee-icon');
    if (guarantee) guarantee.innerHTML = K.icon('shield');

    if (window.UI) window.UI.refresh();

    /* Deep-linked anchors still work after the content is injected */
    if (window.location.hash) {
      var target = K.q(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
