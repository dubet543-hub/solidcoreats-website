import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectDB } from './config/db.js';
import healthRoutes from './routes/health.js';
import featureRoutes from './routes/features.js';
import leadRoutes from './routes/leads.js';

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solidcore_ats';

// Accept any loopback/LAN origin in dev — the site is reachable as localhost,
// 127.0.0.1 or a machine IP, and hardcoding one spelling breaks the others.
const allowList = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true); // curl / same-origin
      if (allowList.includes(origin)) return cb(null, true);
      if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\]|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(:\d+)?$/.test(origin)) {
        return cb(null, true);
      }
      return cb(new Error(`Origin not allowed: ${origin}`));
    },
  })
);
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/leads', leadRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Express 5 forwards async rejections here, so route handlers stay try/catch-free.
app.use((err, req, res, next) => {
  console.error('❌ Request failed:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

async function start() {
  try {
    await connectDB(MONGO_URI);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('   Is mongod running? Try: mongod --dbpath /Users/apple/data/db');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 SOLIDCORE ATS API listening on http://localhost:${PORT}`);
  });
}

start();
