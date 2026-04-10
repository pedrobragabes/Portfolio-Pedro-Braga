const { Router } = require('express');

const asyncHandler = require('../middleware/async-handler');
const {
  listProjects,
  findProjectById
} = require('../repositories/file-project-repository');

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const projects = await listProjects();

    res.json({
      success: true,
      data: projects
    });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const project = await findProjectById(req.params.id);

    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: project
    });
  })
);

module.exports = router;
