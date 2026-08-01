const { callAI } = require('../services/aiService');
const AiLog = require('../models/AiLog');

const processAiRequest = async (req, res) => {
  try {
    const { feature, prompt, contextData } = req.body;
    if (!feature || !prompt) {
      return res.status(400).json({ success: false, message: 'Feature name and prompt are required.' });
    }

    const aiResult = await callAI(feature, prompt, contextData || {});

    try {
      await AiLog.create({ feature, prompt, response: typeof aiResult === 'string' ? aiResult : JSON.stringify(aiResult) });
    } catch (e) {
      // Ignored if DB is disconnected
    }

    res.json({
      success: true,
      feature,
      result: aiResult
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAiLogs = async (req, res) => {
  try {
    const logs = await AiLog.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: logs });
  } catch (error) {
    res.json({ success: true, data: [] });
  }
};

module.exports = { processAiRequest, getAiLogs };
