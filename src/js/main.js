/**
 * AMRITHA TRADITIONAL SPICE MILL — HOME PAGE SCRIPT
 * Handles the spice collection filter, the grind texture tester, the three
 * home-page modals and their form acknowledgements.
 *
 * The sticky header, mobile drawer, toast, and form validation are owned by
 * the shared modules (navbar.js, toast.js, form-validation.js) so that every
 * page behaves identically. This file therefore only touches home-page markup.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Category Filter Tabs for Spice Collection
  const tabButtons = document.querySelectorAll('.collection-tab-btn');
  const spiceCards = document.querySelectorAll('.spice-row-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      spiceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'grid';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // 2. Interactive Grinding Texture Selector
  const textureBtns = document.querySelectorAll('.texture-btn');
  const textureDisplay = document.getElementById('selected-texture-info');
  const textureDetails = {
    'coarse': 'Coarse Pounded (Daliya Grade) — Ideal for slow-simmered biryanis, potli masalas, and infused tadka oils where spices release aroma over extended braising.',
    'medium': 'Traditional Stone Chakki (Medium Grain) — Perfect for rich curries, gravies, and sambars. Retains natural granular body and essential oils.',
    'fine': 'Fine Silk Milled (Resham Grade) — Silky smooth, micro-milled at cold temperatures for instant dispersion in chutneys, marinades, and dry spice rubs.',
    'flakes': 'Crushed Flakes (Sun-Dried Shards) — Robust, crunchy spice texture with intact seeds for garnishing, tempering, and artisanal baking.'
  };

  textureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      textureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.getAttribute('data-texture');
      if (textureDisplay && textureDetails[type]) {
        textureDisplay.textContent = textureDetails[type];
      }
    });
  });

  // 3. Spice Quick View Modal Data & Handlers
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewClose = document.getElementById('quick-view-close');
  const quickViewImg = document.getElementById('modal-spice-img');
  const quickViewTitle = document.getElementById('modal-spice-title');
  const quickViewOrigin = document.getElementById('modal-spice-origin');
  const quickViewDesc = document.getElementById('modal-spice-desc');
  const quickViewNotes = document.getElementById('modal-spice-notes');
  const quickViewHeat = document.getElementById('modal-spice-heat');

  const spiceDatabase = {
    'chilli-pepper': {
      title: 'Chilli & Tellicherry Pepper',
      origin: 'Malabar Coast & Guntur Single-Estate',
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
      desc: 'Our single-origin blend of fiery Guntur Sannam and sun-drenched Byadgi chillies, cold-ground with bold Malabar Tellicherry black peppercorns. Rich crimson hue with clean, lingering pungency.',
      notes: 'Pungent, Smoked Paprika, Fruity Pine, Warm Citrus',
      heat: 'High (4/5) — Vibrant natural red oils'
    },
    'salem-turmeric': {
      title: 'Salem High-Curcumin Turmeric',
      origin: 'Salem District, Tamil Nadu',
      image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80',
      desc: 'Unpolished mother rhizomes harvested after 9 months of sun maturation. Tested at 5.2% natural curcumin. Ground on low-RPM stone chakkis to preserve potent therapeutic and aromatic qualities.',
      notes: 'Deep Earthy, Gingery Wood, Golden Musky Sweetness',
      heat: 'Mild Warmth (1/5) — Deep Golden Staining'
    },
    'rajasthani-coriander': {
      title: 'Rajasthani Eagle Coriander',
      origin: 'Ramganj Mandi, Rajasthan',
      image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
      desc: 'Cleaned, double-sifted green coriander seeds with high linalool content. Slow-roasted over clay hearths before slow milling to ensure crisp floral aroma that lifts everyday vegetable and lentil dishes.',
      notes: 'Crisp Citrus, Sweet Floral, Toasted Herbaceous',
      heat: 'Mild & Cooling (0.5/5)'
    },
    'cumin-fennel': {
      title: 'Gujarat Cumin & Lucknowi Saunf',
      origin: 'Unjha, Gujarat & Lucknow, Uttar Pradesh',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      desc: 'Hand-picked unpolished cumin seeds paired with sweet, thin-pod green fennel seeds. Distinctive digestive aroma, cold-milled to preserve volatile essential oils without bitter scorching.',
      notes: 'Warm Nutty, Anise Sweetness, Licorice Undertone',
      heat: 'Gentle Aromatic (1/5)'
    },
    'whole-spices': {
      title: 'Whole Heirloom Spices Assortment',
      origin: 'High Ranges of Idukki & Wayanad, Kerala',
      image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
      desc: 'Bold 8mm green cardamom pods, full-bud handpicked clove heads, true Ceylon rolled cinnamon quills, and aromatic whole star anise stars. Unadulterated and full of natural oils.',
      notes: 'Camphorous Sweet, Clove Eugenol, Spicy Woody',
      heat: 'Intense Volatile Warmth'
    },
    'masala-blends': {
      title: 'Royal Heritage Garam & Sambar Masalas',
      origin: 'Traditional Heirloom Recipe (Estd. 1948)',
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      desc: 'Formulated with 16 dry-roasted spices in precise ancient ratios. Hand-pounded and stone-milled. Creates royal depth in slow-cooked dishes without overpowering delicate vegetables or meats.',
      notes: 'Nutmeg, Mace, Black Cardamom, Roasted Fenugreek',
      heat: 'Balanced Medium (3/5)'
    }
  };

  const viewDetailBtns = document.querySelectorAll('.view-detail-btn');
  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const spiceId = btn.getAttribute('data-spice-id');
      const data = spiceDatabase[spiceId];
      if (data && quickViewModal) {
        quickViewImg.src = data.image;
        quickViewTitle.textContent = data.title;
        quickViewOrigin.textContent = data.origin;
        quickViewDesc.textContent = data.desc;
        quickViewNotes.textContent = data.notes;
        quickViewHeat.textContent = data.heat;
        quickViewModal.classList.add('active');
      }
    });
  });

  if (quickViewClose && quickViewModal) {
    quickViewClose.addEventListener('click', () => {
      quickViewModal.classList.remove('active');
    });
  }

  // 4. Custom Blend Request Modal
  const customBlendModal = document.getElementById('custom-blend-modal');
  const customBlendClose = document.getElementById('custom-blend-close');
  const openBlendBtns = document.querySelectorAll('.open-custom-blend-btn');
  const customBlendForm = document.getElementById('custom-blend-form');

  openBlendBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (customBlendModal) {
        customBlendModal.classList.add('active');
      }
    });
  });

  if (customBlendClose && customBlendModal) {
    customBlendClose.addEventListener('click', () => {
      customBlendModal.classList.remove('active');
    });
  }

  // 5. Bulk Order Inquiry Modal
  const bulkModal = document.getElementById('bulk-inquiry-modal');
  const bulkClose = document.getElementById('bulk-inquiry-close');
  const openBulkBtns = document.querySelectorAll('.open-bulk-modal-btn');
  const bulkForm = document.getElementById('bulk-inquiry-form');

  openBulkBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bulkModal) {
        bulkModal.classList.add('active');
      }
    });
  });

  if (bulkClose && bulkModal) {
    bulkClose.addEventListener('click', () => {
      bulkModal.classList.remove('active');
    });
  }

  // 6. Close modals on clicking the backdrop or pressing Escape
  [quickViewModal, customBlendModal, bulkModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    [quickViewModal, customBlendModal, bulkModal].forEach(modal => {
      if (modal) modal.classList.remove('active');
    });
  });

  // 7. Modal forms are validated + acknowledged by form-validation.js.
  //    They only need the dialog dismissed once the submission succeeds.
  function onAccepted(form, modal) {
    if (!form) return;
    form.addEventListener('formvalidation:success', () => {
      if (modal) modal.classList.remove('active');
    });
  }
  onAccepted(customBlendForm, customBlendModal);
  onAccepted(bulkForm, bulkModal);
});

