const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Languages', 'Backend', 'Frontend', 'Database', 'Fundamentals', 'Tools', 'Soft Skills']
  },
  proficiency: { type: Number, default: 85 }, // Percentage
  icon: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
