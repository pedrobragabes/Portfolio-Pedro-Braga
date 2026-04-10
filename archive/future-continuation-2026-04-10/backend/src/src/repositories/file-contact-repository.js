const fs = require('fs/promises');
const path = require('path');

const config = require('../config/env');

async function saveContactSubmission(submission) {
  const outputPath = config.contactStoragePath;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.appendFile(outputPath, `${JSON.stringify(submission)}\n`, 'utf8');

  return submission;
}

module.exports = {
  saveContactSubmission
};
