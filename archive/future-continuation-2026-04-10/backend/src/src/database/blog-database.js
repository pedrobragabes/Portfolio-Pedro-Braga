const fs = require('fs');
const path = require('path');

const matter = require('gray-matter');
const Database = require('better-sqlite3');

const config = require('../config/env');

let databaseInstance = null;
let hasSeededFromMarkdown = false;

function normalizeOptionalString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized === '' ? null : normalized;
}

function normalizeDateValue(dateValue) {
  if (dateValue instanceof Date && !Number.isNaN(dateValue.getTime())) {
    return dateValue.toISOString().slice(0, 10);
  }

  return normalizeOptionalString(dateValue);
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

function getExcerpt(frontMatter, content) {
  if (typeof frontMatter.excerpt === 'string' && frontMatter.excerpt.trim() !== '') {
    return frontMatter.excerpt.trim();
  }

  const normalized = String(content || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (normalized.length <= 180) {
    return normalized;
  }

  return `${normalized.slice(0, 177)}...`;
}

function initializeSchema(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      date TEXT,
      tags_json TEXT NOT NULL DEFAULT '[]',
      excerpt TEXT NOT NULL DEFAULT '',
      image TEXT,
      published INTEGER NOT NULL DEFAULT 0,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date
      ON blog_posts (published, date DESC, updated_at DESC);
  `);
}

function seedFromMarkdown(database) {
  if (hasSeededFromMarkdown) {
    return 0;
  }

  hasSeededFromMarkdown = true;

  const totalPosts = database.prepare('SELECT COUNT(1) AS total FROM blog_posts').get().total;

  if (totalPosts > 0 || !fs.existsSync(config.postsDirectoryPath)) {
    return 0;
  }

  const markdownFiles = fs
    .readdirSync(config.postsDirectoryPath)
    .filter((fileName) => fileName.toLowerCase().endsWith('.md'));

  if (markdownFiles.length === 0) {
    return 0;
  }

  const nowIso = new Date().toISOString();
  const insertStatement = database.prepare(`
    INSERT OR IGNORE INTO blog_posts (
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
  `);

  const records = markdownFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/i, '').trim();
    const filePath = path.join(config.postsDirectoryPath, fileName);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(rawContent);

    return {
      slug,
      title: normalizeOptionalString(parsed.data.title) || slug,
      date: normalizeDateValue(parsed.data.date),
      tagsJson: JSON.stringify(normalizeTags(parsed.data.tags)),
      excerpt: getExcerpt(parsed.data, parsed.content),
      image: normalizeOptionalString(parsed.data.image),
      published: parsed.data.published === false ? 0 : 1,
      content: String(parsed.content || '').trim(),
      createdAt: nowIso,
      updatedAt: nowIso
    };
  });

  const insertAll = database.transaction((rows) => {
    rows.forEach((row) => {
      insertStatement.run(row);
    });
  });

  insertAll(records);
  return records.length;
}

function openDatabase() {
  if (databaseInstance) {
    return databaseInstance;
  }

  fs.mkdirSync(path.dirname(config.blogDatabasePath), { recursive: true });

  const database = new Database(config.blogDatabasePath);
  database.pragma('journal_mode = WAL');

  initializeSchema(database);
  databaseInstance = database;

  return databaseInstance;
}

function initializeBlogDatabase() {
  const database = openDatabase();
  const seededPosts = seedFromMarkdown(database);

  return {
    path: config.blogDatabasePath,
    seededPosts
  };
}

function getBlogDatabase() {
  return openDatabase();
}

module.exports = {
  initializeBlogDatabase,
  getBlogDatabase
};