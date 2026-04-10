const { Router } = require('express');

const asyncHandler = require('../middleware/async-handler');
const {
  listPosts,
  findPostBySlug
} = require('../repositories/db-post-repository');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const posts = await listPosts({
      includeDrafts: false,
      includeContent: false
    });

    res.json({
      success: true,
      data: posts
    });
  })
);

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const post = await findPostBySlug(req.params.slug, {
      includeDrafts: false,
      includeContent: true
    });

    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: post
    });
  })
);

module.exports = router;
