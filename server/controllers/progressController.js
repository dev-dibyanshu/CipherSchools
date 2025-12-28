const Progress = require('../models/Progress');
const Assignment = require('../models/Assignment');

const saveProgress = async (req, res) => {
  try {
    const { assignmentId, query, result, isCorrect } = req.body;

    if (!assignmentId || !query) {
      return res.status(400).json({ 
        message: 'Assignment ID and query are required' 
      });
    }

    // Verify assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Find existing progress or create new
    let progress = await Progress.findOne({ 
      assignmentId, 
      userId: 'anonymous' // For now, using anonymous user
    });

    if (progress) {
      // Update existing progress
      progress.query = query;
      progress.result = result;
      progress.attempts += 1;
      
      if (isCorrect && !progress.completedAt) {
        progress.isCorrect = true;
        progress.completedAt = new Date();
      }
    } else {
      // Create new progress
      progress = new Progress({
        assignmentId,
        userId: 'anonymous',
        query,
        result,
        isCorrect: isCorrect || false,
        completedAt: isCorrect ? new Date() : undefined
      });
    }

    await progress.save();

    res.json({
      success: true,
      progress: {
        attempts: progress.attempts,
        isCorrect: progress.isCorrect,
        completedAt: progress.completedAt
      }
    });

  } catch (error) {
    console.error('Error saving progress:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid assignment ID' });
    }
    
    res.status(500).json({ 
      message: 'Failed to save progress' 
    });
  }
};

const getProgress = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const progress = await Progress.findOne({ 
      assignmentId, 
      userId: 'anonymous' 
    });

    if (!progress) {
      return res.json({
        success: true,
        progress: {
          attempts: 0,
          isCorrect: false,
          completedAt: null
        }
      });
    }

    res.json({
      success: true,
      progress: {
        attempts: progress.attempts,
        isCorrect: progress.isCorrect,
        completedAt: progress.completedAt,
        lastQuery: progress.query
      }
    });

  } catch (error) {
    console.error('Error fetching progress:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid assignment ID' });
    }
    
    res.status(500).json({ 
      message: 'Failed to fetch progress' 
    });
  }
};

module.exports = {
  saveProgress,
  getProgress
};