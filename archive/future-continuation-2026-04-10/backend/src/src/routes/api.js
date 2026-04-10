const { Router } = require('express');

const contactRoutes = require('./contact-routes');
const projectRoutes = require('./project-routes');
const postRoutes = require('./post-routes');
const adminAuthRoutes = require('./admin-auth-routes');
const adminBlogRoutes = require('./admin-blog-routes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'portfolio-api',
    timestamp: new Date().toISOString()
  });
});

router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);
router.use('/blog/posts', postRoutes);
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/blog/posts', adminBlogRoutes);

module.exports = router;
