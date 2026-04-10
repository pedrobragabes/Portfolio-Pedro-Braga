const crypto = require('crypto');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../../..');

const DEFAULT_CORS_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://pedrobragabes.com',
  'https://www.pedrobragabes.com'
];

function parseInteger(value, fallbackValue) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallbackValue;
}

function parseCorsOrigins(rawOrigins) {
  if (!rawOrigins || typeof rawOrigins !== 'string') {
    return DEFAULT_CORS_ORIGINS;
  }

  const parsedOrigins = rawOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return parsedOrigins.length > 0 ? parsedOrigins : DEFAULT_CORS_ORIGINS;
}

function parseOptionalString(value, fallbackValue = null) {
  if (typeof value !== 'string') {
    return fallbackValue;
  }

  const normalized = value.trim();
  return normalized === '' ? fallbackValue : normalized;
}

function buildDefaultAdminTokenSecret(adminPassword, adminPasswordHash) {
  const material = [
    adminPasswordHash || '',
    adminPassword || '',
    'portfolio-admin-token-secret'
  ].join(':');

  return crypto.createHash('sha256').update(material).digest('hex');
}

const adminPassword = parseOptionalString(process.env.ADMIN_PASSWORD);
const adminPasswordHash = parseOptionalString(process.env.ADMIN_PASSWORD_HASH);

const config = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: (process.env.NODE_ENV || 'development') === 'production',
  port: parseInteger(process.env.API_PORT || process.env.PORT, 8787),
  corsOrigins: parseCorsOrigins(process.env.API_CORS_ORIGINS),
  contactStoragePath: process.env.CONTACT_STORAGE_PATH
    || path.join(ROOT_DIR, 'backend', 'storage', 'contact-submissions.jsonl'),
  contactRateLimitMax: parseInteger(process.env.CONTACT_RATE_LIMIT_MAX, 10),
  contactRateLimitWindowMs: parseInteger(
    process.env.CONTACT_RATE_LIMIT_WINDOW_MS,
    15 * 60 * 1000
  ),
  adminUsername: parseOptionalString(process.env.ADMIN_USERNAME, 'admin'),
  adminPassword,
  adminPasswordHash,
  adminTokenSecret: parseOptionalString(
    process.env.ADMIN_TOKEN_SECRET,
    buildDefaultAdminTokenSecret(adminPassword, adminPasswordHash)
  ),
  adminTokenTtlSeconds: parseInteger(process.env.ADMIN_TOKEN_TTL_SECONDS, 8 * 60 * 60),
  blogDatabasePath: parseOptionalString(
    process.env.BLOG_DATABASE_PATH,
    path.join(ROOT_DIR, 'backend', 'storage', 'blog-posts.db')
  ),
  projectsFilePath: path.join(ROOT_DIR, 'data', 'projects.json'),
  postsDirectoryPath: path.join(ROOT_DIR, 'blog', 'posts')
});

module.exports = config;
