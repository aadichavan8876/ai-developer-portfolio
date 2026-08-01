const express = require('express');
const router = express.Router();
const { trackEvent, getAnalytics } = require('../controllers/analyticsController');

router.post('/track', trackEvent);
router.get('/', getAnalytics);

module.exports = router;
