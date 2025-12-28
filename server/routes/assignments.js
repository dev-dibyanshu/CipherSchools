const express = require('express');
const { getAllAssignments, getAssignmentById } = require('../controllers/assignmentController');

const router = express.Router();

// GET /api/assignments - Get all assignments
router.get('/', getAllAssignments);

// GET /api/assignments/:id - Get specific assignment
router.get('/:id', getAssignmentById);

module.exports = router;