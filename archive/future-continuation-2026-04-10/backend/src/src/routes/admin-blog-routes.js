const { Router } = require('express');
const { z } = require('zod');

const asyncHandler = require('../middleware/async-handler');
const requireAdminAuth = require('../middleware/admin-auth');
const {
  listPosts,
  findPostBySlug,
  createPost,
  updatePostBySlug,
  deletePostBySlug
} = require('../repositories/db-post-repository');

const router = Router();

const optionalString = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : value),
  z.string().max(500).optional().nullable()
);

const tagsSchema = z.array(z.string().trim().min(1).max(60)).max(30);

const createPostSchema = z.object({
  slug: z.string().trim().min(3).max(180),
  title: z.string().trim().min(3).max(180),
  date: optionalString,
  tags: tagsSchema.optional(),
  excerpt: optionalString,
  image: optionalString,
  published: z.boolean().optional(),
  content: z.string().trim().min(10).max(120000)
});

const updatePostSchema = z
  .object({
    slug: z.string().trim().min(3).max(180).optional(),
    title: z.string().trim().min(3).max(180).optional(),
    date: optionalString,
    tags: tagsSchema.optional(),
    excerpt: optionalString,
    image: optionalString,
    published: z.boolean().optional(),
    content: z.string().trim().min(10).max(120000).optional()
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: 'At least one field must be provided for update.'
  });

router.use(requireAdminAuth);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const posts = await listPosts({
      includeDrafts: true,
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
      includeDrafts: true,
      includeContent: true
    });

    if (!post) {
      const error = new Error('Post not found.');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: post
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = createPostSchema.safeParse(req.body || {});

    if (!parsed.success) {
      const error = new Error('Invalid blog post payload.');
      error.statusCode = 400;
      error.details = parsed.error.issues;
      throw error;
    }

    const createdPost = await createPost(parsed.data);

    res.status(201).json({
      success: true,
      data: createdPost
    });
  })
);

router.put(
  '/:slug',
  asyncHandler(async (req, res) => {
    const parsed = updatePostSchema.safeParse(req.body || {});

    if (!parsed.success) {
      const error = new Error('Invalid blog post update payload.');
      error.statusCode = 400;
      error.details = parsed.error.issues;
      throw error;
    }

    const updatedPost = await updatePostBySlug(req.params.slug, parsed.data);

    if (!updatedPost) {
      const error = new Error('Post not found.');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: updatedPost
    });
  })
);

router.delete(
  '/:slug',
  asyncHandler(async (req, res) => {
    const deleted = await deletePostBySlug(req.params.slug);

    if (!deleted) {
      const error = new Error('Post not found.');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      message: 'Post deleted successfully.'
    });
  })
);

module.exports = router;