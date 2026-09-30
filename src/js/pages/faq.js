/* ==========================================================================
   HELP CENTRE SCRIPT (FAQ.html)
   --------------------------------------------------------------------
   • Renders the subject chips and the full question list
   • Live search over question, answer, subject and tags
   • Subject filtering (registered with window.UI)
   • Renders the five most-asked questions
   ========================================================================== */
(function (window, document) {
  'use strict';

  var QUESTIONS = [
    {
      subject: 'The basics',
      popular: true,
      tags: ['purity', 'additives'],
      q: 'What is the difference between your spice and a supermarket one?',
      a: 'Single origin, ground cold, and nothing added. We do not use carriers, bulking agents, or volatile extracts to make a lot smell stronger. The batch card inside the pack tells you the district, the grower, the harvest window, the grind date and the measured batch temperature, and we will test any claim on that list.'
    },
    {
      subject: 'The basics',
      tags: ['authenticity'],
      q: 'Do you sell whole spices as well as ground?',
      a: 'Yes, and we would generally rather you did. Ground spice loses aroma within weeks of grinding; whole spice holds for months. Our whole-spice grading and cleaning service handles a lot minimum of 25 kg, and retail pouches start at 250 g.'
    },
    {
      subject: 'Grinding & granule',
      popular: true,
      tags: ['granule', 'texture', 'particle size'],
      q: 'Which granule size should I order?',
      a: 'Fine, for saree and for finishing a dish. Medium, the default for masala and for gravies. Coarse, for pickling and for anything where you want the spice to stay whole in the mouth. Coarser profiles cost slightly more because more is sifted out. If you are unsure, ask for the four-gram sample pack and taste the difference in your own kitchen.'
    },
    {
      subject: 'Grinding & granule',
      tags: ['roller mill', 'chakki', 'temperature'],
      q: 'Why is cold stone grinding slower, and why pay for it?',
      a: 'Friction is what kills aroma. A hot run drives off the volatile oils you are paying for, and no packaging can put them back. We run slow granite runners and probe every batch; anything over 38 degrees C is reground rather than shipped. You can read the measurements in our Journal article on stone versus roller milling.'
    },
    {
      subject: 'Grinding & granule',
      tags: ['steel', 'grinder'],
      q: 'Can I use a home steel grinder instead?',
      a: 'For a masala you are making that week, yes, and we will happily tell you how to get the most out of one: work in short pulses, never fill the jar, and do not run it continuously. The blades generate heat, so anything beyond a minute of grinding is cooking the spice rather than milling it.'
    },
    {
      subject: 'Storage & shelf life',
      popular: true,
      tags: ['storage', 'shelf life', 'container'],
      q: 'How long does ground spice actually keep?',
      a: 'Aromatically, weeks rather than the twelve months on the packet. The date on our pack is a best-before for quality, not a safety date. Keep the pack sealed, away from light, at under 25 degrees C, and do not repeatedly open and close it. If you decant, decant into a small opaque container rather than a large jar, because head-space is where aroma goes to die.'
    },
    {
      subject: 'Storage & shelf life',
      tags: ['freezer', 'humidity', 'oxidation'],
      q: 'Does freezing help?',
      a: 'For a year or more, yes, and it costs you nothing. Portion into sealed bags, remove the air, and keep the portions small so you only thaw what you need. Humidity is the bigger enemy: in a monsoon kitchen, a jar sitting open near the sink will lose more aroma in a fortnight than the same jar in a cool cupboard loses in a year.'
    },
    {
      subject: 'Storage & shelf life',
      tags: ['nuts', 'seeds', 'rancid'],
      q: 'Why do my whole nuts or seeds go rancid so quickly?',
      a: 'Almost always because they were ground rather than kept whole, or because they were stored warm. Whole fennel, cumin and coriander hold well; ground they go flat within weeks. If a batch smells of old oil rather than of the spice, it is oxidation, and no amount of airtight storage will reverse it.'
    },
    {
      subject: 'Orders & minimums',
      tags: ['minimum order', 'moq', 'small order'],
      q: 'What is the smallest order you take?',
      a: '250 g for cold stone milling, 500 g for a masala blend, one kit for gifting, and 25 kg for whole-spice grading because the cleaning line has a minimum charge. There is no minimum on the sample pack.'
    },
    {
      subject: 'Orders & minimums',
      tags: ['turnaround', 'lead time', 'rush'],
      q: 'How long does an order take?',
      a: 'Milling is 24 to 48 hours. A masala blend is three to five working days. Private label is three to four weeks, dominated by artwork approval and printing. Anything faster than our standard schedule attracts a rush charge, and we will always offer you the slower and cheaper option first.'
    },
    {
      subject: 'Orders & minimums',
      tags: ['credit', 'terms', 'invoice'],
      q: 'Do you offer trade terms or credit?',
      a: 'Thirty-day terms are available to registered kitchens, hotels and distributors after a first three orders on cash. Apply through the trade desk with your trading name and registration details, and we will send the form.'
    },
    {
      subject: 'Orders & minimums',
      tags: ['sample', 'test'],
      q: 'Can I get a sample before committing?',
      a: 'Yes. Ask for the sample box and we will send four 100 g packs at the four granule profiles, so you can taste the difference rather than read about it. Samples are free for trade enquiries and cost the shipping on retail ones.'
    },
    {
      subject: 'Shipping',
      tags: ['export', 'customs', 'international'],
      q: 'Do you ship outside India?',
      a: 'To 34 countries. Air freight to the Gulf, the UK and the EU is quoted per consignment. Volume orders travel by sea in food-grade lined containers. We handle the documentation and send you the certificate of analysis with the consignment.'
    },
    {
      subject: 'Shipping',
      tags: ['domestic', 'courier', 'damage'],
      q: 'How is it packed, and what if a consignment arrives damaged?',
      a: 'Pouches are double-sealed with a nitrogen flush and the batch card folded into the lid. Cartons are lined and moisture-barriered for monsoon transit. If anything arrives damaged, send a photograph of the outer carton and we will replace it, and we will claim against the courier ourselves.'
    },
    {
      subject: 'Blending',
      tags: ['custom masala', 'recipe', 'match'],
      q: 'Can you match an existing masala I already use?',
      a: 'Usually, yes. Send us a 100 g sample of the current blend, tell us which part of the dish it is wrong in, and we will develop against it. A blind comparative tasting at the end is standard, and you are welcome to bring the chef who thinks the current one is fine.'
    },
    {
      subject: 'Blending',
      tags: ['heat level', 'balance', 'aroma'],
      q: 'Can you reduce the heat in a blend?',
      a: 'Yes. Tell us how far — a 20% reduction is easy, 50% is a different blend and we will say so. We do not simply delete chilli; we rebalance with acid, fat and sweetness, because a masala that is only milder usually tastes thinner as well.'
    },
    {
      subject: 'Blending',
      tags: ['scaling', 'bulk recipe', 'food production'],
      q: 'Will a blend taste the same at 200 kg as at 2 kg?',
      a: 'It should, and it is worth asking the question. The things that change at scale are mixing time, charge size and ambient humidity. We hold charge size at 5 kg and adjust the blend time and grind profile per batch, and every batch card records both.'
    },
    {
      subject: 'Quality & testing',
      tags: ['lab', 'curcumin', 'volatile oil', 'certificate'],
      q: 'What do you actually test?',
      a: 'On arrival: moisture, foreign matter, volatile oil, and curcumin for turmeric-rich lots. After grinding: particle size distribution and a second temperature reading. Each delivery carries a summary report, and a full certificate of analysis is available on request for export consignments.'
    },
    {
      subject: 'Quality & testing',
      tags: ['adulteration', 'filler', 'pure'],
      q: 'How do I know nothing has been added?',
      a: 'The batch card names the district and the grower, and the test panel covers the things that get added: foreign matter, moisture above what the crop would naturally carry, and volatile oil below what a true lot would show. We do not issue a certificate for every pack, but we will test any sample you send us, and we publish the result whether it flatters us or not.'
    },
    {
      subject: 'Quality & testing',
      popular: true,
      tags: ['wrong', 'reground', 'complaint'],
      q: 'A batch is not right. What happens now?',
      a: 'Tell us within 14 days and we re-mill it at no charge. In most cases the problem is granule size rather than the spice, and re-milling is cheaper than replacing the raw material. If it is genuinely our error we will also cover the freight both ways.'
    },
    {
      subject: 'Private label',
      tags: ['white label', 'artwork', 'own brand'],
      q: 'How does private label work?',
      a: 'Three to four weeks from artwork approval. You supply or approve the artwork, we quote packaging, print and any tooling, and every pack carries your batch code alongside ours. Minimum is 100 kg per line. We do not print anything before written sign-off, however enthusiastic the deadline.'
    },
    {
      subject: 'Private label',
      tags: ['moq', 'setup', 'cost'],
      q: 'What does private label cost to set up?',
      a: 'The per-kilogram figure is quoted once we know the line weight and the pack material. The one-off is plate or cylinder cost plus setup, and that is quoted separately and always before you commit to anything.'
    },
    {
      subject: 'Gifting',
      tags: ['hampers', 'kits', 'festival', 'corporate'],
      q: 'Can you do corporate gifting and festival hampers?',
      a: 'Yes, from one kit upwards. The two busiest windows are Onam and Vishu, and the run-up to Diwali, so tell us early. We can print a card, personalise kit names, and ship to individual addresses rather than a single office.'
    },
    {
      subject: 'Gifting',
      tags: ['packaging', 'branding', 'ribbon'],
      q: 'Can the hampers carry our branding?',
      a: 'Yes, subject to the same artwork approval process as private label. We will send a dieline and the minimum print quantity before you commit to the finished kit.'
    },
    {
      subject: 'Kitchen training',
      tags: ['course', 'training', 'cohort'],
      q: 'What does the chef programme cost and where is it run?',
      a: 'The two-day intensive is ₹14,500 per seat and the three-day studio is ₹21,500, both run on the mill floor in Mattancherry with a maximum of six people. Raw material, lunch and the two kilos you take home are included.'
    },
    {
      subject: 'Kitchen training',
      tags: ['private', 'group', 'onsite'],
      q: 'Can you run a course for my whole kitchen?',
      a: 'Yes. Groups of eight or more can take a private cohort on dates we agree, and the practical half can be run at your kitchen instead of ours. Bring a dish and we will build the masala for it on the day.'
    },
    {
      subject: 'Mill & visits',
      tags: ['visit', 'tour', 'opening hours'],
      q: 'Can I visit the mill?',
      a: 'Yes, Monday to Saturday, and at 8am you will catch the stones turning. The mill floor is closed to visitors on Sundays, and groups over six need a week of notice. Closed shoes on the floor, please.'
    },
    {
      subject: 'Mill & visits',
      tags: ['sourcing', 'growers', 'direct trade'],
      q: 'How do you buy your raw material?',
      a: 'Direct from 2,400 farming families across Salem, Guntur, Ramganj Mandi, Unjha and the Idukki highlands. No aggregators, no agents who cannot name the field. We pay on the day a lot is accepted, and we turn lots back when they fail rather than blending them down.'
    },
    {
      subject: 'Mill & visits',
      popular: true,
      tags: ['organic', 'certification', 'sustainable'],
      q: 'Are your spices certified organic?',
      a: 'We are not certified organic, and we would rather tell you that plainly than let an assumption stand. The Salem and Idukki lots are grown without chemical inputs, and we can supply the growers declaration for those lines. If certification is a legal requirement for your market, we will say no rather than imply otherwise.'
    },
    {
      subject: 'Account & privacy',
      tags: ['data', 'gdpr', 'records'],
      q: 'What happens to the details I send you?',
      a: 'They are used to answer your enquiry, to place and ship an order, and to keep the batch record against the lot you bought. We do not sell or share them, and you can ask for a copy or for deletion at any time. The full text is in our privacy policy.'
    }
  ];

  function injectIcons() {
    var K = window.PageKit;
    var search = K.q('#faq-search-icon');
    if (search) search.innerHTML = K.icon('search');
    K.qa('[data-side-icon]').forEach(function (node) {
      node.innerHTML = K.icon(node.getAttribute('data-side-icon'));
    });
  }

  function subjects() {
    var counts = {};
    QUESTIONS.forEach(function (item) {
      counts[item.subject] = (counts[item.subject] || 0) + 1;
    });
    return Object.keys(counts).sort().map(function (name) {
      return { name: name, count: counts[name] };
    });
  }

  function haystack(item) {
    return [item.q, item.a, item.subject, (item.tags || []).join(' ')].join(' ').toLowerCase();
  }

  function faqItem(item) {
    var K = window.PageKit;
    return '<div class="faq-item">' +
      '<button class="faq-question" type="button">' +
        '<span><span class="faq-cat-tag">' + K.esc(item.subject) + '</span>' + K.esc(item.q) + '</span>' +
        '<span class="faq-icon" aria-hidden="true">' + K.icon('chevronDown') + '</span>' +
      '</button>' +
      '<div class="faq-answer"><div class="faq-answer-inner">' +
        '<p>' + K.esc(item.a) + '</p>' +
        (item.tags && item.tags.length
          ? '<ul>' + item.tags.map(function (tag) { return '<li>' + K.esc(tag) + '</li>'; }).join('') + '</ul>'
          : '') +
      '</div></div>' +
    '</div>';
  }

  function renderChips() {
    var K = window.PageKit;
    var group = K.q('[data-filter-group="faq"]');
    if (!group) return;

    group.innerHTML = '<button class="filter-chip active" data-filter-value="all" type="button">All</button>' +
      subjects().map(function (subject) {
        return '<button class="filter-chip" data-filter-value="' + K.esc(subject.name) + '" type="button">' +
          K.esc(subject.name) + ' (' + subject.count + ')</button>';
      }).join('');

    if (window.UI) window.UI.rebindFilters();
  }

  function renderList(view) {
    var K = window.PageKit;

    var matched = QUESTIONS.filter(function (item) {
      var subjectOk = view.subject === 'all' || item.subject === view.subject;
      var queryOk = !view.query || haystack(item).indexOf(view.query) !== -1;
      return subjectOk && queryOk;
    });

    K.q('#faq-accordion').innerHTML = matched.length
      ? matched.map(faqItem).join('')
      : '';

    var empty = K.q('#faq-empty');
    if (empty) empty.classList.toggle('show', matched.length === 0);

    K.q('#faq-count').textContent = String(matched.length);
    K.q('#faq-total').textContent = String(QUESTIONS.length);
  }

  function renderPopular() {
    var K = window.PageKit;
    var popular = QUESTIONS.filter(function (item) { return item.popular; }).slice(0, 5);
    K.fill('popular-questions', popular.map(faqItem).join(''));
  }

  function boot() {
    if (!window.PageKit) return;
    injectIcons();
    renderChips();

    var view = { query: '', subject: 'all' };
    renderList(view);
    renderPopular();

    if (window.UI) {
      window.UI.registerFilter('faq', function (value) {
        view.subject = value;
        renderList(view);
      });
    }

    var input = K.q('#faq-search');
    if (input) {
      var timer = null;
      input.addEventListener('input', function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          view.query = input.value.trim().toLowerCase();
          renderList(view);
        }, 180);
      });
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          input.value = '';
          view.query = '';
          renderList(view);
        }
      });
    }

    var reset = K.q('#faq-reset');
    if (reset) {
      reset.addEventListener('click', function () {
        if (input) input.value = '';
        view.query = '';
        view.subject = 'all';
        K.qa('[data-filter-group="faq"] .filter-chip').forEach(function (chip) {
          chip.classList.toggle('active', chip.getAttribute('data-filter-value') === 'all');
        });
        renderList(view);
      });
    }

    var requested = K.param('q');
    if (requested && input) {
      input.value = requested;
      view.query = requested.toLowerCase();
      renderList(view);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
