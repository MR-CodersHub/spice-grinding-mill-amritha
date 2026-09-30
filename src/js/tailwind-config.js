/* ==========================================================================
   TAILWIND CONFIGURATION
   Loaded immediately after the Tailwind Play CDN script.
   Preflight is intentionally DISABLED so the heritage stylesheet in
   src/css/style.css is never reset — Tailwind is used only for
   supplemental layout/spacing utilities on top of the original design.
   ========================================================================== */
window.tailwind.config = {
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#082052',
          dark: '#051433',
          light: '#0F3073'
        },
        ivory: {
          bg: '#F8F0E5',
          surface: '#FFF9F0',
          card: '#FFFFFF'
        },
        gold: {
          DEFAULT: '#C9A45C',
          hover: '#B38E48'
        },
        spice: {
          turmeric: '#E89D1C',
          chilli: '#B52B1E',
          terracotta: '#BD5A38',
          sage: '#3E6347',
          pepper: '#1C1917'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    }
  }
};
