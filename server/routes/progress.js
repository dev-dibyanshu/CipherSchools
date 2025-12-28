const express = require('express');
const { saveProgress, getProgress } = require('../controllers/progressController');

const router = express.Router();

// POST /api/save-progress - Save user progress
router.post('/', saveProgress);

// GET /api/save-progress/:assignmentId - Get user progress for assignment
router.get('/:assignmentId', getProgress);

module.exports = router;