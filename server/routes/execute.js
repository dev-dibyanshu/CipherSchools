const express = require('express');
const { executeQuery } = require('../controllers/executeController');

const router = express.Router();

// POST /api/execute - Execute SQL query
router.post('/', executeQuery);

module.exports = router;