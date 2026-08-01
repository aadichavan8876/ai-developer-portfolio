const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  type: { type: String, enum: ['pageview', 'resume_download'], required: true },
  ip: { type: String },
  userAgent: { type: String },
  referrer: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);
