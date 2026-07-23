import mongoose from 'mongoose';

// Enquiries captured from the "Explore the ecosystem" contact form.
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    organisation: { type: String, trim: true, maxlength: 160, default: '' },
    role: {
      type: String,
      enum: ['Athlete', 'Coach', 'Physiotherapist', 'Institution', 'Other'],
      default: 'Other',
    },
    message: { type: String, trim: true, maxlength: 2000, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
