const mongoose = require('mongoose');

const aiLogSchema = new mongoose.Schema({
  feature: { 
    type: String, 
    enum: ['chatbot', 'project_explainer', 'career_advisor', 'interview_simulator', 'resume_analyzer', 'code_generator'],
    required: true 
  },
  prompt: { type: String, required: true },
  response: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.AiLog || mongoose.model('AiLog', aiLogSchema);
