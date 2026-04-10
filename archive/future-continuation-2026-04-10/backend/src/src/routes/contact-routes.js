const { Router } = require('express');
const { z } = require('zod');

const asyncHandler = require('../middleware/async-handler');
const contactRateLimiter = require('../middleware/contact-rate-limit');
const { persistContactMessage } = require('../services/contact-service');

const router = Router();

function normalizeOptionalString(value) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = value.trim();
  return normalized === '' ? undefined : normalized;
}

const contactPayloadSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    message: z.string().trim().min(10).max(4000),
    service_type: z.preprocess(normalizeOptionalString, z.string().max(120).optional()),
    budget: z.preprocess(normalizeOptionalString, z.string().max(120).optional()),
    _subject: z.preprocess(normalizeOptionalString, z.string().max(200).optional()),
    _replyto: z.preprocess(normalizeOptionalString, z.string().email().max(254).optional()),
    _honey: z.preprocess((value) => (typeof value === 'string' ? value : ''), z.string().max(250)),
    honeypot: z.preprocess((value) => (typeof value === 'string' ? value : ''), z.string().max(250)),
    website: z.preprocess((value) => (typeof value === 'string' ? value : ''), z.string().max(250))
  })
  .passthrough();

router.post(
  '/',
  contactRateLimiter,
  asyncHandler(async (req, res) => {
    const parsed = contactPayloadSchema.safeParse(req.body || {});

    if (!parsed.success) {
      const error = new Error('Invalid contact payload');
      error.statusCode = 400;
      error.details = parsed.error.issues;
      throw error;
    }

    const payload = parsed.data;

    const honeypotValue = [payload._honey, payload.honeypot, payload.website]
      .find((value) => typeof value === 'string' && value.trim() !== '');

    // Return success for bots so they stop retrying.
    if (honeypotValue) {
      return res.status(202).json({
        success: true,
        message: 'Message received.'
      });
    }

    await persistContactMessage(payload, {
      ip: req.ip,
      userAgent: req.get('user-agent'),
      referer: req.get('referer')
    });

    return res.status(201).json({
      success: true,
      message: 'Message received.'
    });
  })
);

module.exports = router;
