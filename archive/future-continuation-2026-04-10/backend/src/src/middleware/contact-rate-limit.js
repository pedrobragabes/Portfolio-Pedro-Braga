const rateLimit = require('express-rate-limit');

const config = require('../config/env');

const contactRateLimiter = rateLimit({
  windowMs: config.contactRateLimitWindowMs,
  max: config.contactRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many contact requests. Please try again later.'
  }
});

module.exports = contactRateLimiter;
