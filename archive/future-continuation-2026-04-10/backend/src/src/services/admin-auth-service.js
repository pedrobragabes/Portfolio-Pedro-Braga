const crypto = require('crypto');

const config = require('../config/env');

const TOKEN_HEADER = {
  alg: 'HS256',
  typ: 'JWT'
};

function base64urlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function secureCompare(left, right) {
  const leftBuffer = Buffer.from(String(left || ''), 'utf8');
  const rightBuffer = Buffer.from(String(right || ''), 'utf8');

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function verifyScryptPassword(password, storedHash) {
  const segments = String(storedHash || '').split('$');

  if (segments.length !== 3 || segments[0] !== 'scrypt') {
    return false;
  }

  const salt = segments[1];
  const expectedHash = Buffer.from(segments[2], 'hex');

  if (!salt || expectedHash.length === 0) {
    return false;
  }

  const derived = crypto.scryptSync(password, salt, expectedHash.length);
  return crypto.timingSafeEqual(derived, expectedHash);
}

function verifyAdminPassword(password) {
  if (config.adminPasswordHash) {
    return verifyScryptPassword(password, config.adminPasswordHash);
  }

  if (config.adminPassword) {
    return secureCompare(password, config.adminPassword);
  }

  const error = new Error('Admin authentication is not configured. Set ADMIN_PASSWORD or ADMIN_PASSWORD_HASH.');
  error.statusCode = 500;
  throw error;
}

function verifyAdminCredentials(username, password) {
  const normalizedUsername = String(username || '').trim();

  if (!secureCompare(normalizedUsername, config.adminUsername)) {
    return false;
  }

  return verifyAdminPassword(String(password || ''));
}

function signTokenPayload(payload) {
  const headerSegment = base64urlEncode(JSON.stringify(TOKEN_HEADER));
  const payloadSegment = base64urlEncode(JSON.stringify(payload));
  const signatureSegment = crypto
    .createHmac('sha256', config.adminTokenSecret)
    .update(`${headerSegment}.${payloadSegment}`)
    .digest('base64url');

  return `${headerSegment}.${payloadSegment}.${signatureSegment}`;
}

function createAdminToken() {
  const nowSeconds = Math.floor(Date.now() / 1000);

  return signTokenPayload({
    sub: config.adminUsername,
    role: 'admin',
    iat: nowSeconds,
    exp: nowSeconds + config.adminTokenTtlSeconds
  });
}

function decodeJsonSegment(segment) {
  try {
    const decoded = Buffer.from(segment, 'base64url').toString('utf8');
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
}

function verifyAdminToken(token) {
  if (typeof token !== 'string') {
    return null;
  }

  const segments = token.split('.');

  if (segments.length !== 3) {
    return null;
  }

  const [headerSegment, payloadSegment, signatureSegment] = segments;
  const expectedSignature = crypto
    .createHmac('sha256', config.adminTokenSecret)
    .update(`${headerSegment}.${payloadSegment}`)
    .digest('base64url');

  if (!secureCompare(signatureSegment, expectedSignature)) {
    return null;
  }

  const header = decodeJsonSegment(headerSegment);
  const payload = decodeJsonSegment(payloadSegment);

  if (!header || !payload || header.alg !== 'HS256' || header.typ !== 'JWT') {
    return null;
  }

  if (payload.role !== 'admin' || typeof payload.sub !== 'string') {
    return null;
  }

  const nowSeconds = Math.floor(Date.now() / 1000);

  if (!Number.isFinite(payload.exp) || payload.exp <= nowSeconds) {
    return null;
  }

  return payload;
}

module.exports = {
  verifyAdminCredentials,
  createAdminToken,
  verifyAdminToken
};