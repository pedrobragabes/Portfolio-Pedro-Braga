const { Router } = require('express');
const { z } = require('zod');

const asyncHandler = require('../middleware/async-handler');
const requireAdminAuth = require('../middleware/admin-auth');
const config = require('../config/env');
const {
  verifyAdminCredentials,
  createAdminToken
} = require('../services/admin-auth-service');

const router = Router();

const loginSchema = z.object({
  username: z.string().trim().min(1).max(120),
  password: z.string().min(1).max(300)
});

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body || {});

    if (!parsed.success) {
      const error = new Error('Invalid admin login payload.');
      error.statusCode = 400;
      error.details = parsed.error.issues;
      throw error;
    }

    const { username, password } = parsed.data;
    const isValid = verifyAdminCredentials(username, password);

    if (!isValid) {
      const error = new Error('Invalid admin credentials.');
      error.statusCode = 401;
      throw error;
    }

    const token = createAdminToken();

    res.json({
      success: true,
      data: {
        token,
        tokenType: 'Bearer',
        expiresIn: config.adminTokenTtlSeconds,
        username: config.adminUsername
      }
    });
  })
);

router.get('/me', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    data: {
      username: req.admin.username,
      role: req.admin.role
    }
  });
});

module.exports = router;