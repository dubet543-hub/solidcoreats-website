import mongoose from 'mongoose';

// Platform capabilities rendered on the site, sourced from the ATS factsheet.
const featureSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['pillar', 'capability', 'ecosystem', 'value'],
      default: 'capability',
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Feature', featureSchema);
