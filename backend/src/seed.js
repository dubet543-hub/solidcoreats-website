import 'dotenv/config';
import mongoose from 'mongoose';

import { connectDB } from './config/db.js';
import Feature from './models/Feature.js';

// Content lifted from the SOLIDCORE ATS factsheet.
const features = [
  {
    key: 'science-backed-training',
    title: 'Science Backed Training',
    description: 'Tailored protocols for sports performance, grounded in evidence based physical preparation.',
    category: 'pillar',
    order: 1,
  },
  {
    key: 'injury-prevention',
    title: 'Injury Prevention',
    description: 'Proactive load management to eliminate preventable fatigue and overuse injuries.',
    category: 'pillar',
    order: 2,
  },
  {
    key: 'real-time-analytics',
    title: 'Real-Time Analytics',
    description: 'Instant insight into athlete readiness and recovery status.',
    category: 'pillar',
    order: 3,
  },
  {
    key: 'workload-acwr',
    title: 'Daily Workload & ACWR Tracking',
    description:
      'Automatically monitors daily session RPE, duration, and Acute:Chronic Workload Ratios to mitigate overuse injury risks.',
    category: 'capability',
    order: 1,
  },
  {
    key: 'wellness-audits',
    title: 'Comprehensive Wellness Audits',
    description:
      'Tracks sleep quality, fatigue, muscle soreness, stress levels, and readiness via intuitive daily check-ins.',
    category: 'capability',
    order: 2,
  },
  {
    key: 'load-adjustments',
    title: 'Data-Driven Load Adjustments',
    description:
      'Enables coaches and physiotherapists to adapt training volumes dynamically based on objective athlete feedback.',
    category: 'capability',
    order: 3,
  },
  {
    key: 'cross-platform',
    title: 'Cross-Platform Accessibility',
    description: 'Seamlessly integrated across iOS and Android platforms for real-time user experience.',
    category: 'capability',
    order: 4,
  },
  {
    key: 'skill-specific-load',
    title: 'Skill-Specific Load Monitoring',
    description:
      'Tracks cricket-specific metrics — bowling, batting and fielding duration — separately from general strength and conditioning.',
    category: 'capability',
    order: 5,
  },
  {
    key: 'skill-vs-physical',
    title: 'Separation of Skill vs. Physical Fatigue',
    description:
      'Captures daily athlete input across training and skill sessions to calculate total workload while segregating physical conditioning from technical practice loads.',
    category: 'capability',
    order: 6,
  },
  {
    key: 'accountability',
    title: 'Data-Driven Accountability',
    description:
      'Resolves debate between coaches and support staff by identifying injury root causes on the dashboard and pinpointing whether overreaching occurred in physical training or technical skill volume.',
    category: 'capability',
    order: 7,
  },
  {
    key: 'athlete-app',
    title: 'Athlete App (Mobile)',
    description: 'Daily self-reporting built for athletes — logs sessions, wellness and readiness in seconds.',
    category: 'ecosystem',
    order: 1,
  },
  {
    key: 'admin-dashboard',
    title: 'Admin Dashboard (Web)',
    description: 'Full squad oversight for the promoter, head coach and support staff.',
    category: 'ecosystem',
    order: 2,
  },
  {
    key: 'data-export',
    title: 'Data Integration & Export',
    description: 'Instant PDF/CSV exports for team management, medical staff, and head coaches.',
    category: 'ecosystem',
    order: 3,
  },
  {
    key: 'reduced-injuries',
    title: 'Reduced Time-Loss Injuries',
    description: 'Proactive load adjustments lower muscle strain and stress fracture risks.',
    category: 'value',
    order: 1,
  },
  {
    key: 'performance-peak',
    title: 'Data-Backed Performance Peak',
    description: 'Timely tapering and volume management for match days and competitions.',
    category: 'value',
    order: 2,
  },
];

async function seed() {
  await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solidcore_ats');

  for (const feature of features) {
    await Feature.updateOne({ key: feature.key }, { $set: feature }, { upsert: true });
  }

  const total = await Feature.countDocuments();
  console.log(`🌱 Seeded ${features.length} features (${total} total in collection).`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
