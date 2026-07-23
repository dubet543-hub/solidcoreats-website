import { Router } from 'express';
import Lead from '../models/Lead.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, organisation, role, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const lead = await Lead.create({ name, email, organisation, role, message });
  res.status(201).json({
    message: 'Enquiry received. The SOLIDCORE team will reach out shortly.',
    lead: { id: lead._id, name: lead.name, email: lead.email, createdAt: lead.createdAt },
  });
});

router.get('/', async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(50).lean();
  res.json({ count: leads.length, leads });
});

export default router;
