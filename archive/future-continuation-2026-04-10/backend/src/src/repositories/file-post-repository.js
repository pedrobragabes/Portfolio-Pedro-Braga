const fs = require('fs/promises');
const path = require('path');

const matter = require('gray-matter');

const config = require('../config/env');

function parseDateValue(dateValue) {
  const parsed = Date.parse(dateValue || '');
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getExcerpt(frontMatter, content) {
  if (typeof frontMatter.excerpt === 'string' && frontMatter.excerpt.trim() !== '') {
    return frontMatter.excerpt.trim();
  }

  const normalized = content
    .replace(/\s+/g, ' ')
    .trim();

  if (normalized.length <= 180) {
    return normalized;
  }

  return `${normalized.slice(0, 177)}...`;
}

function getTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .filter((tag) => typeof tag === 'string')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function getReadingTimeMinutes(content) {
  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

function normalizePost(slug, parsedPost, includeContent) {
  const frontMatter = parsedPost.data || {};
  const content = (parsedPost.content || '').trim();

  const normalized = {
    slug,
    title: frontMatter.title || slug,
    date: frontMatter.date || null,
    tags: getTags(frontMatter.tags),
    excerpt: getExcerpt(frontMatter, content),
    image: frontMatter.image || null,
    published: frontMatter.published !== false,
    readingTimeMinutes: getReadingTimeMinutes(content)
  };

  if (includeContent) {
    normalized.content = content;
  }

  return normalized;
}

async function readPostFile(fileName) {
  const slug = fileName.replace(/\.md$/i, '');
  const filePath = path.join(config.postsDirectoryPath, fileName);
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = matter(raw);

  return normalizePost(slug, parsed, true);
}

async function listPosts() {
  const fileNames = await fs.readdir(config.postsDirectoryPath);
  const markdownFiles = fileNames.filter((name) => name.toLowerCase().endsWith('.md'));

  const postList = await Promise.all(markdownFiles.map(readPostFile));

  return postList
    .filter((post) => post.published)
    .sort((left, right) => parseDateValue(right.date) - parseDateValue(left.date))
    .map(({ content, ...summary }) => summary);
}

async function findPostBySlug(slug) {
  const safeSlug = String(slug || '').trim();

  if (!safeSlug || /[\\/]/.test(safeSlug)) {
    return null;
  }

  const filePath = path.join(config.postsDirectoryPath, `${safeSlug}.md`);

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);
    const normalized = normalizePost(safeSlug, parsed, true);

    return normalized.published ? normalized : null;
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

module.exports = {
  listPosts,
  findPostBySlug
};
