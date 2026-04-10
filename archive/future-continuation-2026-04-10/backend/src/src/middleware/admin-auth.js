const { verifyAdminToken } = require('../services/admin-auth-service');

function requireAdminAuth(req, res, next) {
  const authorizationHeader = req.get('authorization') || '';

  if (!authorizationHeader.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Missing bearer token.'
    });
  }

  const token = authorizationHeader.slice(7).trim();
  const tokenPayload = verifyAdminToken(token);

  if (!tokenPayload) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired admin token.'
    });
  }

  req.admin = {
    username: tokenPayload.sub,
    role: tokenPayload.role
  };

  next();
}

module.exports = requireAdminAuth;