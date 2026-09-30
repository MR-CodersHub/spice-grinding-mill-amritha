/* ==========================================================================
   IMAGE LIBRARY
   --------------------------------------------------------------------
   Two verified, hot-link friendly sources are used across the site:
     • Unsplash CDN  — editorial photography (11 verified photo ids)
     • Wikimedia Commons — freely licensed documentary photography
   Every entry was resolved through the Commons API / verified against the
   Unsplash image CDN. No broken placeholders, no repeated imagery inside a
   single page.
   ========================================================================== */
(function (window) {
  'use strict';

  /* Unsplash — verified ids ------------------------------------------- */
  function u(id, width) {
    return 'https://images.unsplash.com/photo-' + id +
      '?auto=format&fit=crop&w=' + (width || 1200) + '&q=80';
  }

  /* Wikimedia Commons — canonical thumbnail URLs ---------------------- */
  var W = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';

  window.AMRITHA_IMG = {
    /* ---- Brand editorial (Unsplash) -------------------------------- */
    heroSack:      u('1596797038530-2c107229654b', 800),
    heroBowl:      u('1596040033229-a9821ebd058d', 800),
    shelfPouches:  u('1506368249639-73a05d6f6488', 1000),
    chilliPepper:  u('1608686207856-001b95cf60ca', 900),
    turmeric:      u('1615485500704-8e990f9900f7', 900),
    coriander:     u('1509358271058-acd22cc93898', 900),
    wholeSpices:   u('1514733670139-4d87a1941d55', 900),
    masala:        u('1599940824399-b87987ceb72a', 900),
    stepBring:     u('1546549032-9571cd6b27df', 700),
    stepGrind:     u('1588166524941-3bf61a9c41db', 700),
    stepPack:      u('1532336414038-cf19250c5757', 700),
    ctaSpiceBg:    u('1596040033229-a9821ebd058d', 1600),

    /* ---- Markets & trade (Wikimedia Commons) ------------------------ */
    marketPalayam: W + '5/5e/Indian_spices%2Cpalayam_market%2Cthiruvananthapuram%2Ckerala.jpg/1280px-Indian_spices%2Cpalayam_market%2Cthiruvananthapuram%2Ckerala.jpg',
    marketStreet:  W + 'a/a2/Indian_spice_market.jpg/1280px-Indian_spice_market.jpg',
    marketBowl:    W + '7/7b/Baba_Indian_spices.jpg/1280px-Baba_Indian_spices.jpg',
    marketBazaar:  W + '0/07/Spices_in_an_Indian_market.jpg/1280px-Spices_in_an_Indian_market.jpg',
    marketGoa:     W + 'c/c6/Indian_spices_for_sale_at_the_Anjuna_flea-market%2C_Anjuna_Beach%2C_Goa.jpg/1280px-Indian_spices_for_sale_at_the_Anjuna_flea-market%2C_Anjuna_Beach%2C_Goa.jpg',

    /* ---- Raw material studies --------------------------------------- */
    turmericRoots: W + '5/5b/Curcuma_longa_roots.jpg/1280px-Curcuma_longa_roots.jpg',
    turmericPowder:W + '3/3e/Turmeric_Powder_Spelled_Out.jpg/1280px-Turmeric_Powder_Spelled_Out.jpg',
    chilliPowder:  W + 'd/d4/Red_Chili_Powder_%28Lall_Mirch%29_%2849695826571%29.jpg/1280px-Red_Chili_Powder_%28Lall_Mirch%29_%2849695826571%29.jpg',
    cardamomGreen: W + '8/82/Green_Cardamom_Pods.jpg/1280px-Green_Cardamom_Pods.jpg',
    cardamomBlack: W + '8/80/Black_cardamom_pods.jpg/1280px-Black_cardamom_pods.jpg',
    corianderSeeds:W + '8/86/Coriander_Seeds.jpg/1280px-Coriander_Seeds.jpg',
    corianderShimla:W + '8/84/Coriander_Green_Seeds_%28Coriandrum_sativum%29_in_Shimla.jpg/1280px-Coriander_Green_Seeds_%28Coriandrum_sativum%29_in_Shimla.jpg',
    cuminSeeds:    W + '3/39/Seeds_of_Cumin.jpg/1280px-Seeds_of_Cumin.jpg',
    cuminWhole:    W + '6/61/Whole_Cumin_Seeds.jpg/1280px-Whole_Cumin_Seeds.jpg',
    cinnamonQuill: W + 'd/de/Cinnamomum_verum_spices.jpg/1280px-Cinnamomum_verum_spices.jpg',
    cinnamonPowder:W + '1/12/Ground_Cinnamon_Powder_and_a_Cinnamon_Stick.jpg/1280px-Ground_Cinnamon_Powder_and_a_Cinnamon_Stick.jpg',
    seedsAndNuts:  W + '3/37/Darjeeling%2C_India%2C_Indian_spices%2C_seeds_and_nuts.jpg/1280px-Darjeeling%2C_India%2C_Indian_spices%2C_seeds_and_nuts.jpg',

    /* ---- Craft & tools --------------------------------------------- */
    mortarWood:    W + 'd/d0/Pounding_Mortar_and_Pestle.jpg/1280px-Pounding_Mortar_and_Pestle.jpg',
    mortarStone:   W + 'a/a1/Thai_mortar_%28stone%29_and_pestle.jpg/1280px-Thai_mortar_%28stone%29_and_pestle.jpg',
    mortarKundi:   W + 'a/ab/Kundi-danda_%28mortar_and_pestle%29_2.jpg/1280px-Kundi-danda_%28mortar_and_pestle%29_2.jpg',
    mortarGlass:   W + 'e/e2/Glass_pestle_and_mortar%2C_Europe_Wellcome_L0057551.jpg/1280px-Glass_pestle_and_mortar%2C_Europe_Wellcome_L0057551.jpg',
    silapuaMill:   W + '5/50/Masala_bata_sila_o_silapua.jpeg/1280px-Masala_bata_sila_o_silapua.jpeg',

    /* --- Finished food ----------------------------------------------- */
    thaliNorth:    W + '8/8b/North_Indian_Vegetarian_Thali-MB51.jpg/1280px-North_Indian_Vegetarian_Thali-MB51.jpg',
    thaliSouth:    W + '7/73/South_Indian_Thali_in_Houston.jpg/1280px-South_Indian_Thali_in_Houston.jpg',
    rempahTray:    W + 'f/fc/Bumbu_dan_Rempah_-_rempah.jpg/1280px-Bumbu_dan_Rempah_-_rempah.jpg',
    spicePacket:   W + '4/4c/Chlorofeel_Spices_Turmeric_Powder_Packet.jpg/1280px-Chlorofeel_Spices_Turmeric_Powder_Packet.jpg'
  };
})(window);
