/* ==========================================================================
   HOME PAGE SCRIPT
   --------------------------------------------------------------------
   Renders the two dataset-driven previews on the landing page:
     • #home-services-grid → first 6 services
     • #home-posts-grid    → latest 3 journal articles
   Everything else on this page is static markup handled by main.js / ui.js.
   ========================================================================== */
(function (window, document) {
  'use strict';

  function boot() {
    var K = window.PageKit;
    if (!K) return;

    var services = window.AMRITHA_SERVICES || [];
    var posts = window.AMRITHA_POSTS || [];

    /* Featured services: the six core commercial lines, in catalogue order */
    if (services.length) {
      K.fill('home-services-grid', services.slice(0, 6).map(K.serviceCard).join(''));
    }

    /* Journal: three most recent articles */
    if (posts.length) {
      K.fill('home-posts-grid', posts.slice(0, 3).map(K.postCard).join(''));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
