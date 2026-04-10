const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config/env');
const apiRoutes = require('./routes/api');
const { notFoundHandler, errorHandler } = require('./middleware/error-handler');

const app = express();

const allowedOrigins = new Set(config.corsOrigins);
const allowAllOrigins = allowedOrigins.has('*');

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowAllOrigins || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
  })
);

app.use(express.json({ limit: '120kb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    service: 'portfolio-api',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', apiRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
