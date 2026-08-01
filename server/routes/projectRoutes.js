const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', getProjects);
router.post('/', protectAdmin, createProject);

module.exports = router;
