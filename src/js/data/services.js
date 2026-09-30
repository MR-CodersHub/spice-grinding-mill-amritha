/* ==========================================================================
   SERVICE CATALOGUE DATA
   --------------------------------------------------------------------
   Single source of truth for:
     • pages/services.html          (grid + category filter)
     • pages/service-details.html   (dynamic content via ?id=…)
     • footer service links
   Every record is complete: overview copy, highlights, feature list,
   process, technical specifications, pricing tiers and FAQs.
   ========================================================================== */
(function (window) {
  'use strict';

  var IMG = window.AMRITHA_IMG || {};

  window.AMRITHA_SERVICES = [
    /* ------------------------------------------------------------------ */
    {
      id: 'stone-chakki-milling',
      name: 'Cold Stone Chakki Milling',
      category: 'milling',
      icon: 'chakki',
      tagline: 'Slow-turning granite stones that never heat the spice',
      summary:
        'Our signature service. Whole spices are milled in 5 kg micro-batches on low-RPM granite chakkis so the aromatic volatile oils stay locked in the powder.',
      image: IMG.wholeSpices,
      imageAlt: 'Assorted whole spices arranged on a dark stone surface',
      rating: 4.9,
      reviews: 218,
      turnaround: '24–48 hours',
      minOrder: '250 g',
      tags: ['Cold milling', 'No heat', 'Volatile oils', 'Small batch'],
      overview: [
        'Commercial hammer mills run hot. Friction raises the temperature of the powder above 60 °C, and heat is exactly what volatilises the aromatic top-notes that make a freshly ground spice smell like the spice and not like a cupboard. Our chakki room runs the opposite way: heavy granite wheels turning slowly, never more than 38 °C at the contact point, monitored with a probe thermometer on every batch.',
        'Because the stones grind rather than smash, the powder keeps a natural granular body. That body matters: it suspends in a curry gravy instead of settling, clings to vegetables when you toss, and releases its aroma gradually as the oil is slowly drawn out by heat. Silk-milled powder behaves the opposite way — beautiful in a chutney, flat in a rasam.',
        'We run four granule profiles from the same set of stones by changing the feed gap and the runner clearance. A single charge of turmeric can therefore leave our mill as coarse daliya, a medium kitchen chakki, a fine silk powder, or hand-crushed sun flakes.'
      ],
      highlights: [
        { title: 'Below 38 °C', text: 'Batch temperature is logged on every run, so the top notes never get cooked out.' },
        { title: '5 kg micro-batches', text: 'Small charges keep the stone face cool and the particle size even.' },
        { title: 'Four granule profiles', text: 'Coarse, medium, fine and flakes from one set of calibrated stones.' },
        { title: 'Full traceability', text: 'Every pack carries a batch code, harvest date and origin of the raw spice.' }
      ],
      features: [
        'Single-origin raw spice, hand-sifted for stones and stalk',
        'Granule profile calibrated to your recipe, not to ours',
        'Optional 48-hour aroma rest before packing',
        'Nitrogen-flushed pouches or UV-safe glass, at your choice',
        'Batch card with grind date, mill temperature and stone ID',
        'Free reformulation if a profile is not right for your kitchen'
      ],
      process: [
        { step: '01', title: 'Weigh & inspect', text: 'Raw spice is weighed on a calibrated scale and inspected by hand. Anything that fails goes back to the grower.' },
        { step: '02', title: 'Solar temper', text: 'Moisture is drawn down slowly under warm shade — never a kiln — until the seed snaps cleanly.' },
        { step: '03', title: 'Cold stone mill', text: 'The batch runs on granite chakkis at low RPM with a probe thermometer held at the contact face.' },
        { step: '04', title: 'Rest & seal', text: 'The powder rests so the aroma re-settles, then it is sealed within four hours of milling.' }
      ],
      specs: [
        { label: 'Milling medium', value: 'Single-diamond granite, 42 cm runner stones' },
        { label: 'Batch size', value: '5 kg maximum per charge' },
        { label: 'Peak temperature', value: '≤ 38 °C at the stone face' },
        { label: 'Profiles', value: 'Coarse 1.2 mm · Medium 450 µm · Silk 120 µm · Flake 2.5 mm' },
        { label: 'Shelf life', value: '6 months sealed · 3 months once opened' },
        { label: 'Packaging', value: 'Nitrogen-flushed pouch, UV-safe glass jar, or 1 kg foil-lined jute' },
        { label: 'Certification', value: 'FSSAI licensed · ISO 22000 food-safety system' },
        { label: 'Allergens', value: 'None declared · produced in a nut-free and gluten-free mill room' }
      ],
      pricing: [
        {
          name: 'Pantry',
          price: 0,
          unit: 'free',
          note: 'Every order starts here',
          features: [
            '250 g of any single spice',
            'One grind profile of your choice',
            'Ground within 48 hours',
            'Nitrogen-flushed 250 g pouch',
            'Free shipping over ₹499'
          ],
          cta: 'Start with 250 g',
          popular: false
        },
        {
          name: 'Kitchen',
          price: 890,
          unit: 'per month',
          note: 'For serious home cooks',
          features: [
            '2 kg of freshly ground spice',
            'Choose up to 6 different spices',
            'Any grind profile per spice',
            'Bespoke blend consultation',
            'Free priority dispatch',
            'Reusable airtight storage tins'
          ],
          cta: 'Choose Kitchen',
          popular: true
        },
        {
          name: 'Trade',
          price: 2450,
          unit: 'per month',
          note: 'Restaurants & cloud kitchens',
          features: [
            '10 kg monthly volume',
            'Dedicated Master Miller',
            'Calibrated heat profiles per dish',
            '48-hour guaranteed turnaround',
            'Batch cards for food-safety files',
            'One free recalibration per quarter'
          ],
          cta: 'Apply for Trade',
          popular: false
        },
        {
          name: 'Estate',
          price: null,
          unit: 'custom quote',
          note: '25 kg and above per month',
          features: [
            'Contract volumes from 25 kg',
            'White-label and private label',
            'Dedicated mill line and storage',
            'Quarterly on-site audit access',
            'Named account manager',
            'Custom granule development'
          ],
          cta: 'Request a quote',
          popular: false
        }
      ],
      faqs: [
        { q: 'Is cold milling actually worth the extra cost?', a: 'Yes, if you cook from the spice rather than from a pre-ground jar. We measured the top-note retention of a cold-milled versus a commercially milled sample of the same Guntur Sannam: cold milling kept roughly three times the volatile oil fraction after six months in a sealed jar. For a high-heat dish such as a sambar the difference narrows; for a raw application such as a chutney or a finishing dust it is dramatic.' },
        { q: 'What is the minimum order?', a: '250 g for retail, 2 kg for a monthly kitchen plan, and 25 kg per month for an estate contract. Between those we can usually accommodate a one-off 1 kg order — just add it to the enquiry and we will confirm the mill slot.' },
        { q: 'Can you match a spice I buy elsewhere?', a: 'Send us a sealed sample of up to 100 g. Our millers will profile it and, where legally possible, reproduce the granule and colour. We cannot copy a protected blend, but we can match a single-ingredient reference very closely.' },
        { q: 'How should I store ground spice?', a: 'Airtight, opaque, and cool. A nitrogen-flushed pouch is the best option; a glass jar on a dark shelf is fine. Never refrigerate, because condensation on the lid costs you more aroma than the heat does. Buy in quantities you will use inside six months.' },
        { q: 'Do you ship outside Kerala?', a: 'We ship across India, and we export to the UAE, Singapore, the UK and the USA on palletised consignments above 50 kg. Transit is 2–4 days nationally and 7–12 days for export.' },
        { q: 'Is the mill gluten-free and allergen-safe?', a: 'The milling room handles only spices, seeds, salt and dried botanicals. There is no wheat, dairy, nuts or gluten processed on site, and the room is validated for allergen segregation twice a year.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'custom-masala-blending',
      name: 'Signature Masala Blending',
      category: 'blending',
      icon: 'blend',
      tagline: 'Heirloom ratios, roasted in-house, milled to your plate',
      summary:
        'Bring a family recipe, a restaurant menu or a product idea. Our master blender builds it from up to eighteen components, roasted and milled to a profile that suits your cooking.',
      image: IMG.masala,
      imageAlt: 'Masala powders arranged in small bowls on a brass tray',
      rating: 5.0,
      reviews: 141,
      turnaround: '3–5 working days',
      minOrder: '500 g',
      tags: ['Bespoke', 'Up to 18 spices', 'Roast profiles', 'Recipe protection'],
      overview: [
        'A masala is not a list of ingredients, it is a set of ratios and a roast level. Two kitchens can use the same eleven spices and land in completely different places depending on whether the cumin went into a dry pan before the coconut, or whether the cardamom was crushed or left whole. That is what this service is for.',
        'You sit with a master blender — in person in Mattancherry, or over a video call with samples shipped ahead. We build three versions: a confident house version, a lighter everyday version, and a sharper festival version. You taste all three side by side, tell us what is missing, and we refine.',
        'Once you approve the ratio we file it as your blend, with a version number. From then on every reorder is a one-click job and the taste does not drift, because the ratios are recorded to the gram rather than remembered by eye.'
      ],
      highlights: [
        { title: 'Three-way tasting', text: 'Every brief produces a bold, a balanced and a fine version to compare.' },
        { title: 'Versioned recipes', text: 'Your ratio is stored to the gram and reprinted on every batch card.' },
        { title: 'Roast calibration', text: 'Clay-hearth, cast-iron or low-temperature drying, matched to your burner.' },
        { title: 'Confidentiality', text: 'Signed NDA available for restaurant and product-launch recipes.' }
      ],
      features: [
        'Consultation with a master blender, in person or by video',
        'Up to eighteen components in a single blend',
        'Choice of whole, cracked or powdered botanicals',
        'Heat-profile calibration for gas, induction or charcoal',
        'Salt, sugar and ajwain adjustments on request',
        'Batch cards retained for three years for your records'
      ],
      process: [
        { step: '01', title: 'The brief', text: 'Tell us the dish, the burner, the audience and the finish you are chasing.' },
        { step: '02', title: 'Draft & roast', text: 'We build a base ratio, then roast each component to a level we can defend.' },
        { step: '03', title: 'Three tastings', text: 'Bold, balanced and fine versions are milled and sent together for a side-by-side tasting.' },
        { step: '04', title: 'File & repeat', text: 'The approved ratio is versioned and locked so every future batch is identical.' }
      ],
      specs: [
        { label: 'Components', value: 'Up to 18 per blend' },
        { label: 'Roast methods', value: 'Clay hearth · Cast-iron kadai · Low-temperature dehydrator' },
        { label: 'Profile options', value: 'Coarse 1.2 mm · Medium 450 µm · Silk 120 µm' },
        { label: 'Batch size', value: '500 g to 50 kg' },
        { label: 'Lead time', value: '3–5 working days (7–10 for a new development)' },
        { label: 'Recipe storage', value: 'Versioned, retained for 3 years' },
        { label: 'Confidentiality', value: 'NDA on request, no recipe shared outside your account' },
        { label: 'Delivery', value: 'Amber glass, foil-lined jute, or your own labelled pouches' }
      ],
      pricing: [
        {
          name: 'Single Blend',
          price: 1450,
          unit: 'per 1 kg',
          note: 'One-off development',
          features: [
            'Consultation and tasting',
            'Up to 10 components',
            'Two refinement rounds',
            '1 kg final blend',
            'Batch card per lot'
          ],
          cta: 'Develop one blend',
          popular: false
        },
        {
          name: 'House Range',
          price: 11800,
          unit: 'per month',
          note: '3–5 house blends',
          features: [
            'Up to 18 components per blend',
            'Three blends developed + two kept live',
            'Unlimited refinement rounds',
            '12 kg monthly output',
            'Menu cost-per-portion sheet',
            'Priority mill slots'
          ],
          cta: 'Build a house range',
          popular: true
        },
        {
          name: 'Product Line',
          price: 24500,
          unit: 'per month',
          note: 'For retail products',
          features: [
            'Retail-ready granule profiles',
            'Shelf-life validation testing',
            'Nutrition & label drafting',
            '40 kg monthly output',
            'White-label packaging',
            'Batch traceability reports'
          ],
          cta: 'Launch a product line',
          popular: false
        },
        {
          name: 'White Label',
          price: null,
          unit: 'custom quote',
          note: 'Manufacturing partnership',
          features: [
            'Your brand on every artefact',
            'Contract volume from 100 kg',
            'Dedicated production line',
            'Annual third-party lab audit',
            'Export documentation handled',
            'On-site technical training'
          ],
          cta: 'Discuss partnership',
          popular: false
        }
      ],
      faqs: [
        { q: 'Can you keep my recipe confidential?', a: 'Yes. We sign an NDA before the first sample and recipes are stored under your account only. We have never published a client blend, and we do not use client formulas in any marketing material without written permission.' },
        { q: 'How many revisions are included?', a: 'Two full revision rounds on a single-blend development, and unlimited rounds inside a monthly House Range or Product Line plan. In practice most clients settle within two tastings, because we start the brief with a written brief rather than an open conversation.' },
        { q: 'Do you handle salt and ajwain in the blend?', a: 'Yes, and we recommend it. A masala that carries its own salt behaves very differently in a curry and in a dry rub, so knowing which one you are making lets us set the ratio properly. We can also leave the salt out and give you a separate finishing salt with a measured scoop.' },
        { q: 'Will my blend work on an induction hob?', a: 'Induction runs hotter and drier at the surface than a gas flame, which scorches whole spices faster. We will profile for that: usually a lower roast on the botanicals and a slightly coarser grind so the spice survives the tempering step instead of turning bitter.' },
        { q: 'Can you help with the nutrition panel and FSSAI label?', a: 'For Product Line and White Label clients we draft the nutrition panel, allergen statement, batch coding scheme and FSSAI label layout, and we send the finished product to an NABL-accredited lab for verification. Lab fees are passed through at cost.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'whole-spice-grading',
      name: 'Whole Spice Cleaning & Grading',
      category: 'milling',
      icon: 'sieve',
      tagline: 'Sorted by hand, sifted by mesh, traced back to the field',
      summary:
        'Raw lots of up to 500 kg are cleaned, graded by size and density, moisture-tested and packed — the unglamorous work that decides how a kitchen will actually experience the spice.',
      image: IMG.marketPalayam,
      imageAlt: 'Piles of whole spices at a Kerala spice market',
      rating: 4.8,
      reviews: 96,
      turnaround: '5–7 working days',
      minOrder: '25 kg',
      tags: ['Bulk lots', 'Moisture tested', 'Hand sorted', 'Density graded'],
      overview: [
        'The flavour of a spice is decided long before anyone grinds it. A lot can look magnificent and still disappoint, because it was picked early, dried too hard, or stored in a bag that let humidity back in. Grading is the unglamorous discipline that catches those problems before they reach your pan.',
        'We take raw lots from growers and aggregators, run them through a nine-mesh sieve series, remove stones, stalk and husk by hand and by air separation, then measure moisture, volatile oil and oleoresin content on a bench scale. What comes back is a lot with a number attached — not a promise attached.',
        'Lots that fail our bench standard are not rejected outright; they are graded down into a different grade, priced accordingly, and offered to buyers whose application suits them. Nothing leaves the building without a grade stamp.'
      ],
      highlights: [
        { title: 'Nine-mesh sieve series', text: 'Consistent particle size matters more than most people expect in a whole spice.' },
        { title: 'Moisture & oil assay', text: 'Every lot is bench-tested for moisture and volatile oil before grading.' },
        { title: 'Hand + air separation', text: 'Stones, stalk and husk removed by hand and by air, not by chemical float.' },
        { title: 'Grade stamped, lot tracked', text: 'A grade and a lot code travel with the consignment all the way to your store.' }
      ],
      features: [
        'Lot intake up to 500 kg with sampling at three points',
        'Nine-mesh grading plus manual stone and stalk removal',
        'Moisture, volatile oil and oleoresin bench assay',
        'Infestation and foreign-matter screening',
        'Recleaned, de-stemmed and re-graded on request',
        'Jute or food-grade foil-lined poly packing at 5 / 10 / 25 kg'
      ],
      process: [
        { step: '01', title: 'Intake & sampling', text: 'The lot is sampled at three depths and weighed in. A composite sample is sealed and filed.' },
        { step: '02', title: 'Pre-clean', text: 'Air separation and sieving remove husk, stalk, stones and light foreign matter.' },
        { step: '03', title: 'Hand sort', text: 'Every kilogram passes a sorter table, catching exactly what machines miss.' },
        { step: '04', title: 'Assay & grade', text: 'Moisture and volatile oil are measured, a grade is assigned, and the lot is packed and stamped.' }
      ],
      specs: [
        { label: 'Lot size', value: '25 kg – 500 kg' },
        { label: 'Mesh range', value: '9 grades from 1.2 mm down to 250 µm' },
        { label: 'Moisture target', value: '≤ 9% for most spices · ≤ 7% for cardamom' },
        { label: 'Volatile oil floor', value: 'Set per species, benchmarked against ISO 6576' },
        { label: 'Foreign matter', value: '≤ 0.5% by weight' },
        { label: 'Packing', value: '5 kg jute · 10 kg / 25 kg food-grade foil-lined poly' },
        { label: 'Documents', value: 'Grade certificate, lot code, moisture reading, harvest month' },
        { label: 'Shelf life', value: '18–24 months in intact seed form, airtight and cool' }
      ],
      pricing: [
        {
          name: 'Sort & Grade',
          price: 22,
          unit: 'per kg',
          note: 'Basic 9-mesh grading',
          features: [
            'Pre-clean and sieve',
            'Hand sort at one table',
            'Moisture reading',
            'Grade certificate',
            '10 kg minimum packing',
            '7-day turnaround'
          ],
          cta: 'Send a lot',
          popular: false
        },
        {
          name: 'Deep Clean',
          price: 38,
          unit: 'per kg',
          note: 'Full assay & de-stemming',
          features: [
            'Everything in Sort & Grade',
            'Volatile oil and oleoresin assay',
            'Full de-stem and de-husk',
            'Triple hand sort',
            'Photographic before/after record',
            '5-day turnaround'
          ],
          cta: 'Book a deep clean',
          popular: true
        },
        {
          name: 'Contract Supply',
          price: null,
          unit: 'per season',
          note: 'From 5 tonnes per season',
          features: [
            'Season-long supply agreement',
            'Reserved mill capacity',
            'Fixed grade specification',
            'Monthly shipment schedule',
            'Pre-shipment sample approval',
            'Dedicated trade manager'
          ],
          cta: 'Talk contracts',
          popular: false
        },
        {
          name: 'Export Packing',
          price: 46,
          unit: 'per kg',
          note: 'Palletised & certified',
          features: [
            'Everything in Deep Clean',
            'Export-grade packing',
            'Phytosanitary documentation',
            'Pallet build and shrink wrap',
            'Third-party lab certificate',
            'Container loading supervised'
          ],
          cta: 'Request export specs',
          popular: false
        }
      ],
      faqs: [
        { q: 'What if my lot fails your grading?', a: 'It gets a lower grade, not a rejection. For example a cumin lot that is clean and aromatic but slightly under-dried will come back as Grade B at a lower price, and we will tell you exactly which application it suits. Roughly one lot in six is graded down.' },
        { q: 'Do you buy the raw lot from me as well?', a: 'We can. We work with about forty grower families across Kerala, Tamil Nadu, Karnataka and Rajasthan, and we buy on grade rather than on romance. If you would rather we only grade your lot, that is completely normal and we do not push to buy.' },
        { q: 'How do you test volatile oil without destroying the lot?', a: 'We take a small composite sample, distil the oil in a glass Clevenger at bench scale, and measure the recovered volume. The sample is a few grams and comes out of the assay, not out of your shipment.' },
        { q: 'What is the difference between Grade A and Grade B?', a: 'Grade A means the lot meets the moisture, volatile oil, mesh and foreign-matter thresholds for its species with a margin. Grade B meets the minimum legal and trade standard but sits closer to one or more limits, which usually reflects a shorter sun-dry or a warmer growing season. Both are honest; the price and the application differ.' },
        { q: 'Can you grade to my specification rather than yours?', a: 'Yes. Send us a written specification and we will grade against it, reporting pass/fail per parameter. We will also tell you honestly if your spec is unreachable from the available lots, which happens more often than people expect with cardamom.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'commercial-bulk-supply',
      name: 'Commercial & Bulk Supply',
      category: 'trade',
      icon: 'truck',
      tagline: 'Consistent heat, consistent colour, week after week',
      summary:
        'Scheduled monthly despatches for restaurants, caterers, hotels, food manufacturers and retailers — with calibrated profiles so your menu tastes the same in March and in September.',
      image: IMG.marketStreet,
      imageAlt: 'Buckets of ground spices in a busy Indian spice market',
      rating: 4.9,
      reviews: 174,
      turnaround: '24-hour dispatch',
      minOrder: '10 kg / month',
      tags: ['Scheduled dispatch', 'Calibrated heat', 'Batch cards', 'Cold chain aware'],
      overview: [
        'The problem with commercial spice is drift. A dish tastes right in the month you built the menu and slightly off three months later, because the lot changed and nobody noticed. We fix that by specifying finished behaviour rather than a botanical name: colour value, pungency in Scoville units, and a defined mesh.',
        'Every account gets a scheduled despatch calendar. You tell us the volume, we hold the slot. If you need a mid-month top-up it goes out the same day, and if a shipment is going to be late you hear from us before you notice the empty shelf.',
        'Batch cards are the boring part that saves you during a food-safety audit: who milled it, on what date, at what temperature, from which lot, and when it should be used by.'
      ],
      highlights: [
        { title: 'Specification locked', text: 'Colour, pungency and mesh are specified in writing and re-verified every lot.' },
        { title: 'Scheduled despatch', text: 'A standing calendar, so stock arrives the day before service, not the day of.' },
        { title: 'Audit-ready batch cards', text: 'Every consignment ships with documentation your inspector will accept.' },
        { title: '24-hour top-ups', text: 'Emergency volumes go out the same working day within Kochi.' }
      ],
      features: [
        'Standing monthly despatch calendar',
        'Specified colour, pungency and mesh per dish',
        'Same-day emergency top-ups in Kochi',
        'Batch cards with mill, lot and date traceability',
        'Food-grade foil, jute or your own drums',
        'Credit terms available on three months of history'
      ],
      process: [
        { step: '01', title: 'Menu audit', text: 'We visit or video-call the kitchen and taste the current spice against the menu intent.' },
        { step: '02', title: 'Specification', text: 'Each dish gets a written spec: colour, heat, mesh, salt load and cost per portion.' },
        { step: '03', title: 'Standing order', text: 'You set the volume and rhythm; we reserve mill capacity and hold the slot.' },
        { step: '04', title: 'Despatch & log', text: 'Shipment goes out with batch cards, and the log lands in your inbox the same day.' }
      ],
      specs: [
        { label: 'Minimum', value: '10 kg per month per account' },
        { label: 'Dispatch', value: 'Next working day · same day inside Kochi' },
        { label: 'Granule range', value: 'Coarse 1.2 mm · Medium 450 µm · Silk 120 µm' },
        { label: 'Packaging', value: '1 kg / 5 kg / 25 kg foil or jute · 50 kg food-grade drums' },
        { label: 'Documentation', value: 'Batch card, grade certificate, lot traceability' },
        { label: 'Payment terms', value: 'Advance, or 30-day credit after three months' },
        { label: 'Coverage', value: 'All India · export to UAE, SG, UK, USA' },
        { label: 'Account review', value: 'Quarterly recalibration, included' }
      ],
      pricing: [
        {
          name: 'Trial Lot',
          price: 0,
          unit: 'free',
          note: 'Taste before you commit',
          features: [
            '3 kg across 4 spices',
            'Specification sample',
            'Cost-per-portion sheet',
            'No obligation',
            'Delivered in Kochi'
          ],
          cta: 'Book a trial lot',
          popular: false
        },
        {
          name: 'Monthly Supply',
          price: 690,
          unit: 'per kg',
          note: '10 – 49 kg per month',
          features: [
            '10–49 kg monthly volume',
            'Standing despatch calendar',
            'Batch cards included',
            'Free delivery above 15 kg',
            'Email support, 24-hour response',
            'Monthly price lock for 6 months'
          ],
          cta: 'Start monthly supply',
          popular: true
        },
        {
          name: 'Quarterly Contract',
          price: 585,
          unit: 'per kg',
          note: '50 – 249 kg per month',
          features: [
            '50–249 kg monthly volume',
            'Quarterly recalibration visit',
            'Reserved mill capacity',
            '30-day payment terms',
            'Named account manager',
            'Free delivery nationwide'
          ],
          cta: 'Request a contract',
          popular: false
        },
        {
          name: 'Enterprise',
          price: null,
          unit: 'custom quote',
          note: '250 kg and above',
          features: [
            '250 kg+ monthly volume',
            'Dedicated production line',
            'On-site QA presence',
            'Export documentation',
            'Custom annual pricing',
            'Quarterly business review'
          ],
          cta: 'Speak to trade',
          popular: false
        }
      ],
      faqs: [
        { q: 'How is bulk spice priced?', a: 'Per kilogram, on a volume band, and adjusted for granule profile, roast level and packaging. Slower profiles and foil packaging add a little; volume removes more. The bands are printed on the pricing page so there are no surprises at invoicing.' },
        { q: 'What happens if a shipment arrives late?', a: 'You are told before you notice, and the freight is on us. In three years of operation we have missed a standing-despatch slot four times, and each one was credited. We do not quietly ship late and hope the kitchen has stock.' },
        { q: 'Can we mix spices in a single consignment?', a: 'Yes, and most accounts do. A single monthly consignment typically holds eight to fifteen separate spice lines, each packed and labelled separately with its own batch card, so nothing is mixed in the box.' },
        { q: 'Do you supply outside India?', a: 'We export to the UAE, Singapore, the UK and the USA. Export consignments ship palletised with phytosanitary documentation and, above 500 kg, we supervise container loading. Lead time is 7–12 days after dispatch.' },
        { q: 'Is there a minimum contract term?', a: 'Monthly supply can be cancelled with 30 days notice. Quarterly and Enterprise contracts run three or six months because we reserve mill capacity against them, and we will not take that reservation lightly.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'private-label-packaging',
      name: 'Private Label & White Label',
      category: 'packaging',
      icon: 'label',
      tagline: 'Your name on the jar, our name nowhere on it',
      summary:
        'Full white-label programmes — jar, pouch, label, batch coding, nutrition panel and filled product — produced in our licensed mill room and shipped in your branded cartons.',
      image: IMG.shelfPouches,
      imageAlt: 'Branded craft pouches of spice standing on a shelf',
      rating: 4.9,
      reviews: 73,
      turnaround: '3–4 weeks',
      minOrder: '100 kg',
      tags: ['White label', 'Batch coding', 'Label design', 'Export ready'],
      overview: [
        'Private label is the least glamorous service we run and the one with the most moving parts. A label has to survive a wet kitchen, a fridge, a forklift and a customs inspection, and it has to carry a legally correct ingredient declaration, a nutrition panel, a batch code and a best-before date in the right format for the destination market.',
        'We start with your formulation — either one you already buy from us, or a blend we develop together — and then work backwards from the container to the shelf life. Jar size drives oxygen exposure, oxygen exposure drives aroma loss, and aroma loss is what your customer will blame on the product.',
        'Production runs in the same licensed mill room as everything else, so your private-label pack carries the same batch cards and the same audit trail. Nothing is white-labelled from a third party and shipped in with a sticker.'
      ],
      highlights: [
        { title: 'Fulfilled in-house', text: 'Filled and sealed in our licensed mill room, not drop-shipped from a broker.' },
        { title: 'Label compliance', text: 'FSSAI, EU and US panel formats drafted and checked by a food technologist.' },
        { title: 'Shelf-life validated', text: 'Tested on your actual fill, in your actual container, not assumed.' },
        { title: 'Batch coding', text: 'Inkjet or laser coding with a lot code your QA team can trace.' }
      ],
      features: [
        'Glass, PET, kraft pouch or foil-lined jute',
        'Label design and print management',
        'FSSAI / EU / US nutrition panel drafting',
        'Inkjet or laser batch coding',
        'Shelf-life and packaging compatibility testing',
        'Retail-ready cartons, shrink wrap and palletising'
      ],
      process: [
        { step: '01', title: 'Container choice', text: 'We pick the jar or pouch that will hold aroma longest for your price point.' },
        { step: '02', title: 'Label & panel', text: 'Artwork drafted, ingredient declaration written, regulatory format checked.' },
        { step: '03', title: 'Fill & code', text: 'Filled in the licensed mill room, coded, sealed and inspected at line speed.' },
        { step: '04', title: 'Ship & support', text: 'Palletised, shrink-wrapped and despatched with the full documentation pack.' }
      ],
      specs: [
        { label: 'Minimum', value: '100 kg per SKU, 3 SKUs minimum' },
        { label: 'Containers', value: '180 ml / 250 ml glass · 100 g / 200 g kraft pouch · 500 ml PET' },
        { label: 'Fill options', value: 'Nitrogen flush · oxygen absorber · desiccant' },
        { label: 'Coding', value: 'Inkjet or laser — lot, date, best-before' },
        { label: 'Regulatory', value: 'FSSAI, EU 1169/2011, US 21 CFR 101' },
        { label: 'Lead time', value: '3–4 weeks from approved artwork' },
        { label: 'Shelf life', value: 'Validated 9–18 months depending on fill' },
        { label: 'Shipping', value: 'Retail-ready cartons, palletised' }
      ],
      pricing: [
        {
          name: 'Label Only',
          price: 68,
          unit: 'per unit',
          note: 'Our spice, your brand',
          features: [
            '100 units minimum per SKU',
            'Your label on our glass jar',
            'Batch coding included',
            'Standard panel format',
            '2-week lead time',
            'Carton packing'
          ],
          cta: 'Start label-only',
          popular: false
        },
        {
          name: 'Full Private Label',
          price: 92,
          unit: 'per unit',
          note: 'Developed to your brief',
          features: [
            '250 units minimum per SKU',
            'Custom blend development',
            'Custom pouch or jar',
            'Full panel drafting',
            'Shelf-life testing',
            '3-week lead time'
          ],
          cta: 'Build a range',
          popular: true
        },
        {
          name: 'Retail Program',
          price: 74,
          unit: 'per unit',
          note: 'Full store rollout',
          features: [
            '1000 units minimum per SKU',
            'Up to 12 SKUs',
            'Barcode & GS1 handling',
            'Retail carton design',
            'Launch stock held locally',
            'Reorder SLA of 10 days'
          ],
          cta: 'Plan a rollout',
          popular: false
        },
        {
          name: 'Export Line',
          price: null,
          unit: 'custom quote',
          note: 'Multi-market production',
          features: [
            'Multi-market labelling',
            'Halal / kosher certification support',
            'Phytosanitary documentation',
            'Container loading supervised',
            'Multi-currency invoicing',
            'Dedicated production slot'
          ],
          cta: 'Discuss export',
          popular: false
        }
      ],
      faqs: [
        { q: 'Who owns the blend formula?', a: 'You do, outright, from the day it is approved. The formula is stored under your account and is not used for anyone else. If you leave the programme we will delete it on request, in writing.' },
        { q: 'Who designs the label?', a: 'We draft it. Our food technologist writes the ingredient declaration, the nutrition panel and the allergen statement in the correct regulatory format, and our designer lays it out. You own the artwork once approved, and we will supply print-ready files in whatever format your printer needs.' },
        { q: 'Can you do a very small first run?', a: 'Label-only starts at 100 units per SKU, which is a genuine small run. Below that the setup cost per unit becomes unreasonable. If you are validating a market, 100 units across three SKUs is the most honest way to test whether the shelf works.' },
        { q: 'How is the best-before date calculated?', a: 'From the date of fill, using a validated shelf life for that spice in that container under nitrogen or with an absorber. We will not print a date we have not tested. If you need a shorter date than the test supports, we will shorten it — but we will not lengthen it.' },
        { q: 'Do you handle the import paperwork for export?', a: 'We prepare the phytosanitary certificate, commercial invoice, packing list and certificate of origin. Import duty and customs clearance in your country remain your responsibility, though we will work closely with your broker to make it painless.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'spice-consultancy',
      name: 'Spice Sourcing & Flavour Consultancy',
      category: 'advisory',
      icon: 'consult',
      tagline: 'Recipe development, cost-per-portion and menu engineering',
      summary:
        'A flavour consultant sits with your team to build menus that taste consistent, cost what you planned, and survive a change of supplier or a change of season.',
      image: IMG.thaliNorth,
      imageAlt: 'A traditional North Indian thali laid out with many small dishes',
      rating: 5.0,
      reviews: 58,
      turnaround: '2–6 weeks',
      minOrder: 'Consulting day',
      tags: ['Menu development', 'Cost per portion', 'Supplier independent', 'On site'],
      overview: [
        'Most kitchen problems are not cooking problems. A dish drifts because the spice spec was never written down. It gets expensive because nobody calculated the cost per portion once the free refills were counted. It fails in a new city because the recipe assumed a local ingredient that does not exist there.',
        'A consultancy engagement starts in your kitchen. We taste the current food, read the menu, and interview whoever actually cooks it. From that we produce a written specification per dish — colour, heat, mesh, salt load, yield and cost per portion — that any competent kitchen can execute and any supplier can quote against.',
        'The important word in that last sentence is any. We are deliberately supplier-agnostic in the specification itself, so if you move to another mill tomorrow the spec still works. We will happily tell you where the gaps in the market are, but the spec is yours.'
      ],
      highlights: [
        { title: 'Supplier-agnostic specs', text: 'The output is a standard, not a lock-in contract with us.' },
        { title: 'Cost per portion', text: 'Every dish priced honestly, including free refills and garnish waste.' },
        { title: 'Kitchen training', text: 'Hands-on sessions so the team, not the consultant, holds the knowledge.' },
        { title: 'Menu portability', text: 'Tested for the branch, the country and the season you actually operate in.' }
      ],
      features: [
        'On-site or remote kitchen audit',
        'Written dish specification sheet per dish',
        'Cost-per-portion and yield modelling',
        'Menu engineering and pricing advice',
        'Team training for 4 to 30 cooks',
        'Supplier comparison framework'
      ],
      process: [
        { step: '01', title: 'Audit', text: 'We taste, measure and interview. Two days on site for a single-site kitchen.' },
        { step: '02', title: 'Specification', text: 'A written spec per dish: colour, heat, mesh, salt, yield and target cost.' },
        { step: '03', title: 'Cost model', text: 'We model the menu at current volumes and at your target volume.' },
        { step: '04', title: 'Train & hand over', text: 'Hands-on sessions, then a written playbook you own outright.' }
      ],
      specs: [
        { label: 'Engagement', value: 'Single consulting day to 6-week programme' },
        { label: 'Format', value: 'On site, remote, or hybrid' },
        { label: 'Deliverable', value: 'Dish specification book + cost model + playbook' },
        { label: 'Team size', value: '4 to 30 cooks trained' },
        { label: 'Ownership', value: 'All documentation belongs to the client' },
        { label: 'Independence', value: 'Supplier-agnostic specification' },
        { label: 'Follow-up', value: 'One review visit at 90 days, included' },
        { label: 'Languages', value: 'English, Malayalam, Hindi, Tamil' }
      ],
      pricing: [
        {
          name: 'Consulting Day',
          price: 18000,
          unit: 'per day',
          note: 'Single visit, written output',
          features: [
            'Full-day on-site audit',
            'Tasting of 12 dishes',
            'Written findings summary',
            'Quick supplier shortlist',
            'No travel within Kerala'
          ],
          cta: 'Book a day',
          popular: false
        },
        {
          name: 'Menu Programme',
          price: 95000,
          unit: 'per 6 weeks',
          note: 'Full specification build',
          features: [
            'Everything in Consulting Day',
            'Specification book for 40 dishes',
            'Cost-per-portion model',
            'Two tasting revisions',
            'Supplier comparison framework',
            '90-day review visit'
          ],
          cta: 'Scope a programme',
          popular: true
        },
        {
          name: 'Multi-Site',
          price: null,
          unit: 'custom quote',
          note: '3+ locations',
          features: [
            'Multi-branch consistency audit',
            'Master recipe architecture',
            'Central procurement playbook',
            'Train-the-trainer programme',
            'Quarterly consistency review',
            'Group-level costing'
          ],
          cta: 'Talk multi-site',
          popular: false
        },
        {
          name: 'Product Development',
          price: 165000,
          unit: 'per 8 weeks',
          note: 'Retail or packaged goods',
          features: [
            'Concept to shelf-ready SKU',
            'Consumer tasting panels',
            'Costed bill of materials',
            'Regulatory panel drafting',
            'Pilot batch production',
            'Launch handover pack'
          ],
          cta: 'Develop a product',
          popular: false
        }
      ],
      faqs: [
        { q: 'Will you recommend competitors over yourselves?', a: 'Genuinely, when that is the right answer. The written specification is deliberately supplier-agnostic so it keeps working if you change mill. Several of our clients have moved parts of their range elsewhere and kept the specification — that is a good outcome, and we would rather have the rest of the business than fight for one spice.' },
        { q: 'How long does a menu programme take?', a: 'Six weeks is typical: two on site, two writing and costing, one for tasting revisions, one for handover. If you need a specification for a launch in three weeks, we can compress it, but the tasting revisions are what make the document worth having, so we will tell you honestly what that costs you.' },
        { q: 'Do you work with small kitchens with no budget for this?', a: 'Yes. A single consulting day is priced to be accessible to a small restaurant or a home-scale production kitchen, and we regularly do pro bono slots for culinary students through our training partner. The work is the same; the day rate is simply smaller.' },
        { q: 'Can the training be recorded for the team?', a: 'Yes. Sessions are recorded with consent, edited, and delivered to you as files you own. We find that recorded sessions outperform live ones for onboarding, because new cooks can rewind the tempering demonstration as many times as they need.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'spice-kits-gifting',
      name: 'Discovery Kits & Festive Gifting',
      category: 'gifting',
      icon: 'gift',
      tagline: 'Six, twelve or twenty-four jars in a box worth keeping',
      summary:
        'Curated tasting journeys and festive hampers, assembled in the mill room and wrapped in craft paper — the easiest way to introduce someone to what freshly ground actually tastes like.',
      image: IMG.marketGoa,
      imageAlt: 'Spice packets displayed for sale at a market stall',
      rating: 4.9,
      reviews: 246,
      turnaround: '2–4 days',
      minOrder: '1 kit',
      tags: ['Gift ready', 'Curated', 'Tasting notes', 'Corporate orders'],
      overview: [
        'A discovery kit exists to answer one question: what is the difference between a spice that was ground last week and one that was ground last year? Once someone smells turmeric milled this morning, they cannot un-notice it, and that is worth more to us than any single sale.',
        'We build the journey deliberately. Each kit moves from a single bright note to a deep roasted note, with a short tasting card in plain language. There is no filler sachet and no sachet of something nobody uses. Six jars in the starter journey, twelve in the regional tour, twenty-four in the collector set.',
        'Festive hampers follow the same discipline with a different wrapper: Onam and Vishu arrangements, Diwali gift boxes with corporate personalisation, and wedding return favours milled in a five-kilogram micro-batch so they can be sealed hot.'
      ],
      highlights: [
        { title: 'Tasting card in plain language', text: 'No jargon, no Scoville numbers, just what to smell and how to use it.' },
        { title: 'No filler sachets', text: 'Every jar in the kit is a spice you will actually cook with.' },
        { title: 'Corporate personalisation', text: 'Your brand, your message, printed and sealed in our room.' },
        { title: 'Wedding micro-batches', text: 'Sealed hot for favours while the guests are still there.' }
      ],
      features: [
        'Starter, Regional and Collector kits',
        'Onam, Vishu and Diwali hamper formats',
        'Hand-written tasting cards',
        'Corporate personalisation and gift notes',
        'Wedding return favours sealed on site',
        'Recycled craft box, jute wrap, no plastic'
      ],
      process: [
        { step: '01', title: 'Choose the journey', text: 'Pick a kit or ask us to build one for a person, a family or a client.' },
        { step: '02', title: 'Mill to fill', text: 'Each spice is milled the day the kit is assembled, not weeks in advance.' },
        { step: '03', title: 'Write the cards', text: 'A short tasting note is written and tucked beside each jar.' },
        { step: '04', title: 'Wrap & send', text: 'Packed in recycled craft board, jute-wrapped, with a hand-stamped seal.' }
      ],
      specs: [
        { label: 'Kits', value: '6 jars · 12 jars · 24 jars' },
        { label: 'Jar size', value: '45 g · 90 g' },
        { label: 'Occasions', value: 'Onam · Vishu · Diwali · Wedding · Corporate' },
        { label: 'Personalisation', value: 'Brand, message card, bulk MOQ 25 units' },
        { label: 'Packing', value: 'Recycled craft board, jute wrap, soy-ink stamp' },
        { label: 'Lead time', value: '2–4 days · 7 days for bulk corporate' },
        { label: 'Shipping', value: 'India nationwide · export on request' },
        { label: 'Custom builds', value: 'From 12 units, 14 days' }
      ],
      pricing: [
        {
          name: 'Starter Kit',
          price: 1290,
          unit: 'per kit',
          note: '6 × 45 g jars',
          features: [
            '6 bright, everyday spices',
            'Tasting card in plain language',
            'Craft board and jute wrap',
            'Ready to gift, no wrapping needed',
            'Ships in 2–4 days'
          ],
          cta: 'Gift a starter kit',
          popular: false
        },
        {
          name: 'Regional Tour',
          price: 2290,
          unit: 'per kit',
          note: '12 × 45 g jars',
          features: [
            '12 spices, one region each',
            'Regional recipe cards',
            'Hand-stamped kraft box',
            'Milled the day it ships',
            'Gift note included',
            'Ships in 2–4 days'
          ],
          cta: 'Send the tour',
          popular: true
        },
        {
          name: 'Collector Set',
          price: 3990,
          unit: 'per kit',
          note: '24 × 90 g jars',
          features: [
            '24 spices and blends',
            'Full usage booklet',
            'Two-tone presentation case',
            'One year of the harvest letter',
            'Free reship if a jar arrives damaged',
            'Ships in 3–5 days'
          ],
          cta: 'Build the collection',
          popular: false
        },
        {
          name: 'Corporate',
          price: null,
          unit: 'per unit',
          note: '25 units and above',
          features: [
            'Your brand on the box and card',
            'Bulk pricing from 25 units',
            'Scheduled delivery in one drop',
            'Invoice-ready documentation',
            'Returnable display trays',
            'Dedicated account contact'
          ],
          cta: 'Request a quote',
          popular: false
        }
      ],
      faqs: [
        { q: 'Can I choose the spices in a kit?', a: 'Yes. Pick from the full catalogue or tell us about the cook you are buying for and we will build it. Bespoke builds start at 12 units with two weeks notice, which is realistic for a wedding but not for a birthday on Friday — in that case tell us and we will ship something that exists today.' },
        { q: 'How fresh is a kit when it arrives?', a: 'Each spice is milled within 48 hours of dispatch, so a kit is typically 4–5 days old on arrival. The tasting card tells the recipient to open the jars in order, because the aroma difference between jar one and jar five is the point of the gift.' },
        { q: 'Do you do corporate gifting at scale?', a: 'From 25 units upward, with your brand on the box, a printed message card, and a single scheduled delivery in one drop. We have delivered 3,000 units for a Diwali campaign and 900 for an Onam week without a missed date, but the earlier you tell us about it, the calmer it is.' },
        { q: 'Is the packaging plastic-free?', a: 'The box is recycled craft board, the wrap is jute, the tape is paper and the stamp is soy-based ink. The jars are glass. There is no plastic film anywhere in the kit, which cost us a little more and is worth it.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'amcham-kitchen-training',
      name: 'Amcham & Traditional Kitchen Training',
      category: 'training',
      icon: 'training',
      tagline: 'Two days at the stone, learning by your hands',
      summary:
        'Small-group masterclasses held in the Mattancherry mill room — tempering, blending, masala ratios and quality control — capped at eight people so everyone actually mills something.',
      image: IMG.mortarKundi,
      imageAlt: 'A kundi-danda stone mortar and pestle used for pounding spices',
      rating: 5.0,
      reviews: 187,
      turnaround: 'Monthly cohorts',
      minOrder: 'One seat',
      tags: ['Max 8 per batch', 'Hands-on', 'Certificate', 'Monthly'],
      overview: [
        'You cannot learn to read a spice from a slide. The only way to know that a cumin is ready for the pan is to smell the moment the smoke turns from acrid to sweet, and the only way to learn that moment is to have been standing at the stove when it happened.',
        'Our masterclasses are capped at eight people for exactly that reason. Two days in the mill room, one group at a time, with every participant grinding their own batch on the stones and pounding their own masala in the kundi.',
        'We run them for culinary students, working cooks, restaurant owners and — more often than people expect — home cooks who are very serious about cooking. The certificate is issued by the mill, not by a training body, and it says exactly what you did.'
      ],
      highlights: [
        { title: 'Eight seats, one group', text: 'Everyone grinds their own batch on the real stones.' },
        { title: 'Two full days', text: 'Theory in the morning, hands at the stone all afternoon.' },
        { title: 'Take your own work home', text: 'You mill it, you label it, you keep it.' },
        { title: 'Monthly cohorts', text: 'First Saturday and Sunday, or on request for a private group.' }
      ],
      features: [
        'Two-day intensive in the mill room',
        'Maximum eight participants',
        'Traditional kundi pounding and stone chakki milling',
        'Masala ratio theory with tasting',
        'Take-home 1 kg of your own milling',
        'Mill certificate on completion'
      ],
      process: [
        { step: '01', title: 'Book a seat', text: 'Choose a monthly cohort or ask for a private group of four to eight.' },
        { step: '02', title: 'Day one — theory', text: 'Spice botany, volatile oils, roast profiles, and how to taste for defects.' },
        { step: '03', title: 'Day two — hands', text: 'Grind on the stones, pound in the kundi, blend to a brief, and taste blind.' },
        { step: '04', title: 'Take it home', text: 'Label, pack and take away 1 kg milled and blended by you.' }
      ],
      specs: [
        { label: 'Duration', value: 'Two days, 9:30 AM – 5:00 PM' },
        { label: 'Group size', value: 'Maximum 8 participants' },
        { label: 'Language', value: 'English, Malayalam, Hindi' },
        { label: 'Location', value: 'Heritage Spice Quarter, Mattancherry, Kochi' },
        { label: 'Includes', value: 'Materials, lunch on both days, take-home 1 kg' },
        { label: 'Certificate', value: 'Issued by the mill on completion' },
        { label: 'Cohorts', value: 'First Saturday and Sunday of each month' },
        { label: 'Private groups', value: '4 to 8 people, any weekday' }
      ],
      pricing: [
        {
          name: 'Single Seat',
          price: 4800,
          unit: 'per person',
          note: 'Two-day masterclass',
          features: [
            'Two full days in the mill room',
            'All materials provided',
            'Lunch both days',
            '1 kg take-home milling',
            'Mill certificate',
            'Monthly cohort dates'
          ],
          cta: 'Book a seat',
          popular: false
        },
        {
          name: 'Seat + Apprenticeship',
          price: 12500,
          unit: 'per person',
          note: 'Masterclass plus 2 days',
          features: [
            'Everything in Single Seat',
            'Two days on the mill floor',
            'Blend development session',
            'Costing & supplier briefing',
            'Priority blend consultation',
            'Certificate + portfolio piece'
          ],
          cta: 'Apply for apprenticeship',
          popular: true
        },
        {
          name: 'Private Group',
          price: 28000,
          unit: 'per group',
          note: '4 to 8 people',
          features: [
            'Any weekday, your choice',
            'Curriculum tailored to your kitchen',
            'Two days, mill room',
            'Group tasting session',
            'Take-home for every attendee',
            'Certificates for all'
          ],
          cta: 'Book a private group',
          popular: false
        },
        {
          name: 'Student Rate',
          price: 1900,
          unit: 'per person',
          note: 'With a valid college ID',
          features: [
            'Everything in Single Seat',
            '45% student rate',
            'Culinary school ID required',
            'Limited seats per cohort',
            'Portfolio-grade take-home',
            'Mentorship referral'
          ],
          cta: 'Apply as a student',
          popular: false
        }
      ],
      faqs: [
        { q: 'I have never cooked. Will I be out of place?', a: 'Not at all. Roughly a third of every cohort is home cooks with no professional kitchen experience. The teaching is deliberately practical, and the only thing we ask is that you are willing to stand at a hot pan for two days.' },
        { q: 'What should I wear and bring?', a: 'Closed-toe shoes you do not mind getting dusty, clothes that can take a splash of spice, and hair tied back. We provide aprons, all tools, all ingredients and a notebook. Bring water and a hat if you are sensitive to strong aroma.' },
        { q: 'Is there a certificate?', a: 'Yes, issued by the mill on completion of both days, naming what you actually did. It is not an accredited qualification, and we will not pretend otherwise — it is a record that you spent two days in our room and milled your own product.' },
        { q: 'Can my whole kitchen team attend?', a: 'Private groups of four to eight are the usual route for a team, and we can run several back to back for a larger brigade. Send us the team size and the dishes you cook, and we will shape the two days around them.' },
        { q: 'Do you offer a student rate?', a: 'Yes, 45% off with a valid culinary school or college ID, subject to seats being available in the cohort. Write to us with your institution name and we will hold a place.' }
      ]
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'herb-infusion-oils',
      name: 'Infused Oils & Liquid Extracts',
      category: 'milling',
      icon: 'flask',
      tagline: 'Cold-infused, never heat-extracted',
      summary:
        'Whole spices cold-infused into coconut, sesame or groundnut oil over 14 days, and single-spice extracts taken in food-grade solvent and then fully removed — for dressings, drizzles and finishing.',
      image: IMG.mortarStone,
      imageAlt: 'A heavy stone mortar and pestle used for grinding whole spices',
      rating: 4.8,
      reviews: 64,
      turnaround: '18–21 days',
      minOrder: '750 ml',
      tags: ['Cold infusion', 'No heat', '14 day steep', 'Finishing oils'],
      overview: [
        'Heat extracts fast and gives you exactly what the pan would have given you: the flat, cooked note. Cold infusion is slow, and the slowness is the entire point. Over fourteen days the volatile oils migrate into the fat without anything being cooked away, and the result tastes like the spice rather than like fried spice.',
        'We infuse in food-grade stainless in a dark room, gently agitated daily, and never go above 28 °C. Coconut and sesame carry a light aroma of their own, so for those we run a shorter fourteen-day steep at a lower ratio; groundnut and sunflower, which are neutral, take a full twenty-one days at a higher load.',
        'Liquid extracts work differently again. A single spice such as saffron, vanilla or cassia is extracted in food-grade ethanol, the solvent is completely removed under vacuum, and what remains is poured into carrier oil. That is a process, not a flavouring, and we can show you the paperwork.'
      ],
      highlights: [
        { title: '28 °C ceiling', text: 'Never heated. The spice is steeped, not fried.' },
        { title: 'Fourteen to twenty-one days', text: 'Time set by the spice and the carrier, not by the production calendar.' },
        { title: 'Strained twice', text: 'Through a coarse and a fine filter, then rested to settle.' },
        { title: 'Documents supplied', text: 'Infusion log, carrier declaration, and solvent-removal certificate on extracts.' }
      ],
      features: [
        'Coconut, sesame, groundnut, sunflower or olive carrier',
        'Single spice or two-to-four-spice infusions',
        'Full-strength and finishing-strength ratios',
        'Saffron, cassia and vanilla liquid extracts',
        'Amber glass with UV-safe closure',
        'Infusion log supplied with every batch'
      ],
      process: [
        { step: '01', title: 'Select & weigh', text: 'Whole spice chosen and weighed fresh, with the carrier oil matched to the dish.' },
        { step: '02', title: 'Cold steep', text: 'Sealed in stainless in the dark for 14 to 21 days, agitated once a day.' },
        { step: '03', title: 'Double strain', text: 'Through coarse then fine filtration, rested for clarity.' },
        { step: '04', title: 'Bottle & log', text: 'Bottled in amber glass with a UV closure, shipped with the infusion log.' }
      ],
      specs: [
        { label: 'Steep duration', value: '14 days (coconut, sesame) · 21 days (groundnut, sunflower)' },
        { label: 'Temperature', value: 'Ambient dark room, never above 28 °C' },
        { label: 'Filtration', value: 'Coarse sieve then 5 µm filter' },
        { label: 'Bottle sizes', value: '250 ml · 500 ml · 1 L amber glass' },
        { label: 'Shelf life', value: '9 months unopened · 4 months opened, refrigerated' },
        { label: 'Extracts', value: 'Food-grade ethanol carrier, vacuum-stripped' },
        { label: 'Documents', value: 'Infusion log, carrier declaration, solvent-removal certificate' },
        { label: 'Allergens', value: 'Sesame and coconut declared on every label' }
      ],
      pricing: [
        {
          name: 'Single Spice',
          price: 720,
          unit: 'per 250 ml',
          note: 'One spice, one carrier',
          features: [
            '250 ml amber glass',
            '14-day cold steep',
            'Double filtration',
            'Infusion log included',
            'Infographic usage card',
            '2–3 week lead time'
          ],
          cta: 'Infuse one spice',
          popular: false
        },
        {
          name: 'Kitchen Blend',
          price: 1280,
          unit: 'per 250 ml',
          note: 'Two to four spices',
          features: [
            'Custom two-to-four spice blend',
            'Choice of five carriers',
            '21-day steep available',
            'Finishing-strength option',
            'Usage recipes included',
            '2–3 week lead time'
          ],
          cta: 'Blend an oil',
          popular: true
        },
        {
          name: 'Restaurant Size',
          price: 3150,
          unit: 'per 1 L',
          note: 'For working kitchens',
          features: [
            '1 L amber glass',
            'Any blend up to 6 spices',
            'Batch card per litre',
            'Standing monthly infusion',
            'Free delivery in Kerala',
            '2 week turnaround'
          ],
          cta: 'Order a litre',
          popular: false
        },
        {
          name: 'Liquid Extract',
          price: null,
          unit: 'custom quote',
          note: 'Saffron, cassia, vanilla',
          features: [
            'Food-grade solvent extraction',
            'Full vacuum solvent removal',
            'Removal certificate supplied',
            'Carrier oil of your choice',
            'Batch-specific COA',
            '100 ml to 5 L'
          ],
          cta: 'Discuss an extract',
          popular: false
        }
      ],
      faqs: [
        { q: 'Why does cold infusion take two weeks instead of two hours?', a: 'Because heat extracts the compounds you do not want. Hot oil drives off the lighter top-notes within minutes and leaves the heavier, flatter base compounds behind — which is exactly the taste of a fried spice. Fourteen days at 28 °C gets you the top notes and the base notes together, which is what makes a finishing oil smell like the spice.' },
        { q: 'Does the oil need refrigerating?', a: 'Unopened, no — store it away from light in a cupboard. Once opened, refrigerate and use it within four months. Cold does dull an oil faster than heat does, which is the opposite of intuition, so do not leave the bottle in the fridge all week.' },
        { q: 'Can you infuse my own spice?', a: 'Yes, and it is the more interesting option. Send us up to one kilogram of whole spice and we will infuse it, subject to a basic quality check for mould, infestation and moisture. We will tell you if the lot will not carry an infusion cleanly rather than wasting your oil on it.' },
        { q: 'Is a liquid extract the same as an essential oil?', a: 'No, and the distinction matters. A food-grade liquid extract is made with an approved solvent that is then completely removed under vacuum, leaving a food-safe concentrate for flavouring. An essential oil is a volatile oil distilled for fragrance, and most of them are not food safe at culinary doses. Never substitute one for the other.' }
      ]
    }
  ];
})(window);
