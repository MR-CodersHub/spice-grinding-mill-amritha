/* ==========================================================================
   ABOUT PAGE SCRIPT
   --------------------------------------------------------------------
   The narrative pages carry their words in the HTML, so the markup stays
   readable and indexable. What lives here is the repeated structured
   content: the heritage timeline, the four commitments, the team grid,
   and the two hero images resolved from the shared image library.
   ========================================================================== */
(function (window, document) {
  'use strict';

  var MILESTONES = [
    {
      year: '1948',
      title: 'Two rooms behind Bazaar Road',
      text: 'Amritha Menon leases two rooms in Mattancherry and installs a second-hand hand-crank chakki from a decommissioned rice mill in Palakkad. The bearings are worn, the stones are old, and the grinding is slow. He grinds clean pepper for the traders on the lane and does not blend a thing.'
    },
    {
      year: '1962',
      title: 'The first masala bench',
      text: 'Traders start asking for blends rather than single spices. A hand-assembled bench is set up in the back room — components roasted separately on a cast-iron pan, ground in small charges, and blended by weight on a brass scale. The bench is still in the building.'
    },
    {
      year: '1978',
      title: 'The lab notebook begins',
      text: 'A refractometer and a moisture meter are bought second-hand and a notebook is started. Every lot begins carrying its moisture reading, which is the first step toward the batch cards the mill still issues today.'
    },
    {
      year: '1996',
      title: 'The second generation',
      text: 'Ravi Menon takes over the stones from his father and slows the rollers down. Friction heat is identified as the reason aromatics were leaving the powder, and the rpm settings are cut. Volatile-oil testing starts in-house.'
    },
    {
      year: '2011',
      title: 'Direct contracts, no brokers',
      text: 'The sourcing team begins buying straight from farming clusters in Salem, Guntur, Ramganj Mandi, Unjha and the Idukki highlands. Payments are made on the day a lot is accepted rather than on a trader’s schedule.'
    },
    {
      year: '2024',
      title: 'Calibrated stones, measured batches',
      text: 'Laser particle-size measurement and probe thermometers arrive. Four granule profiles are now verified off one set of runners, and any run that exceeds 38 °C is reground rather than shipped.'
    },
    {
      year: 'Today',
      title: 'The third generation, and a waiting list',
      text: 'Lakshmi Amritha runs the grower contracts; Ravi runs the mill floor. The customer still brings the spice, the mill still does not adulterate it, and the batch card still has to be filled in by hand.'
    }
  ];

  var VALUES = [
    {
      icon: 'flame',
      title: 'Cold, or nothing',
      text: 'Under 38 °C, logged on the card. A hot run strips the aromatics we are being paid to protect, so it gets reground.'
    },
    {
      icon: 'leaf',
      title: 'Traceable to a field',
      text: 'District, grower and harvest window travel with the spice. If we cannot name the field, we do not buy the lot.'
    },
    {
      icon: 'shield',
      title: 'No blending to hit a price',
      text: 'We would rather decline a lot than dilute a premium one. The standard moves; the lot does not.'
    },
    {
      icon: 'sieve',
      title: 'Measured, not assumed',
      text: 'Curcumin, volatile oil, moisture and particle size are measured on arrival and again after the grind.'
    }
  ];

  var TEAM = [
    {
      initials: 'RM',
      name: 'Ravi Menon',
      role: 'Master Miller · Third generation',
      text: 'Runs the stones, keeps the batch log, and is the reason the temperatures quoted on this site are recorded rather than estimated.',
      tags: ['Stone milling', 'Quality control']
    },
    {
      initials: 'LA',
      name: 'Lakshmi Amritha',
      role: 'Sourcing Director',
      text: 'Holds the direct contracts with 2,400 farming families and visits every cluster between harvest and signature.',
      tags: ['Grower contracts', 'Sourcing']
    },
    {
      initials: 'NV',
      name: 'Chef Nikhil Varma',
      role: 'Culinary Director',
      text: 'Twenty-two years in Kerala and Chettinad kitchens. Develops the blends and argues with us about the heat levels.',
      tags: ['Blend development', 'Recipes']
    },
    {
      initials: 'MI',
      name: 'Dr Meenakshi Iyer',
      role: 'Food Scientist',
      text: 'Runs the in-house lab work and explains what the numbers mean when a customer asks whether a claim is true.',
      tags: ['Lab testing', 'Volatile oils']
    }
  ];

  function renderTimeline() {
    var K = window.PageKit;
    K.fill('heritage-timeline', MILESTONES.map(function (item) {
      return '<div class="timeline-item reveal">' +
        '<span class="timeline-dot" aria-hidden="true"></span>' +
        '<div class="timeline-year">' + K.esc(item.year) + '</div>' +
        '<h3>' + K.esc(item.title) + '</h3>' +
        '<p>' + K.esc(item.text) + '</p>' +
      '</div>';
    }).join(''));
  }

  function renderValues() {
    var K = window.PageKit;
    K.fill('values-grid', VALUES.map(function (value) {
      return '<div class="icon-card reveal">' +
        '<div class="icon-wrap">' + K.icon(value.icon) + '</div>' +
        '<h3>' + K.esc(value.title) + '</h3>' +
        '<p>' + K.esc(value.text) + '</p>' +
      '</div>';
    }).join(''));
  }

  function renderTeam() {
    var K = window.PageKit;
    K.fill('team-grid', TEAM.map(function (person) {
      return '<div class="team-card reveal">' +
        '<span class="avatar lg">' + K.esc(person.initials) + '</span>' +
        '<h3>' + K.esc(person.name) + '</h3>' +
        '<div class="team-role">' + K.esc(person.role) + '</div>' +
        '<p>' + K.esc(person.text) + '</p>' +
        '<div class="team-tags">' + person.tags.map(function (tag) {
          return '<span class="pill">' + K.esc(tag) + '</span>';
        }).join('') + '</div>' +
      '</div>';
    }).join(''));
  }

  function renderImages() {
    var K = window.PageKit;
    var IMG = window.AMRITHA_IMG || {};

    var story = K.q('#story-image');
    if (story) {
      story.setAttribute('src', IMG.mortarStone || IMG.wholeSpices);
      story.setAttribute('alt', 'A heavy stone mortar and pestle, the household equivalent of the mill stones');
    }

    var origins = K.q('#origins-image');
    if (origins) {
      origins.setAttribute('src', IMG.marketPalayam || IMG.wholeSpices);
      origins.setAttribute('alt', 'Neatly stacked cones of ground spice at a market');
    }

    var note = K.q('#note-icon');
    if (note) note.innerHTML = K.icon('alert');
  }

  function boot() {
    if (!window.PageKit) return;
    renderTimeline();
    renderValues();
    renderTeam();
    renderImages();
    if (window.UI) window.UI.refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
