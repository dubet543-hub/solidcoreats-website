import { Router } from 'express';
import Feature from '../models/Feature.js';

const router = Router();

router.get('/', async (req, res) => {
  const filter = req.query.category ? { category: req.query.category } : {};
  const features = await Feature.find(filter).sort({ category: 1, order: 1 }).lean();
  res.json({ count: features.length, features });
});

export default router;
