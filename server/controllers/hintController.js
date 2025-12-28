const Assignment = require('../models/Assignment');
const sampleAssignments = require('../data/sampleAssignments');
const { generateHint } = require('../services/llmService');

const getHint = async (req, res) => {
  try {
    const { assignmentId, query } = req.body;

    if (!assignmentId || !query) {
      return res.status(400).json({ 
        message: 'Assignment ID and query are required' 
      });
    }

    // Fetch the assignment to get context
    let assignment;
    
    try {
      assignment = await Assignment.findById(assignmentId);
    } catch (mongoError) {
      console.log('Using in-memory assignment data for hint');
      assignment = sampleAssignments.find(a => a._id === assignmentId);
    }
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Generate hint using LLM service
    const hint = await generateHint(assignment, query);

    res.json({
      success: true,
      hint: hint
    });

  } catch (error) {
    console.error('Error generating hint:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid assignment ID' });
    }
    
    res.status(500).json({ 
      message: 'Failed to generate hint. Please try again.' 
    });
  }
};

module.exports = {
  getHint
};