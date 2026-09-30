/* ==========================================================================
   JOURNAL DATA — powers pages/blog.html and pages/blog-details.html
   --------------------------------------------------------------------
   blog.html          → list, client-side search and category filter
   blog-details.html  → full article, loaded from ?id=…
   Sidebar widgets    → categories with counts, recent posts, popular tags
   Content blocks are declarative so the renderer stays tiny.
   ========================================================================== */
(function (window) {
  'use strict';

  var IMG = window.AMRITHA_IMG || {};

  function d(iso) {
    var date = new Date(iso + 'T09:00:00');
    return {
      iso: iso,
      display: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      short: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
  }

  window.AMRITHA_POSTS = [
    /* ------------------------------------------------------------------ */
    {
      id: 'cold-stone-vs-roller-mill',
      title: 'Cold Stone Milling vs. the Roller Mill: What Actually Happens to Aroma',
      category: 'Craft',
      tags: ['Milling', 'Volatile oils', 'Technique'],
      author: 'Ravi Menon',
      authorRole: 'Third-generation Master Miller',
      authorInitials: 'RM',
      date: d('2026-08-18'),
      readTime: 9,
      views: 4820,
      featured: true,
      image: IMG.masala,
      imageAlt: 'Ground masala powders arranged in small bowls',
      excerpt:
        'We measured volatile oil retention across three milling methods on the same Guntur Sannam lot. The gap between a cold stone mill and a hot roller mill was larger than most people expect — and it compounds badly with time.',
      content: [
        { type: 'p', text: 'There is a persistent belief in some professional kitchens that a heavier, warmer grind "wakes up" a spice. It does not. Heat wakes up the reaction, and the reaction is oxidation. What you smell in a hot mill is a new set of compounds that the plant never made — a cooked, flatter, slightly bitter note that is genuinely a different flavour from the one in the seed.' },
        { type: 'p', text: 'We wanted numbers rather than opinions, so we took one lot of Guntur Sannam, split it three ways, and milled it three ways: on our granite chakki at low RPM, on a domestic steel mixer grinder for ninety seconds, and on a commercial roller mill running hot. Then we measured the volatile oil fraction by hydro-distillation at the moment of milling, and again at six months.' },
        { type: 'h2', text: 'The measurement' },
        { type: 'p', text: 'Volatile oils in chilli are mostly capsicinoids and carotenoid breakdown products, all of which are heat-labile above roughly 60 °C. We took a 10 g sample from each batch, distilled it in a Clevenger apparatus, and measured the volume of recovered oil against the un-milled seed as a baseline of 100.' },
        { type: 'figure', src: IMG.chilliPowder, alt: 'Bright red chilli powder in a market bowl', caption: 'The Guntur Sannam lot used for the comparison, freshly ground and sifted.' },
        { type: 'ul', items: [
          '<strong>Cold stone chakki:</strong> 96.4% of baseline volatile oil at milling, 91.1% at six months.',
          '<strong>Domestic steel mixer (90 seconds):</strong> 78.2% at milling, 61.5% at six months.',
          '<strong>Hot roller mill:</strong> 54.7% at milling, 38.9% at six months.'
        ] },
        { type: 'p', text: 'The stone mill loses four percent at milling and about five percent more over six months. The roller mill loses forty-five percent immediately and then keeps bleeding. That is the headline: the damage from heat is done in the first minute, and storage only makes it worse.' },
        { type: 'quote', text: 'The mill does not add flavour. It can only decide how much of the flavour survives the trip.', cite: 'Ravi Menon, Master Miller' },
        { type: 'h2', text: 'Why the stone keeps the oil in' },
        { type: 'p', text: 'A granite runner stone does not crush so much as shear. The seed is dragged across a hard, slightly abrasive surface and the cell walls rupture progressively rather than explosively. Friction heat is real but small, and because the batch is small and the stone face is massive, that heat leaves the powder almost as fast as it arrives.' },
        { type: 'p', text: 'A roller mill works by compression between two rollers spinning at high speed. The heat there comes from the sheer throughput — thousands of kilograms an hour through a small gap. There is no way to run a roller mill cold at commercial volume, which is why every cold-milled spice on the market is milled in small batches, and why the ones that claim otherwise are usually diluting with something.' },
        { type: 'figure', src: IMG.mortarStone, alt: 'A heavy stone mortar and pestle', caption: 'The same principle at household scale: a stone surface shears where steel crushes.' },
        { type: 'h2', text: 'What this means in your kitchen' },
        { type: 'ol', items: [
          'For <strong>tadka and tempering</strong>, where the spice hits hot fat, a slightly coarser grind survives better — the individual particles are still identifiable when they land in the oil.',
          'For <strong>raw applications</strong> — chutneys, marinades, finishing dusts on a salad — fineness matters more than ever, because there is no heat step to release anything.',
          'For <strong>long braises</strong>, the difference narrows considerably after an hour of cooking. This is the honest part: a hot-milled cumin in a two-hour biryani is a perfectly good cumin.',
          'For <strong>anything you eat without cooking</strong>, or anything you keep for months, buy cold-milled or mill it yourself. That is where the entire gap lives.'
        ] },
        { type: 'note', title: 'A note on our own bias', text: 'We sell cold milling, so of course we measured cold milling. The methodology is published above precisely so that anyone can repeat it: any spice, any mill, any lab. We would welcome a competing set of numbers, and we would publish it here whether it flattered us or not.' },
        { type: 'h2', text: 'Milling it yourself' },
        { type: 'p', text: 'You do not need our mill. A heavy granite or stone mortar, thirty seconds of steady circular pressure, and small batches will get you most of the way to what we produce. The one thing a home setup cannot easily replicate is temperature control on a long grind: keep it to under a minute, rest for a minute, and repeat. That is the whole trick.' },
        { type: 'p', text: 'If you want the numbers on a different species, or a comparison of granule profiles from the same batch, we publish those in the Journal too. Ask, and we will run it.' }
      ],
      related: ['how-to-store-ground-spices', 'understanding-volatile-oils', 'spice-granularity-guide']
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'how-to-store-ground-spices',
      title: 'How to Store Ground Spices Without Losing the Aroma You Paid For',
      category: 'Guides',
      tags: ['Storage', 'Freshness', 'Aroma'],
      author: 'Lakshmi Amritha',
      authorRole: 'Founder & Head of Sourcing',
      authorInitials: 'LA',
      date: d('2026-08-04'),
      readTime: 7,
      views: 6310,
      image: IMG.marketPalayam,
      imageAlt: 'Neatly stacked cones of ground spice at a market',
      excerpt:
        'You ground it properly and then you put it in the wrong jar. A short, practical guide to oxygen, light, heat and the three storage habits that quietly destroy most home spice collections.',
      content: [
        { type: 'p', text: 'Ask a chef what ruins ground spice and they will usually say "the fridge". They are right, and it is the most common expensive mistake in home cooking. Everything else — the jar, the shelf, the label — is secondary.' },
        { type: 'h2', text: 'The four enemies, in order of damage' },
        { type: 'h3', text: '1. Oxygen' },
        { type: 'p', text: 'Once a seed is broken open, its volatile oils begin to oxidise into less interesting compounds. This is not a storage problem you can solve later; it happens in the first week at normal oxygen levels. A jar that is opened every day loses its top notes in about two months. A jar opened once a month still has them at six.' },
        { type: 'h3', text: '2. Heat' },
        { type: 'p', text: 'Every ten degrees of ambient temperature roughly halves the rate of oxidation. That is why a spice shelf above a stove is the worst place in your kitchen to keep anything. Our own mill room is climate-controlled to 21 °C for exactly this reason, even though Kochi is not cold.' },
        { type: 'h3', text: '3. Light' },
        { type: 'p', text: 'UV drives photochemical degradation and, more visibly, fades colour. Turmeric that has gone mustard-brown on one side and stayed orange on the other has been sitting in sunlight.' },
        { type: 'h3', text: '4. Moisture' },
        { type: 'p', text: 'Ground spice is hygroscopic. It will pull water out of the air, clump, and then host mould in the gaps. This is the only enemy you can actually see, and it is also the only one that makes the spice dangerous rather than merely disappointing.' },
        { type: 'figure', src: IMG.cardamomGreen, alt: 'Green cardamom pods', caption: 'Pod spices hold their oils far better than ground ones — keep them whole until the moment of use.' },
        { type: 'h2', text: 'The three habits that actually work' },
        { type: 'ol', items: [
          '<strong>Buy small, buy often.</strong> Six months of supply is the maximum for ground spice. We mill to order partly for this reason: freshness you cannot use is money in the bin.',
          '<strong>Decant, do not display.</strong> A beautiful open jar on a shelf is a beautiful open jar losing its top notes every week. Airtight in a cupboard, open on the counter for a minute — that is the trade we recommend.',
          '<strong>Keep the whole seed as insurance.</strong> Black peppercorns, cardamom pods, cinnamon quills and cloves keep for a year or more whole and lose almost nothing. If you only fix one habit, fix this one.'
        ] },
        { type: 'quote', text: 'Buy whole, grind small, use fast. Everything else is decoration.', cite: 'The Amritha mill-room wall, more or less' },
        { type: 'h2', text: 'What about the fridge?' },
        { type: 'p', text: 'For spices you will genuinely not touch for a year — a cardamom pod bought in bulk, say — a sealed jar in the fridge is defensible. For ground powder in daily use it is a bad trade. Cold slows oxidation, yes, but the condensation cycle that follows every time the jar leaves the fridge costs you more top notes than the cold saved. The exception is anything with high moisture to begin with, such as a green-chilli paste, which genuinely belongs in the fridge.' },
        { type: 'note', title: 'A quick test', text: 'Crush a pinch between your fingers and smell your thumb. Then crush a second pinch and smell it again, ten seconds later. The first smell is the top note, the second is the base. If the second is barely anything, the powder is spent — it will taste dull no matter how carefully you cook it.' }
      ],
      related: ['cold-stone-vs-roller-mill', 'spice-granularity-guide', 'understanding-volatile-oils']
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'garam-masala-masterclass',
      title: 'Garam Masala: Building a Blend From Ratios, Not From Recipes',
      category: 'Recipes',
      tags: ['Masala', 'Blend development', 'North Indian'],
      author: 'Chef Nikhil Varma',
      authorRole: 'Consulting Flavour Chef',
      authorInitials: 'NV',
      date: d('2026-07-22'),
      readTime: 11,
      views: 5190,
      image: IMG.rempahTray,
      imageAlt: 'A brass tray of whole spices laid out for a masala',
      excerpt:
        'Every garam masala recipe gives you a list. Almost none tell you the ratios, the roast levels, or why your potli masala tastes flat while a Bengali one tastes alive. Here is the arithmetic behind the arithmetic.',
      content: [
        { type: 'p', text: 'A masala is a ratio and a roast profile. That is genuinely all it is, and the moment you accept that, the endless list of recipes stops being a problem and becomes a menu of starting points.' },
        { type: 'h2', text: 'The architecture' },
        { type: 'p', text: 'A working garam masala has four functional layers, and a blend fails when one of them is missing rather than when the quantities are slightly off.' },
        { type: 'ul', items: [
          '<strong>Base (40–50%):</strong> the earth. Cumin, coriander, black pepper. These carry the blend and can take the most heat.',
          '<strong>Sweetness (15–20%):</strong> the bridge. Cardamom, cinnamon, cassia. Without this layer a masala tastes savoury and flat.',
          '<strong>Heat (10–15%):</strong> the lift. Cloves, black pepper, mace. This layer is where most people underseason.',
          '<strong>Top note (5–10%):</strong> the finish. Nutmeg, mace, bay leaf, rose or kewra. Small quantity, disproportionate effect.'
        ] },
        { type: 'figure', src: IMG.seedsAndNuts, alt: 'Whole seeds and nuts ready for blending', caption: 'Every component roasted separately before the blend is assembled — this is not optional.' },
        { type: 'h2', text: 'Roast each component for itself' },
        { type: 'p', text: 'The single most common fault in a home-cooked masala is roasting everything together. Cumin and cinnamon have wildly different optimal endpoints. Cumin is done when the aroma turns from raw to nutty, which takes about 90 seconds in a dry pan over medium heat. Cinnamon in that same pan will still be inert. Cardamom, if you toast the pods, needs 3–4 minutes. Nuts go golden and need 6.' },
        { type: 'ol', items: [
          'Roast each component <strong>separately</strong> in a dry pan, on medium-low, until it smells like itself rather than like hot.',
          'Cool each one completely before combining. Warm spice in a blender is warm spice, and heat at blending is heat you did not want.',
          'Combine and grind in two passes: a coarse pass to preserve some structure, then a fine pass only for the powders you want silk-smooth.',
          'Rest the finished masala for at least 48 hours in an airtight jar before use. The aroma re-settles and the blend stops tasting sharp.'
        ] },
        { type: 'quote', text: 'A masala that tastes flat is almost never missing an ingredient. It is missing a roast, or a rest, or both.', cite: 'Chef Nikhil Varma' },
        { type: 'h2', text: 'Three regional readings' },
        { type: 'h3', text: 'The potli masala' },
        { type: 'p', text: 'Decayed, floral, faintly sweet. Star anise, green cardamom and cassia carry it; mace and nutmeg finish it. It goes in at the very end of a biryani, never before, because a long braise will flatten the top note completely.' },
        { type: 'h3', text: 'The Bengali five-spice (panch phoron)' },
        { type: 'p', text: 'Almost the opposite. Yellow lentil dal, white pepper, cumin, coriander, aniseed, and a small amount of chilli. No cardamom, no cinnamon, no sweetness at all. It is used at the start of a dish, whole, and it is a tempering rather than a finishing masala.' },
        { type: 'h3', text: 'The Karnataka garad masala' },
        { type: 'p', text: 'Red chilli, coriander, cumin, and a great deal of urad dal, which roasts to a nutty depth and thickens the masala as a bonus. Heavier, earthier, and it goes in early.' },
        { type: 'note', title: 'On the "18 spices" claim', text: 'More spices is not better. Every additional component dilutes every other one, and a blend of eighteen components in equal parts tastes like eighteen separate things rather than one masala. Twelve is plenty. The number matters far less than whether the four layers are present and whether each thing was roasted properly.' },
        { type: 'h2', text: 'Storing it' },
        { type: 'p', text: 'A home masala keeps four to six months in a dark, airtight jar, less if you cook from it daily. Beyond that, the cardamom and the top note are gone. If you are going to make a large batch, make it in September and use it through the winter, which is when masala is doing the most work anyway.' }
      ],
      related: ['chettinad-pepper-masala', 'cold-stone-vs-roller-mill', 'sourcing-turmeric-salem']
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'sourcing-turmeric-salem',
      title: 'Sourcing Turmeric in Salem: Nine Months in the Ground, Five Percent in the Cup',
      category: 'Sourcing',
      tags: ['Turmeric', 'Provenance', 'Single origin'],
      author: 'Lakshmi Amritha',
      authorRole: 'Founder & Head of Sourcing',
      authorInitials: 'LA',
      date: d('2026-07-09'),
      readTime: 8,
      views: 3640,
      image: IMG.turmericRoots,
      imageAlt: 'Fresh turmeric rhizomes freshly harvested',
      excerpt:
        'Turmeric is the easiest spice to adulterate and the hardest to buy well. A week with the Erode and Salem farming belt, and a simple field test for anyone buying their own.',
      content: [
        { type: 'p', text: 'Erode in Tamil Nadu produces a startling amount of turmeric, and most of the world\'s "Indian turmeric" passes through that one district. The rhizome is lifted nine months after planting, cured in the sun for two to three weeks, then polished and traded. What happens between lifting and your kitchen is where the value disappears.' },
        { type: 'h2', text: 'Why it is adulterated at all' },
        { type: 'p', text: 'Because starch is cheap. Lead chromate is a vivid yellow and was used for decades to deepen the colour of poor lots. Both are now banned in India and both are still found. Neither is a remote risk in properly sourced material, but neither is something you can detect by looking.' },
        { type: 'h3', text: 'The wet test' },
        { type: 'p', text: 'Take a teaspoon of powder in a small glass, add a little water, stir, and leave it for 20 minutes. Real turmeric forms a dense yellow-orange sediment and the liquid above stays relatively clear. A starch-adulterated powder leaves a pale, cloudy, often slightly blue-grey layer at the top and much less settled. It is not a laboratory test, but it reliably catches gross adulteration.' },
        { type: 'ul', items: [
          '<strong>Colour:</strong> Deep golden-orange, not lemon yellow and not brownish.',
          '<strong>Aroma:</strong> Warm, slightly musky, gingery. If it smells sweet or musty, it is old or badly stored.',
          '<strong>Sediment:</strong> Heavy, even, and the colour runs through the whole depth of the sample.',
          '<strong>Cost:</strong> Genuinely high-curcumin Salem turmeric is not cheap. A bargain price is a warning, not a deal.'
        ] },
        { type: 'figure', src: IMG.turmericPowder, alt: 'Turmeric powder spelled out on a surface', caption: 'A clean, single-origin Salem lot — note the even colour through the depth of the powder.' },
        { type: 'h2', text: 'The curcumin number, honestly' },
        { type: 'p', text: 'The Indian Standard (IS 1058) asks for a minimum curcumin content of 2.5% for turmeric powder. Our lots from the Salem belt test between 4.8% and 5.6%, and the highest we have bought was 6.1% from a single farmer who plants late and harvests early. If a supplier quotes you 8% curcumin, they are measuring something else.' },
        { type: 'quote', text: 'Ask for the curcumin assay and the lot code together. A supplier with only one of the two is telling you something.', cite: 'Lakshmi Amritha' },
        { type: 'h2', text: 'The rhizomes we actually buy' },
        { type: 'ol', items: [
          '<strong>Unpolished, thumb-pressed:</strong> The outer skin is left on. It is bitter, but it is where most of the oil sits, and you can grind it off.',
          '<strong>Finger-sized with 5–7 nodes:</strong> Younger rhizomes are more aromatic but lower in curcumin. Older, heavier rhizomes give colour. A blend of both is what we ask for.',
          '<strong>Firm, no soft patches:</strong> Soft patches indicate storage damage and will smell off once cut.',
          '<strong>With the flowering stalk still on:</strong> A stalk is a decent sign of a fresh lift. Old lots have been stored for months.'
        ] },
        { type: 'note', title: 'Grinding it yourself', text: 'Unpolished turmeric grinds into something coarser and more fragrant than polished, because the skin adds body. Mill it on medium and sift once. You will lose perhaps 8% of the weight to the skin, and gain most of the aroma.' },
        { type: 'h2', text: 'Storage, briefly' },
        { type: 'p', text: 'Ground turmeric fades faster than almost any other common spice, because the curcuminoid pigments are light-sensitive. Keep it in an opaque or dark container, out of a south-facing window, and buy a quantity you will finish in four months. A dark glass jar in a cupboard is ideal.' }
      ],
      related: ['understanding-volatile-oils', 'garam-masala-masterclass', 'how-to-store-ground-spices']
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'spice-granularity-guide',
      title: 'Coarse, Medium, Silk or Flakes: Choosing the Right Grind for the Job',
      category: 'Guides',
      tags: ['Technique', 'Texture', 'Milling'],
      author: 'Ravi Menon',
      authorRole: 'Third-generation Master Miller',
      authorInitials: 'RM',
      date: d('2026-06-28'),
      readTime: 6,
      views: 4110,
      image: IMG.mortarKundi,
      imageAlt: 'A stone mortar with freshly pounded spice',
      excerpt:
        'Four granule profiles, four jobs. A practical guide to matching grind size to the dish in front of you — including the one rule that overrides all the others.',
      content: [
        { type: 'p', text: 'We mill the same batch of spices into four profiles every week. The only variable is the stone gap. It is the cheapest decision in the whole process and it changes more about the finished dish than most people expect.' },
        { type: 'h2', text: 'The four profiles' },
        { type: 'h3', text: 'Coarse — about 1.2 mm' },
        { type: 'p', text: 'Closely resembles a daliya or a split mustard. Particles are individually visible and audibly crunchy. It survives long braises because each piece takes time to release, which is exactly what you want in a biryani, a slow-cooked rassam, or an infused oil.' },
        { type: 'h3', text: 'Medium — about 450 µm' },
        { type: 'p', text: 'The everyday default, and for good reason. It suspends in gravy, clings to vegetables, distributes evenly in a masala, and works in almost any cooked application. If you only ever buy one grind, buy this.' },
        { type: 'h3', text: 'Silk — about 120 µm' },
        { type: 'p', text: 'Almost a powder. It disperses instantly, which makes it ideal for chutneys, marinades, dry rubs, spice sugars and anything you eat raw. It does not behave well in a frying pan: the particles scorch before the batch cooks through.' },
        { type: 'h3', text: 'Flake — about 2.5 mm' },
        { type: 'p', text: 'Crushed, not milled. Whole seeds broken into two or three pieces with their structure intact. For tempering, for garnishing, for pan-frying, and for anything where you want to see the spice in the dish.' },
        { type: 'figure', src: IMG.cuminWhole, alt: 'Whole cumin seeds', caption: 'Flake-profile cumin: broken, not ground. The aroma is released in bursts rather than all at once.' },
        { type: 'h2', text: 'The rule that overrides everything' },
        { type: 'quote', text: 'Match the grind to how long the spice will cook, not to how fine you like it to look.', cite: 'Ravi Menon' },
        { type: 'ul', items: [
          '<strong>Under two minutes of heat</strong> → silk or medium. Chutney, salad dressing, marinade, finishing dust.',
          '<strong>Two to fifteen minutes</strong> → medium. Everyday curries, dals, sabzi, a masala in a curry base.',
          '<strong>Fifteen minutes to hours</strong> → coarse. Biryanis, slow-cooked meat, vegetable curries, pickles.',
          '<strong>No heat at all</strong> → flake or whole. Salad dressings built on olive oil, finishing salts, garnishes.'
        ] },
        { type: 'h2', text: 'Why fine grinds scorch' },
        { type: 'p', text: 'Because surface area. A particle one tenth the size has roughly ten times the surface of a particle ten times larger, and it reaches browning temperature first. A silk-milled chilli powder dropped into hot oil will catch in seconds while the same chilli at coarse grind will still be red after a minute. This is the single most common mistake we see in home kitchens, and it is entirely a grind-size error rather than a heat error.' },
        { type: 'h2', text: 'A note on double grinding' },
        { type: 'p', text: 'Grinding something fine, then grinding it again produces a different result than grinding straight to fine. The second pass creates more uniform fines and a slightly creamier texture, which matters for masalas and for anything you will sift. It also generates a little more heat, so keep the second pass under thirty seconds.' },
        { type: 'note', title: 'One jar, four jars', text: 'If you buy our spices, ask for the medium profile by default and note the others in the blend request. A household that keeps one coarse jar of chilli, one medium jar of coriander and one silk jar of turmeric is dramatically better off than one household with four jars of everything at medium, and it costs less.' }
      ],
      related: ['cold-stone-vs-roller-mill', 'how-to-store-ground-spices', 'bulk-supply-for-restaurants']
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'understanding-volatile-oils',
      title: 'Volatile Oils: The Chemistry Behind Why Your Spice Smells Like Anything at All',
      category: 'Craft',
      tags: ['Chemistry', 'Milling', 'Education'],
      author: 'Dr Meenakshi Iyer',
      authorRole: 'Food Technologist, Quality Lab',
      authorInitials: 'MI',
      date: d('2026-06-14'),
      readTime: 10,
      views: 2760,
      image: IMG.mortarWood,
      imageAlt: 'A wooden mortar and pestle',
      excerpt:
        'Why does a spice smell, and why does it stop? A short tour of the chemistry of volatile oils — the compounds that carry aroma, the enemies that destroy them, and what "oleoresin" actually means on a label.',
      content: [
        { type: 'p', text: 'Aroma is chemistry you can smell. Spices produce volatile compounds — small, volatile, oil-soluble molecules — and those compounds are what you perceive as aroma. They are also, almost without exception, fragile. Understanding the second fact tells you almost everything about how to store, mill and cook spices.' },
        { type: 'h2', text: 'What is in the oil' },
        { type: 'p', text: 'The composition is species-specific and endlessly varied. Cumin is dominated by cuminyl aldehyde, which is what makes it smell like cumin. Cardamom is cineole and terpinyl acetate. Clove is eugenol, at about 70 to 90 per cent of the oil, which is why a single clove can perfume a whole pot of rice. Pepper is piperine and a family of sesquiterpenes. Turmeric has almost no volatile oil at all — its character comes from curcuminoids, which are not volatile and are instead pigmented and bitter.' },
        { type: 'figure', src: IMG.cardamomBlack, alt: 'Black cardamom pods', caption: 'Black cardamom carries a smoky, camphorous profile from cineole and 1,8-cineole-family compounds.' },
        { type: 'h2', text: 'Why they leave' },
        { type: 'h3', text: 'Heat' },
        { type: 'p', text: 'Volatile molecules have low molecular weights by definition. Heat gives them the energy to leave the surface and escape into the air — which is precisely why a spice dropped into a hot pan smells so powerfully for the first thirty seconds, and then much less for the rest of the cooking. That first burst is not a failure of the spice. It is the oil doing exactly what oil does.' },
        { type: 'h3', text: 'Oxygen' },
        { type: 'p', text: 'Once exposed, many of these compounds oxidise into less volatile, less fragrant products. This is the slow, invisible loss that makes an old jar taste flat. It is also why a sealed nitrogen-flushed pack keeps its character far longer than an open jar.' },
        { type: 'h3', text: 'Light' },
        { type: 'p', text: 'Photochemical degradation, particularly for the pigmented curcuminoids. The colour change you see in an old turmeric jar is a chemical change, not just a cosmetic one.' },
        { type: 'h2', text: 'Volatile oil, oleoresin, and what a label means' },
        { type: 'p', text: 'These two terms get used loosely in the trade, and it matters when you are buying.' },
        { type: 'ul', items: [
          '<strong>Volatile oil</strong> is the fraction you can distill off — the aroma. A product with a specified volatile oil content has been measured, usually against an ISO standard for that species.',
          '<strong>Oleoresin</strong> is the whole aromatic extract, including the non-volatile, colour-bearing and pungent fraction. It is what a capsule of "black pepper extract" actually contains.',
          '<strong>Powder</strong> is ground seed. It contains both, in the proportion nature set, but it begins losing the volatile fraction the moment it is milled.'
        ] },
        { type: 'quote', text: 'A label that says "100% pure" tells you about the filler. A label that says "volatile oil 2.4% min" tells you about the spice.', cite: 'Dr Meenakshi Iyer, Quality Lab' },
        { type: 'h2', text: 'What this means when you buy' },
        { type: 'ol', items: [
          'Prefer a supplier who quotes a <strong>volatile oil or curcumin figure</strong> over one who simply says pure.',
          'Prefer <strong>whole seed</strong> when you can store it properly. The oil is intact in the seed and only leaves when you break it open.',
          'Treat any "extract" as a different ingredient, not a stronger spice. It is a concentrated dose and you cook with it differently.',
          'Be suspicious of <strong>very cheap, very bright</strong> powder. Brightness usually means something was added.'
        ] },
        { type: 'h2', text: 'The practical takeaway' },
        { type: 'p', text: 'Aromatics are precious and perishable. That is the entire philosophy behind cold milling, small batches, nitrogen flushing and opaque packaging — four different answers to the same problem. Once you internalise that a spice smell is a finite, decaying resource, you shop differently: you buy less, you buy whole, and you grind it yourself when you can.' }
      ],
      related: ['cold-stone-vs-roller-mill', 'sourcing-turmeric-salem', 'how-to-store-ground-spices']
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'chettinad-pepper-masala',
      title: 'Chettinad Pepper Masala: Grinding for Heat That Builds Instead of Bites',
      category: 'Recipes',
      tags: ['Chettinad', 'Pepper', 'South Indian'],
      author: 'Chef Nikhil Varma',
      authorRole: 'Consulting Flavour Chef',
      authorInitials: 'NV',
      date: d('2026-05-30'),
      readTime: 7,
      views: 3980,
      image: IMG.corianderSeeds,
      imageAlt: 'Whole coriander seeds ready for grinding',
      excerpt:
        'A dry-roasted, stone-ground pepper masala with a long, building heat rather than a sharp one — and the two mill settings that make the difference between it and a flat version.',
      content: [
        { type: 'p', text: 'Chettinad cooking uses a small number of very well-chosen components, and the pepper masala is the sharpest of them. What distinguishes a good one is not heat level. It is the shape of the heat: it should arrive gently, sit in the middle of the palate, and finish cleanly rather than dominate.' },
        { type: 'h2', text: 'The components' },
        { type: 'ul', items: [
          '<strong>Black peppercorns</strong> — the base. Buy them whole, in quantity, and grind them as late as possible.',
          '<strong>Dried red chillies</strong> — a little heat with colour. Guntur or Byadgi; about one-third the pepper by volume.',
          '<strong>Coriander seed</strong> — sweetness and citrus, which is what makes the heat readable.',
          '<strong>Cumin seed</strong> — the earth note that anchors the whole thing.',
          '<strong>Fenugreek</strong> — a small amount, for a slightly bitter, map-like depth. This is the component people leave out and then cannot work out why theirs is incomplete.'
        ] },
        { type: 'figure', src: IMG.chilliPowder, alt: 'Bright red chilli powder', caption: 'Use a chilli powder that is already deep red from natural colour, not from added heat.' },
        { type: 'h2', text: 'The ratio that works' },
        { type: 'p', text: 'Start at 10 parts black pepper, 3 parts dried red chilli, 3 parts coriander, 2 parts cumin, 1 part fenugreek, all by weight before roasting. This is a warm, generous masala, roughly 3 out of 5 on heat. If you want a gentler one, halve the pepper and keep everything else. If you want it fierce, go to 12 parts pepper and accept that fenugreek is doing more work than you think.' },
        { type: 'h2', text: 'Two grinds, deliberately' },
        { type: 'p', text: 'This is the part that most recipes miss, and it is the whole reason a home version tastes different from a restaurant one.' },
        { type: 'ol', items: [
          '<strong>Coarse pass first.</strong> Grind everything together to a coarse, sandy texture — roughly a coarse daliya. This is what goes into the tadka and what gets bloomed in the oil.',
          '<strong>Fine pass second, separately.</strong> Take a third of that coarse mix and grind only that to a fine powder. This is what gets sprinkled over the finished dish.',
          '<strong>Keep them separate.</strong> A single uniform grind has to compromise between blooming and finishing, and a compromise is always worse than either.'
        ] },
        { type: 'quote', text: 'Bloom coarsely, finish finely. Two grinds, two moments, two different jobs.', cite: 'Chef Nikhil Varma' },
        { type: 'h2', text: 'Roasting' },
        { type: 'p', text: 'Roast the components in batches according to their own endpoint: coriander and cumin together for about two minutes until fragrant and just past raw, chillies for 90 seconds until the colour deepens without smoking, fenugreek for under a minute because it turns bitter fast, and the pepper last for barely 45 seconds — pepper is the most volatile of the group and the easiest to scorch. Cool everything completely before grinding.' },
        { type: 'h2', text: 'Using it' },
        { type: 'ul', items: [
          '<strong>Coarse</strong> goes into the tadka with the other aromatics, at the very end of the tempering, off the heat if the pan is aggressive.',
          '<strong>Fine</strong> goes over the finished dish, along with a final spoon of ghee if you are using it.',
          '<strong>A third option:</strong> mix a little fine powder with coconut milk and salt to make a quick dip. This is not traditional but it is very good.'
        ] },
        { type: 'note', title: 'Storing this one', text: 'Pepper masala fades faster than most, because pepper is the most volatile component in it. Keep it airtight and dark, use it inside three months for full punch, and grind a small fresh batch whenever you make the dish properly. A mill grinder takes ninety seconds.' }
      ],
      related: ['garam-masala-masterclass', 'spice-granularity-guide', 'festive-hampers-kerala']
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'festive-hampers-kerala',
      title: 'Onam and Vishu Hampers: Designing a Box That Is Actually Opened',
      category: 'Journal',
      tags: ['Gifting', 'Kerala', 'Festive'],
      author: 'Lakshmi Amritha',
      authorRole: 'Founder & Head of Sourcing',
      authorInitials: 'LA',
      date: d('2026-05-16'),
      readTime: 6,
      views: 3320,
      image: IMG.marketGoa,
      imageAlt: 'Spice packets displayed at a market stall',
      excerpt:
        'Most gift boxes are designed to be photographed, not opened. What we learned building 3,000 festive hampers about designing for the twenty seconds after the lid comes off.',
      content: [
        { type: 'p', text: 'In late August the mill fills with the same request: a hamper for Onam or Vishu, corporate if you are lucky, and the deadline is always sooner than anyone thinks. We built 3,000 units for a Diwali campaign and 900 for an Onam week. Here is what we changed as a result.' },
        { type: 'h2', text: 'The first thing is not the box' },
        { type: 'p', text: 'We used to lead with packaging. Now we lead with the order of the jars inside, because the twenty seconds after the lid comes off is the only moment that matters. A beautiful box full of spices in random order gets one polite smell and then a cupboard. A plain box with the jars in a deliberate progression gets used for months.' },
        { type: 'ol', items: [
          '<strong>Start bright.</strong> Green cardamom or a fresh citrus note. It is the first thing anyone smells and it sets the expectation of quality.',
          '<strong>Move to warm.</strong> Turmeric and coriander, which are recognisable and friendly.',
          '<strong>End deep.</strong> A roasted blend, mace or cinnamon. Last in the box, so it is the note that lingers in the room.',
          '<strong>Leave one out.</strong> A single whole spice — cardamom pods or peppercorns — loose in a small cloth pouch. It is the only thing the recipient will handle, and handling is what makes a gift feel personal.'
        ] },
        { type: 'figure', src: IMG.marketBazaar, alt: 'Spices sold in an open market', caption: 'Onam and Vishu are the two weeks our entire region cooks most, and gifts reflect that.' },
        { type: 'h2', text: 'Tasting cards, and the rules for them' },
        { type: 'p', text: 'We rewrote our cards four times. The current version has three rules: no technical vocabulary, no Scoville numbers, and no more than thirty words. Every card says what to smell for, one thing to cook with it, and one sentence about where it comes from. If a card needs a second paragraph, it is too long.' },
        { type: 'quote', text: 'Write the card for the person who has never held a cardamom pod. That person is most of your list.', cite: 'Lakshmi Amritha' },
        { type: 'h2', text: 'What we stopped doing' },
        { type: 'ul', items: [
          '<strong>Stopping filler sachets.</strong> Every jar in the kit is something a person will cook with. We dropped two from the six-jar kit and added two useful ones instead.',
          '<strong>Stopping plastic film.</strong> Craft board, jute wrap, paper tape, glass jars. It cost us more and produced a noticeably better reaction.',
          '<strong>Stopping the "assortment" word.</strong> "A fine assortment of spices" tells a recipient nothing. "Six spices for everyday cooking, arranged light to deep" tells them everything.'
        ] },
        { type: 'h2', text: 'The logistics that decide whether it works' },
        { type: 'p', text: 'Festive gifting fails on dates, not on taste. Our rules now: the mill reserves capacity in the second week of July for anything shipping in September; corporate orders close at 60 days out; and we will not accept an order we cannot mill and pack properly, even at a penalty. We have turned down more festive work than we have taken, and the clients who came back the following year were the ones we turned down politely.' },
        { type: 'note', title: 'Planning ahead', text: 'If you need hampers for a festival, the useful deadline is six weeks before, not two. That is when we can guarantee a milling slot, your artwork approval, and a delivery date. Six weeks sounds slow until you have watched a festive week arrive all at once.' }
      ],
      related: ['chettinad-pepper-masala', 'how-to-store-ground-spices', 'bulk-supply-for-restaurants']
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'bulk-supply-for-restaurants',
      title: 'What a Restaurant Should Ask a Spice Supplier Before Signing Anything',
      category: 'Business',
      tags: ['Trade', 'Restaurants', 'Sourcing'],
      author: 'Ravi Menon',
      authorRole: 'Third-generation Master Miller',
      authorInitials: 'RM',
      date: d('2026-04-27'),
      readTime: 8,
      views: 5240,
      image: IMG.marketStreet,
      imageAlt: 'Buckets of ground spices at a market',
      excerpt:
        'A checklist of the nine questions that separate a spice supplier who can actually supply from one who is reselling someone else\'s powder. Written from the other side of the table.',
      content: [
        { type: 'p', text: 'Most kitchens that get burned by a spice supplier were not careful — they were in a hurry. A chef needs 40 kg by Friday, three suppliers quote in an hour, and the decision is made on price. Six months later the dish has drifted and nobody can say exactly when it changed. Here are the questions that would have prevented it.' },
        { type: 'h2', text: 'The nine questions' },
        { type: 'ol', items: [
          '<strong>Where does the raw material come from?</strong> A named district is a good answer. "South India" is not. A supplier who cannot say will also not be able to tell you when a harvest is bad.',
          '<strong>Who mills it?</strong> If the answer is a third-party plant you have never heard of, ask for their FSSAI licence and their allergen segregation policy.',
          '<strong>Can I see a batch card?</strong> Lot code, milling date, temperature at milling, origin. If a batch card is produced after you ask for it, assume it is decorative.',
          '<strong>What is the granule specification?</strong> A mesh number, not "fine" or "coarse". A supplier who cannot quote a mesh cannot hold a specification.',
          '<strong>What is the moisture reading?</strong> Above about 9% and you are buying a mould risk, not a spice.',
          '<strong>How do you handle a late delivery?</strong> The real answer is not the policy. The real answer is whether they volunteer it before you notice.',
          '<strong>Can I split the consignment across multiple spices?</strong> Any serious kitchen needs eight to fifteen lines in one delivery. If they can only ship one product per box, you are managing a supplier, not a partner.',
          '<strong>What is the credit and cancellation position?</strong> Get this in writing before the first order, when nobody is being difficult.',
          '<strong>Who do I call when a dish drifts?</strong> A name and a mobile number. Not a ticket portal.'
        ] },
        { type: 'figure', src: IMG.marketBowl, alt: 'Bulk spice stacked at a market counter', caption: 'Bulk spice should arrive with paperwork, not just a sack.' },
        { type: 'h2', text: 'On price, honestly' },
        { type: 'p', text: 'There is a legitimate range, and a legitimate reason for it. Whole seed is cheaper per kilo than ground, obviously. Coarse is cheaper than silk because the silk pass takes longer. A spice that has been stone-milled cold costs more than a hot-milled one because the throughput is a fraction. What is not legitimate is paying a single-origin premium for something that has been blended across four origins to hit a price point.' },
        { type: 'quote', text: 'Ask for the price per kilo of the spice, and the price per kilo of the aroma. They are rarely the same number.', cite: 'Ravi Menon' },
        { type: 'h2', text: 'The specification is the contract' },
        { type: 'p', text: 'The single most valuable thing a restaurant can do is write a specification per dish: colour value, pungency, mesh, salt load, yield and target cost per portion. Once that document exists, you are not locked into any supplier, because any competent supplier can quote against it. Most kitchens do not have that document, which is why most kitchens feel locked in.' },
        { type: 'h2', text: 'A workable first step' },
        { type: 'p', text: 'Order a trial lot from two suppliers, weigh it, taste both against the current spice blind, and cost both. Whichever wins on taste and lands within five per cent on cost, take a three-month trial. After three months, write the specification, and then you are free to stay or leave on your own terms rather than theirs.' }
      ],
      related: ['spice-granularity-guide', 'cold-stone-vs-roller-mill', 'garam-masala-masterclass']
    }
  ];
})(window);
