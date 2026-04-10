const fs = require('fs/promises');

const config = require('../config/env');

async function readProjects() {
  const raw = await fs.readFile(config.projectsFilePath, 'utf8');
  const payload = JSON.parse(raw);

  return Array.isArray(payload.projects) ? payload.projects : [];
}

async function listProjects() {
  return readProjects();
}

async function findProjectById(projectId) {
  const projects = await readProjects();
  return projects.find((project) => project && project.id === projectId) || null;
}

module.exports = {
  listProjects,
  findProjectById
};
