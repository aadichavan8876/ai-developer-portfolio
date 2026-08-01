const express = require('express');
const router = express.Router();
const { processAiRequest, getAiLogs } = require('../controllers/aiController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/process', processAiRequest);
router.post('/chat', (req, res, next) => {
  req.body.feature = 'chatbot';
  next();
}, processAiRequest);
router.post('/resume-analysis', (req, res, next) => {
  req.body.feature = 'resume_analyzer';
  next();
}, processAiRequest);
router.get('/logs', protectAdmin, getAiLogs);

module.exports = router;
