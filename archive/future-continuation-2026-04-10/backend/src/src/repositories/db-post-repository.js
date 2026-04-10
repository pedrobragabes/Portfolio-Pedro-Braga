const { getBlogDatabase } = require('../database/blog-database');

function normalizeOptionalString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized === '' ? null : normalized;
}

function normalizeDateValue(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return normalizeOptionalString(value);
}

function normalizeSlug(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .filter((tag) => typeof tag === 'string')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getExcerpt(excerpt, content) {
  const normalizedExcerpt = normalizeOptionalString(excerpt);

  if (normalizedExcerpt) {
    return normalizedExcerpt;
  }

  const normalizedContent = String(content || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (normalizedContent.length <= 180) {
    return normalizedContent;
  }

  return `${normalizedContent.slice(0, 177)}...`;
}

function getReadingTimeMinutes(content) {
  const totalWords = String(content || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(totalWords / 200));
}

function parseTagsJson(tagsJson) {
  try {
    return normalizeTags(JSON.parse(tagsJson || '[]'));
  } catch (error) {
    return [];
  }
}

function mapRowToPost(row, includeContent) {
  const post = {
    slug: row.slug,
    title: row.title,
    date: row.date,
    tags: parseTagsJson(row.tags_json),
    excerpt: row.excerpt,
    image: row.image,
    published: Boolean(row.published),
    readingTimeMinutes: getReadingTimeMinutes(row.content),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };

  if (includeContent) {
    post.content = row.content;
  }

  return post;
}

function getSelectableColumns() {
  return [
    'slug',
    'title',
    'date',
    'tags_json',
    'excerpt',
    'image',
    'published',
    'content',
    'created_at',
    'updated_at'
  ].join(', ');
}

async function listPosts(options = {}) {
  const includeDrafts = options.includeDrafts === true;
  const includeContent = options.includeContent === true;
  const database = getBlogDatabase();

  const whereClause = includeDrafts ? '' : 'WHERE published = 1';
  const rows = database
    .prepare(`
      SELECT ${getSelectableColumns()}
      FROM blog_posts
      ${whereClause}
      ORDER BY COALESCE(date, created_at) DESC, updated_at DESC;
    `)
    .all();

  return rows.map((row) => mapRowToPost(row, includeContent));
}

async function findPostBySlug(slug, options = {}) {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    return null;
  }

  const includeDrafts = options.includeDrafts === true;
  const includeContent = options.includeContent !== false;
  const database = getBlogDatabase();
  const whereClause = includeDrafts ? '' : 'AND published = 1';

  const row = database
    .prepare(`
      SELECT ${getSelectableColumns()}
      FROM blog_posts
      WHERE slug = ?
      ${whereClause}
      LIMIT 1;
    `)
    .get(normalizedSlug);

  return row ? mapRowToPost(row, includeContent) : null;
}

function normalizeCreatePayload(payload) {
  const normalizedSlug = normalizeSlug(payload.slug);
  const normalizedTitle = normalizeOptionalString(payload.title);
  const normalizedContent = normalizeOptionalString(payload.content);

  if (!normalizedSlug) {
    const error = new Error('Invalid slug for blog post.');
    error.statusCode = 400;
    throw error;
  }

  if (!normalizedTitle) {
    const error = new Error('Title is required for blog post.');
    error.statusCode = 400;
    throw error;
  }

  if (!normalizedContent) {
    const error = new Error('Content is required for blog post.');
    error.statusCode = 400;
    throw error;
  }

  return {
    slug: normalizedSlug,
    title: normalizedTitle,
    date: normalizeDateValue(payload.date),
    tagsJson: JSON.stringify(normalizeTags(payload.tags)),
    excerpt: getExcerpt(payload.excerpt, normalizedContent),
    image: normalizeOptionalString(payload.image),
    published: payload.published === true ? 1 : 0,
    content: normalizedContent
  };
}

async function createPost(payload) {
  const normalized = normalizeCreatePayload(payload);
  const database = getBlogDatabase();
  const nowIso = new Date().toISOString();

  try {
    database
      .prepare(`
        INSERT INTO blog_posts (
          slug,
          title,
          date,
          tags_json,
          excerpt,
          image,
          published,
          content,
          created_at,
          updated_at
        ) VALUES (
          @slug,
          @title,
          @date,
          @tagsJson,
          @excerpt,
          @image,
          @published,
          @content,
          @createdAt,
          @updatedAt
        );
      `)
      .run({
        ...normalized,
        createdAt: nowIso,
        updatedAt: nowIso
      });
  } catch (error) {
    if (String(error.message || '').includes('UNIQUE constraint failed')) {
      const duplicateError = new Error('A blog post with this slug already exists.');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }

  return findPostBySlug(normalized.slug, {
    includeDrafts: true,
    includeContent: true
  });
}

async function updatePostBySlug(slug, payload) {
  const currentPost = await findPostBySlug(slug, {
    includeDrafts: true,
    includeContent: true
  });

  if (!currentPost) {
    return null;
  }

  const updatedSlug = Object.prototype.hasOwnProperty.call(payload, 'slug')
    ? normalizeSlug(payload.slug)
    : currentPost.slug;

  const updatedTitle = Object.prototype.hasOwnProperty.call(payload, 'title')
    ? normalizeOptionalString(payload.title)
    : currentPost.title;

  const updatedContent = Object.prototype.hasOwnProperty.call(payload, 'content')
    ? normalizeOptionalString(payload.content)
    : currentPost.content;

  if (!updatedSlug || !updatedTitle || !updatedContent) {
    const error = new Error('Slug, title and content must not be empty.');
    error.statusCode = 400;
    throw error;
  }

  const updatedTags = Object.prototype.hasOwnProperty.call(payload, 'tags')
    ? normalizeTags(payload.tags)
    : currentPost.tags;

  const updatedDate = Object.prototype.hasOwnProperty.call(payload, 'date')
    ? normalizeDateValue(payload.date)
    : currentPost.date;

  const updatedImage = Object.prototype.hasOwnProperty.call(payload, 'image')
    ? normalizeOptionalString(payload.image)
    : currentPost.image;

  const updatedPublished = Object.prototype.hasOwnProperty.call(payload, 'published')
    ? (payload.published === true ? 1 : 0)
    : (currentPost.published ? 1 : 0);

  const updatedExcerpt = Object.prototype.hasOwnProperty.call(payload, 'excerpt')
    ? getExcerpt(payload.excerpt, updatedContent)
    : getExcerpt(currentPost.excerpt, updatedContent);

  const database = getBlogDatabase();
  const nowIso = new Date().toISOString();

  try {
    database
      .prepare(`
        UPDATE blog_posts
        SET slug = @slug,
            title = @title,
            date = @date,
            tags_json = @tagsJson,
            excerpt = @excerpt,
            image = @image,
            published = @published,
            content = @content,
            updated_at = @updatedAt
        WHERE slug = @targetSlug;
      `)
      .run({
        targetSlug: currentPost.slug,
        slug: updatedSlug,
        title: updatedTitle,
        date: updatedDate,
        tagsJson: JSON.stringify(updatedTags),
        excerpt: updatedExcerpt,
        image: updatedImage,
        published: updatedPublished,
        content: updatedContent,
        updatedAt: nowIso
      });
  } catch (error) {
    if (String(error.message || '').includes('UNIQUE constraint failed')) {
      const duplicateError = new Error('A blog post with this slug already exists.');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }

  return findPostBySlug(updatedSlug, {
    includeDrafts: true,
    includeContent: true
  });
}

async function deletePostBySlug(slug) {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    return false;
  }

  const database = getBlogDatabase();
  const result = database
    .prepare('DELETE FROM blog_posts WHERE slug = ?')
    .run(normalizedSlug);

  return result.changes > 0;
}

module.exports = {
  listPosts,
  findPostBySlug,
  createPost,
  updatePostBySlug,
  deletePostBySlug
};