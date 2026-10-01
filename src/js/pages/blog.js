/* ==========================================================================
   JOURNAL INDEX PAGE SCRIPT
   --------------------------------------------------------------------
   • Injects static icons
   • Renders the featured article, the archive grid, category cards,
     author cards and the category filter chips
   • Client-side search over title / excerpt / tags / author
   • Category filter chips (registered with window.UI)
   • Simple client-side pagination, 6 articles per page
   • Deep links: blog.html?category=Craft and blog.html?q=volatile+oils
   ========================================================================== */
(function (window, document) {
  'use strict';

  var PER_PAGE = 6;

  function injectIcons() {
    var K = window.PageKit;
    var node = K.q('#blog-search-icon');
    if (node) node.innerHTML = K.icon('search');
  }

  function haystack(post) {
    return [
      post.title, post.excerpt, post.category, post.author,
      (post.tags || []).join(' '),
      post.content.map(function (b) {
        return b.text || (b.items || []).join(' ') || b.q || '';
      }).join(' ')
    ].join(' ').toLowerCase();
  }

  /* ------------------------------------------------------------------ */
  /* Featured article                                                    */
  /* ------------------------------------------------------------------ */
  function renderFeatured(posts) {
    var K = window.PageKit;
    var post = posts.filter(function (p) { return p.featured; })[0] || posts[0];
    if (!post) return;

    K.q('#featured-slot').innerHTML =
      '<div class="featured-post reveal">' +
        '<a class="fp-media" href="' + K.esc(K.postHref(post.id)) + '" tabindex="-1" aria-hidden="true">' +
          '<img src="' + K.esc(post.image) + '" alt="" loading="lazy">' +
        '</a>' +
        '<div class="fp-body">' +
          '<span class="blog-cat">' + K.icon('book') + 'Featured · ' + K.esc(post.category) + '</span>' +
          '<h3><a href="' + K.esc(K.postHref(post.id)) + '">' + K.esc(post.title) + '</a></h3>' +
          '<p>' + K.esc(post.excerpt) + '</p>' +
          '<div class="article-meta" style="margin-top:22px;">' +
            '<div class="article-author">' +
              (post.authorImg
                ? '<img src="' + K.esc(post.authorImg) + '" alt="' + K.esc(post.author) + '" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;">'
                : '<span class="avatar">' + K.esc(post.authorInitials) + '</span>') +
              '<div><strong>' + K.esc(post.author) + '</strong><span>' + K.esc(post.authorRole) + '</span></div>' +
            '</div>' +
            '<span class="meta-pill">' + K.icon('calendar') + K.esc(post.date.display) + '</span>' +
            '<span class="meta-pill">' + K.icon('clock') + post.readTime + ' min read</span>' +
          '</div>' +
          '<div class="card-foot" style="margin-top:26px;">' +
            '<a class="card-link" href="' + K.esc(K.postHref(post.id)) + '">Read the full article' + K.icon('arrowRight') + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* Category chips, category cards, author cards                        */
  /* ------------------------------------------------------------------ */
  function categories(posts) {
    var counts = {};
    posts.forEach(function (post) {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.keys(counts).sort().map(function (name) {
      return { name: name, count: counts[name] };
    });
  }

  function renderChips(posts) {
    var K = window.PageKit;
    var group = K.q('[data-filter-group="posts"]');
    if (!group) return;
    var chips = ['<button class="filter-chip active" data-filter-value="all" type="button">All</button>'];
    categories(posts).forEach(function (cat) {
      chips.push('<button class="filter-chip" data-filter-value="' + K.esc(cat.name) + '" type="button">' +
        K.esc(cat.name) + '</button>');
    });
    group.innerHTML = chips.join('');

    /* ui.js binds the click handlers once; re-run only that step */
    if (window.UI) window.UI.rebindFilters();
  }

  function renderCategoryCards(posts) {
    var K = window.PageKit;
    K.fill('category-cards', categories(posts).map(function (cat) {
      var lead = posts.filter(function (p) { return p.category === cat.name; })[0];
      return '<a class="icon-card reveal" href="#archive-heading" data-jump="' + K.esc(cat.name) + '" style="text-decoration:none;">' +
        '<div class="icon-wrap">' + K.icon('book') + '</div>' +
        '<h3>' + K.esc(cat.name) + '</h3>' +
        '<p>' + cat.count + ' article' + (cat.count === 1 ? '' : 's') + '. Latest: ' +
          K.esc(lead ? lead.title : '') + '</p>' +
      '</a>';
    }).join(''));
  }

  function renderAuthorCards(posts) {
    var K = window.PageKit;
    var seen = {};
    var authors = [];
    posts.forEach(function (post) {
      if (seen[post.author]) return;
      seen[post.author] = true;
      authors.push({
        name: post.author,
        role: post.authorRole,
        initials: post.authorInitials,
        count: posts.filter(function (p) { return p.author === post.author; }).length,
        topics: (post.tags || []).slice(0, 3)
      });
    });

    K.fill('author-cards', authors.map(function (author) {
      return '<div class="team-card reveal">' +
        '<span class="avatar lg">' + K.esc(author.initials) + '</span>' +
        '<h3>' + K.esc(author.name) + '</h3>' +
        '<div class="team-role">' + K.esc(author.role) + '</div>' +
        '<p>' + author.count + ' article' + (author.count === 1 ? '' : 's') + ' in the Journal.</p>' +
        '<div class="team-tags">' + author.topics.map(function (t) {
          return '<span class="pill">' + K.esc(t) + '</span>';
        }).join('') + '</div>' +
      '</div>';
    }).join(''));
  }

  /* ------------------------------------------------------------------ */
  /* Archive grid + pagination                                           */
  /* ------------------------------------------------------------------ */
  function renderGrid(posts, view) {
    var K = window.PageKit;

    var matched = posts.filter(function (post) {
      var catOk = view.category === 'all' || post.category === view.category;
      var queryOk = !view.query || haystack(post).indexOf(view.query) !== -1;
      return catOk && queryOk;
    });

    var pages = Math.max(1, Math.ceil(matched.length / PER_PAGE));
    if (view.page > pages) view.page = pages;
    var slice = matched.slice((view.page - 1) * PER_PAGE, view.page * PER_PAGE);

    K.fill('blog-grid', slice.map(K.postCard).join(''));

    var empty = K.q('#blog-empty');
    if (empty) empty.classList.toggle('show', matched.length === 0);

    K.q('#blog-count').textContent = String(matched.length);
    K.q('#blog-total').textContent = String(posts.length);

    renderPagination(pages, view);
  }

  function renderPagination(pages, view) {
    var K = window.PageKit;
    var nav = K.q('#blog-pagination');
    if (!nav) return;
    if (pages < 2) { nav.innerHTML = ''; return; }

    var html = '<button class="page-btn" type="button" data-page-nav="prev" aria-label="Previous page"' +
      (view.page === 1 ? ' disabled' : '') + '>&larr;</button>';
    for (var i = 1; i <= pages; i++) {
      html += '<button class="page-btn' + (i === view.page ? ' active' : '') + '" type="button" data-page-nav="' +
        i + '" aria-label="Page ' + i + '"' + (i === view.page ? ' aria-current="page"' : '') + '>' + i + '</button>';
    }
    html += '<button class="page-btn" type="button" data-page-nav="next" aria-label="Next page"' +
      (view.page === pages ? ' disabled' : '') + '>&rarr;</button>';
    nav.innerHTML = html;

    K.qa('[data-page-nav]', nav).forEach(function (button) {
      button.addEventListener('click', function () {
        var value = button.getAttribute('data-page-nav');
        if (value === 'prev') view.page = Math.max(1, view.page - 1);
        else if (value === 'next') view.page = Math.min(pages, view.page + 1);
        else view.page = parseInt(value, 10);
        renderGrid(window.AMRITHA_POSTS || [], view);
        K.q('#archive-heading').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  function boot() {
    injectIcons();

    var K = window.PageKit;
    var posts = window.AMRITHA_POSTS || [];
    if (!K || !posts.length) return;

    var view = { query: '', category: 'all', page: 1 };

    renderFeatured(posts);
    renderChips(posts);
    renderCategoryCards(posts);
    renderAuthorCards(posts);
    renderGrid(posts, view);

    if (window.UI) {
      window.UI.registerFilter('posts', function (value) {
        view.category = value;
        view.page = 1;
        renderGrid(posts, view);
      });
    }

    var input = K.q('#blog-search');
    if (input) {
      var timer = null;
      input.addEventListener('input', function () {
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          view.query = input.value.trim().toLowerCase();
          view.page = 1;
          renderGrid(posts, view);
        }, 180);
      });
    }

    var reset = K.q('#blog-reset');
    if (reset) {
      reset.addEventListener('click', function () {
        if (input) input.value = '';
        view.query = '';
        view.category = 'all';
        view.page = 1;
        K.qa('[data-filter-group="posts"] .filter-chip').forEach(function (chip) {
          chip.classList.toggle('active', chip.getAttribute('data-filter-value') === 'all');
        });
        renderGrid(posts, view);
      });
    }

    /* Category cards jump straight into a filtered archive */
    K.qa('[data-jump]').forEach(function (card) {
      card.addEventListener('click', function () {
        var name = card.getAttribute('data-jump');
        view.category = name;
        view.page = 1;
        K.qa('[data-filter-group="posts"] .filter-chip').forEach(function (chip) {
          chip.classList.toggle('active', chip.getAttribute('data-filter-value') === name);
        });
        renderGrid(posts, view);
      });
    });

    /* Deep links */
    var requestedCategory = K.param('category');
    if (requestedCategory) {
      var chip = K.q('[data-filter-group="posts"] [data-filter-value="' + requestedCategory.replace(/"/g, '') + '"]');
      if (chip) chip.click();
    }
    var requestedQuery = K.param('q');
    if (requestedQuery && input) {
      input.value = requestedQuery;
      view.query = requestedQuery.toLowerCase();
      view.page = 1;
      renderGrid(posts, view);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window, document);
