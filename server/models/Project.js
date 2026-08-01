const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  features: [{ type: String }],
  challenges: [{ type: String }],
  futureImprovements: [{ type: String }],
  githubUrl: { type: String },
  liveDemoUrl: { type: String },
  imageUrl: { type: String },
  architecture: { type: String },
  databaseDesign: { type: String },
  isFeatured: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
