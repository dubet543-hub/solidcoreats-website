import { Router } from 'express';
import { dbState, getReadyStateLabel } from '../config/db.js';

const router = Router();

// The frontend polls this to render the live "MongoDB connected successfully" badge.
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    server: 'SOLIDCORE ATS API',
    database: {
      connected: dbState.connected,
      message: dbState.message,
      readyState: getReadyStateLabel(),
      host: dbState.host,
      name: dbState.name,
    },
    timestamp: new Date().toISOString(),
  });
});

export default router;
