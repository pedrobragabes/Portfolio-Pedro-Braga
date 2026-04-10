const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const POSTS_DIR = path.join(BLOG_DIR, 'posts');
const SITE_URL = 'https://pedrobragabes.com';
const SITE_NAME = 'Pedro Braga - Blog Tecnico';
const SITE_DESCRIPTION = 'Artigos tecnicos sobre infraestrutura, automacao, backend e engenharia de software.';
const DEFAULT_IMAGE = `${SITE_URL}/assets/profile/Pedro Braga.webp`;

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));

  const posts = files.map((file) => {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(raw);

    const fallbackSlug = file.replace(/\.md$/i, '');
    const slug = slugify(data.slug || fallbackSlug);
    const title = (data.title || slug).toString().trim();
    const description = (data.description || '').toString().trim();
    const date = normalizeDate(data.date);
    const updated = normalizeDate(data.updated || data.date || new Date());
    const tags = normalizeTags(data.tags);
    const cover = (data.cover || DEFAULT_IMAGE).toString().trim();

    return {
      slug,
      title,
      description,
      date,
      updated,
      tags,
      cover,
      content,
      html: marked.parse(content),
      excerpt: description || createExcerpt(content)
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

function slugify(value) {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'post';
}

function normalizeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => tag.toString().trim()).filter(Boolean);
  }
  if (typeof tags === 'string' && tags.trim()) {
    return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

function createExcerpt(content) {
  const plain = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/#+\s+/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= 180) {
    return plain;
  }
  return `${plain.slice(0, 177)}...`;
}

function formatDatePt(isoDate) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

function escapeHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeXml(value = '') {
  return escapeHtml(value);
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function renderPage({ title, description, canonical, image, bodyClass = '', content, jsonLd = '', extraHead = '' }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="Pedro Braga">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="icon" type="image/png" href="/assets/favicon/PB.png">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:title" content="${escapeHtml(title)}">
  <meta property="twitter:description" content="${escapeHtml(description)}">
  <meta property="twitter:image" content="${escapeHtml(image)}">
  <link rel="alternate" type="application/rss+xml" title="RSS Blog Pedro Braga" href="/blog/rss.xml">

  <script>
    (function () {
      try {
        var savedTheme = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.backgroundColor = theme === 'dark' ? '#121212' : '#F5F0E8';
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.style.backgroundColor = '#F5F0E8';
      }
    })();
  </script>

  <link rel="stylesheet" href="/css/blog.css">
  ${extraHead}
  ${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-C7M61DXD7W"></script>
  <script src="/js/analytics.min.js"></script>
</head>
<body class="${bodyClass}">
  <a href="#main-content" class="skip-link">Pular para o conteudo principal</a>

  <header class="blog-header">
    <div class="container">
      <a class="blog-logo" href="/">Pedro Braga</a>
      <nav class="blog-nav" aria-label="Navegacao do blog">
        <a class="blog-nav__link" href="/">Inicio</a>
        <a class="blog-nav__link" href="/blog/">Blog</a>
      </nav>
    </div>
  </header>

  <main class="blog-main" id="main-content">
    ${content}
  </main>

  <footer class="blog-footer">
    <div class="container">
      <p>© ${new Date().getUTCFullYear()} Pedro Braga. Todos os direitos reservados.</p>
      <a href="/blog/rss.xml">RSS do Blog</a>
    </div>
  </footer>
</body>
</html>`;
}

function buildListingPage(posts) {
  const postsHtml = posts
    .map((post) => {
      const postUrl = `/blog/${post.slug}/`;
      const tags = post.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
      return `<article class="post-card">
  <h2><a href="${postUrl}">${escapeHtml(post.title)}</a></h2>
  <p class="post-meta">${escapeHtml(formatDatePt(post.date))}</p>
  <p class="post-excerpt">${escapeHtml(post.excerpt)}</p>
  <div class="post-tags">${tags}</div>
  <a class="read-more" href="${postUrl}">Ler artigo</a>
</article>`;
    })
    .join('\n');

  const pageContent = `<section class="hero">
  <div class="container hero__surface">
    <p class="eyebrow">Blog Tecnico</p>
    <h1>Artigos sobre engenharia, backend e infraestrutura</h1>
    <p class="hero-text">Conteudo pratico com foco em aprendizado aplicado, arquitetura real e boas praticas de deploy.</p>
    <div class="hero-actions">
      <a class="hero-chip" href="/blog/rss.xml">Assinar RSS</a>
      <a class="hero-chip hero-chip--ghost" href="/">Ver portfolio</a>
    </div>
  </div>
</section>
<section class="posts">
  <div class="container posts-grid">
    ${postsHtml}
  </div>
</section>`;

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: SITE_NAME,
    url: `${SITE_URL}/blog/`,
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Person',
      name: 'Pedro Braga'
    }
  });

  const html = renderPage({
    title: 'Blog Tecnico | Pedro Braga',
    description: SITE_DESCRIPTION,
    canonical: `${SITE_URL}/blog/`,
    image: DEFAULT_IMAGE,
    bodyClass: 'blog-listing',
    content: pageContent,
    jsonLd
  });

  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), html, 'utf-8');
}

function buildArticlePages(posts) {
  posts.forEach((post) => {
    const articleDir = path.join(BLOG_DIR, post.slug);
    ensureDirectory(articleDir);

    const tags = post.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
    const content = `<article class="article container">
  <a class="back-link" href="/blog/">← Voltar para o blog</a>
  <p class="eyebrow">${escapeHtml(formatDatePt(post.date))}</p>
  <h1>${escapeHtml(post.title)}</h1>
  <p class="article-description">${escapeHtml(post.description || post.excerpt)}</p>
  <div class="post-tags">${tags}</div>
  <div class="article-content">${post.html}</div>
</article>`;

    const canonical = `${SITE_URL}/blog/${post.slug}/`;
    const jsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      dateModified: post.updated,
      description: post.description || post.excerpt,
      image: post.cover || DEFAULT_IMAGE,
      mainEntityOfPage: canonical,
      author: {
        '@type': 'Person',
        name: 'Pedro Braga'
      },
      publisher: {
        '@type': 'Person',
        name: 'Pedro Braga'
      }
    });

    const html = renderPage({
      title: `${post.title} | Blog Pedro Braga`,
      description: post.description || post.excerpt,
      canonical,
      image: post.cover || DEFAULT_IMAGE,
      bodyClass: 'blog-article',
      content,
      jsonLd
    });

    fs.writeFileSync(path.join(articleDir, 'index.html'), html, 'utf-8');
  });
}

function buildRss(posts) {
  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}/`;
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${escapeXml(link)}</link>
  <guid>${escapeXml(link)}</guid>
  <description>${escapeXml(post.description || post.excerpt)}</description>
  <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
</item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(SITE_NAME)}</title>
  <link>${SITE_URL}/blog/</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>pt-BR</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${items}
</channel>
</rss>`;

  fs.writeFileSync(path.join(BLOG_DIR, 'rss.xml'), rss, 'utf-8');
}

function buildSitemap(posts) {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  const existing = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf-8') : '';
  const existingUrls = Array.from(existing.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1]);

  const urls = new Map();
  const today = new Date().toISOString().slice(0, 10);

  existingUrls.forEach((url) => {
    urls.set(url, { lastmod: today, changefreq: 'monthly', priority: '0.8' });
  });

  urls.set(`${SITE_URL}/`, { lastmod: today, changefreq: 'monthly', priority: '1.0' });
  urls.set(`${SITE_URL}/blog/`, { lastmod: today, changefreq: 'weekly', priority: '0.9' });
  urls.set(`${SITE_URL}/blog/rss.xml`, { lastmod: today, changefreq: 'daily', priority: '0.7' });

  posts.forEach((post) => {
    urls.set(`${SITE_URL}/blog/${post.slug}/`, {
      lastmod: post.updated || post.date,
      changefreq: 'monthly',
      priority: '0.8'
    });
  });

  const body = Array.from(urls.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([loc, meta]) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${meta.lastmod}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

  fs.writeFileSync(sitemapPath, xml, 'utf-8');
}

function run() {
  ensureDirectory(BLOG_DIR);
  ensureDirectory(POSTS_DIR);

  const posts = readPosts();
  if (posts.length === 0) {
    throw new Error('Nenhum post encontrado em blog/posts/*.md');
  }

  buildListingPage(posts);
  buildArticlePages(posts);
  buildRss(posts);
  buildSitemap(posts);

  console.log(`Blog gerado com sucesso: ${posts.length} artigo(s).`);
}

run();
