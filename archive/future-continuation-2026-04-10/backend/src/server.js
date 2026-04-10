const app = require('./app');
const config = require('./config/env');
const { initializeBlogDatabase } = require('./database/blog-database');

let databaseBootstrap = null;

try {
  databaseBootstrap = initializeBlogDatabase();
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('[api] failed to initialize blog database', error);
  process.exit(1);
}

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on http://localhost:${config.port}`);

  if (databaseBootstrap) {
    // eslint-disable-next-line no-console
    console.log(`[api] blog database: ${databaseBootstrap.path}`);

    if (databaseBootstrap.seededPosts > 0) {
      // eslint-disable-next-line no-console
      console.log(`[api] seeded ${databaseBootstrap.seededPosts} post(s) from Markdown`);
    }
  }
});
