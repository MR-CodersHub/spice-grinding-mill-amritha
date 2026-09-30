/* ==========================================================================
   JOURNAL ARTICLE PAGE SCRIPT
   --------------------------------------------------------------------
   One physical page renders any article in window.AMRITHA_POSTS:

     blog-details.html?id=cold-stone-vs-roller-mill

   Renders the header, the article body (headings get ids for the table of
   contents), the takeaways, related articles, previous/next navigation and
   the share row. An unknown id falls back to the featured article and says
   so rather than rendering an empty page.
   ========================================================================== */
(function (window, document) {
  'use strict';

  /* One-line bios, keyed by author. Written here rather than in the post
     records so the article data stays purely editorial. */
  var AUTHOR_BIO = {
    'Ravi Menon': 'Third-generation Master Miller. Runs the stones, keeps the batch log, and is the reason most of the temperatures quoted here are logged rather than estimated.',
    'Lakshmi Amritha': 'Runs sourcing and the grower contracts across Salem, Guntur, Ramganj Mandi, Unjha and the Idukki highlands.',
    'Chef Nikhil Varma': 'Exec chef, twenty-two years in Kerala and Chettinad kitchens. Writes the recipes, and argues with us about the heat levels.',
    'Dr Meenakshi Iyer': 'Food scientist. Handles the lab work — curcumin, volatile oil and moisture — and explains what the numbers actually mean.'
  };

  var AUTHOR_LINKS = {
    'Ravi Menon': { posts: 'Understanding Volatile Oils', href: 'blog-details.html?id=understanding-volatile-oils' },
    'Lakshmi Amritha': { posts: 'Sourcing Turmeric in Salem', href: 'blog-details.html?id=sourcing-turmeric-salem' },
    'Chef Nikhil Varma': { posts: 'A Chettinad Pepper Masala', href: 'blog-details.html?id=chettinad-pepper-masala' },
    'Dr Meenakshi Iyer': { posts: 'Stone vs Roller Mill', href: 'blog-details.html?id=cold-stone-vs-roller-mill' }
  };

  function setText(id, value) {
    var node = window.PageKit.q('#' + id);
    if (node) node.textContent = value;
  }

  /* ------------------------------------------------------------------ */
  /* Header                                                              */
  /* ------------------------------------------------------------------ */
  function renderHeader(post) {
    var K = window.PageKit;
    K.setTitle(post.title);

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', post.excerpt);

    setText('crumb-current', post.title);
    setText('article-category', post.category);
    setText('article-title', post.title);
    setText('article-excerpt', post.excerpt);
    setText('article-initials', post.authorInitials);
    setText('article-author', post.author);
    setText('article-role', post.authorRole);
    setText('article-date', post.date.display);
    setText('article-read', post.readTime + ' min read');

    var image = K.q('#article-image');
    if (image) {
      image.setAttribute('src', post.image);
      image.setAttribute('alt', post.imageAlt);
    }
    setText('article-caption', post.imageAlt + ' — Amritha Spice Mill, Kerala.');
  }

  function renderShare() {
    var K = window.PageKit;
    var wrap = K.q('#share-buttons');
    if (!wrap) return;

    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title.replace(' | Amritha Spice Mill', ''));

    var targets = [
      { icon: 'whatsapp', label: 'Share on WhatsApp', href: 'https://wa.me/?text=' + title + '%20' + url },
      { icon: 'linkedin', label: 'Share on LinkedIn', href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url },
      { icon: 'facebook', label: 'Share on Facebook', href: 'https://www.facebook.com/sharer/sharer.php?u=' + url },
      { icon: 'twitter', label: 'Share on X', href: 'https://twitter.com/intent/tweet?text=' + title + '&url=' + url }
    ];

    var html = targets.map(function (target) {
      return '<a class="share-btn" href="' + target.href + '" target="_blank" rel="noopener noreferrer" ' +
        'aria-label="' + target.label + '" title="' + target.label + '">' + K.icon(target.icon) + '</a>';
    }).join('');

    html += '<button class="share-btn" type="button" data-copy aria-label="Copy link" title="Copy link">' +
      K.icon('copy') + '</button>';

    wrap.innerHTML = html;
  }

  /* ------------------------------------------------------------------ */
  /* Body + table of contents                                            */
  /* ------------------------------------------------------------------ */
  function renderBody(post) {
    var K = window.PageKit;
    var used = {};
    var toc = [];

    var html = post.content.map(function (block) {
      if (block.type === 'h2' || block.type === 'h3') {
        var base = K.slugify(block.text) || 'section';
        var id = base;
        var n = 2;
        while (used[id]) { id = base + '-' + (n++); }
        used[id] = true;

        toc.push({ id: id, text: block.text, level: block.type === 'h2' ? 2 : 3 });
        return '<' + block.type + ' id="' + id + '">' + K.esc(block.text) + '</' + block.type + '>';
      }
      return K.renderBlocks([block]);
    }).join('');

    var body = K.q('#article-body');
    if (body) body.innerHTML = html;

    renderToc(toc);
  }

  function renderToc(toc) {
    var K = window.PageKit;
    if (!toc.length) return;

    var nav = K.q('#toc');
    if (nav) nav.hidden = false;

    K.q('#toc-list').innerHTML = toc.map(function (entry) {
      return '<li class="toc-h3" style="padding-inline-start:14px;font-size:.86rem;">' +
        '<a href="#' + entry.id + '">' + K.esc(entry.text) + '</a></li>';
    }).join('');

    /* Highlight the section currently being read */
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    K.qa('#toc-list a').forEach(function (link) {
      links[link.getAttribute('href').slice(1)] = link.parentNode;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        K.qa('#toc-list li').forEach(function (li) { li.classList.remove('is-active'); });
        var active = links[entry.target.id];
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    toc.forEach(function (entry) {
      var heading = document.getElementById(entry.id);
      if (heading) observer.observe(heading);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Tags, author, takeaways                                             */
  /* ------------------------------------------------------------------ */
  function renderTags(post) {
    var K = window.PageKit;
    var block = K.q('#article-tags');
    if (block) block.hidden = false;

    K.q('#article-tag-row').innerHTML = (post.tags || []).map(function (tag) {
      return '<a class="tag" href="blog.html?category=' + encodeURIComponent(post.category) + '">' + K.esc(tag) + '</a>';
    }).join('');
  }

  function renderAuthor(post) {
    var K = window.PageKit;
    var bio = AUTHOR_BIO[post.author] || '';
    var link = AUTHOR_LINKS[post.author];

    setText('footer-initials', post.authorInitials);
    setText('footer-name', post.author + ' — ' + post.authorRole);
    setText('footer-bio', bio);

    var footer = K.q('#article-footer');
    if (footer) footer.hidden = false;

    var more = K.q('#footer-more');
    if (more && link) {
      more.setAttribute('href', link.href);
      more.textContent = 'More: ' + link.posts;
    }

    setText('author-widget-bio', bio);

    var links = K.q('#author-widget-links');
    if (links) {
      links.innerHTML = link
        ? '<li><a href="' + link.href + '">Read ' + link.posts + '</a></li>' +
          '<li><a href="blog.html?category=' + encodeURIComponent(post.category) + '">All ' + K.esc(post.category) + ' articles</a></li>'
        : '<li><a href="blog.html">Back to the Journal</a></li>';
    }
  }

  function takeaways(post) {
    var out = [];
    post.content.forEach(function (block) {
      if (block.type === 'ul' && out.length < 3) {
        block.items.slice(0, 2).forEach(function (item) { out.push(item); });
      }
      if (out.length >= 3) return;
    });

    /* Fall back to the opening paragraphs if the article is list-light */
    if (out.length < 3) {
      post.content.forEach(function (block) {
        if (out.length >= 3) return;
        if (block.type === 'p' && block.text.length > 80) {
          out.push(block.text.replace(/<[^>]+>/g, '').slice(0, 150) + '…');
        }
      });
    }
    return out.slice(0, 3);
  }

  function renderTakeaways(post) {
    var K = window.PageKit;
    K.fill('takeaway-cards', takeaways(post).map(function (text) {
      return '<div class="icon-card reveal">' +
        '<div class="icon-wrap">' + K.icon('checkCircle') + '</div>' +
        '<p style="margin-top:14px;font-size:.97rem;line-height:1.75;">' + K.esc(text) + '</p>' +
      '</div>';
    }).join(''));
  }

  /* ------------------------------------------------------------------ */
  /* Related, sidebar, prev/next                                         */
  /* ------------------------------------------------------------------ */
  function relatedPosts(post, all) {
    var byId = {};
    all.forEach(function (item) { byId[item.id] = item; });

    var picked = (post.related || []).map(function (id) { return byId[id]; })
      .filter(Boolean);

    /* Top up with same-category articles, then anything else */
    if (picked.length < 3) {
      all.forEach(function (item) {
        if (picked.length >= 3) return;
        if (item.id === post.id) return;
        if (picked.indexOf(item) !== -1) return;
        if (item.category !== post.category) return;
        picked.push(item);
      });
    }
    all.forEach(function (item) {
      if (picked.length >= 3) return;
      if (item.id === post.id || picked.indexOf(item) !== -1) return;
      picked.push(item);
    });

    return picked.slice(0, 3);
  }

  function renderRelated(post, all) {
    var K = window.PageKit;
    K.fill('related-grid', relatedPosts(post, all).map(K.postCard).join(''));
  }

  function renderSidebar(post, all) {
    var K = window.PageKit;
    var others = all.filter(function (item) { return item.id !== post.id; }).slice(0, 4);

    K.q('#sidebar-posts').innerHTML = others.map(function (item) {
      return '<a class="mini-post" href="' + K.esc(K.postHref(item.id)) + '">' +
        '<img src="' + K.esc(item.image) + '" alt="" loading="lazy">' +
        '<span>' + K.esc(item.title) + '</span></a>';
    }).join('');
  }

  function renderPrevNext(post, all) {
    var K = window.PageKit;
    var index = all.indexOf(post);

    var prev = index > 0 ? all[index - 1] : all[all.length - 1];
    var next = index < all.length - 1 ? all[index + 1] : all[0];

    var prevLink = K.q('#prev-post');
    if (prevLink) {
      prevLink.setAttribute('href', K.postHref(prev.id));
      prevLink.textContent = '← ' + prev.title;
    }
    var nextLink = K.q('#next-post');
    if (nextLink) {
      nextLink.setAttribute('href', K.postHref(next.id));
      nextLink.textContent = next.title + ' →';
    }
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  function boot() {
    var K = window.PageKit;
    if (!K) return;

    var all = window.AMRITHA_POSTS || [];
    if (!all.length) return;

    var id = K.param('id');
    var post = K.findById(all, id);

    if (!post) {
      post = all.filter(function (item) { return item.featured; })[0] || all[0];
      if (id && window.Toast) {
        window.Toast.error('That article is not in the Journal. Showing our most recent feature instead.', { duration: 6000 });
      }
    }

    renderHeader(post);
    renderBody(post);
    renderShare();
    renderTags(post);
    renderAuthor(post);
    renderTakeaways(post);
    renderRelated(post, all);
    renderSidebar(post, all);
    renderPrevNext(post, all);

    var hidden = K.q('#question-post-id');
    if (hidden) hidden.value = post.id;

    if (window.UI) window.UI.refresh();

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
