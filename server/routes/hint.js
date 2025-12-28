const express = require('express');
const { getHint } = require('../controllers/hintController');

const router = express.Router();

// POST /api/hint - Get hint for assignment
router.post('/', getHint);

module.exports = router;