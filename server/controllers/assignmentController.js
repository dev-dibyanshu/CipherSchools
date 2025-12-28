const Assignment = require('../models/Assignment');
const sampleAssignments = require('../data/sampleAssignments');
const mongoose = require('mongoose');

const getAllAssignments = async (req, res) => {
  try {
    // Check if MongoDB is connected, if not use in-memory data immediately
    if (mongoose.connection.readyState !== 1) {
      console.log('Using in-memory assignments data (MongoDB not connected)');
      const assignments = sampleAssignments.map(assignment => ({
        _id: assignment._id,
        title: assignment.title,
        difficulty: assignment.difficulty,
        description: assignment.description,
        createdAt: assignment.createdAt
      }));
      return res.json(assignments);
    }

    // Try MongoDB with a short timeout
    let assignments;
    
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('MongoDB timeout')), 1000)
      );
      
      const mongoPromise = Assignment.find({}, {
        title: 1,
        difficulty: 1,
        description: 1,
        createdAt: 1
      }).sort({ createdAt: -1 });

      assignments = await Promise.race([mongoPromise, timeoutPromise]);
    } catch (mongoError) {
      console.log('Using in-memory assignments data (MongoDB query failed)');
      assignments = sampleAssignments.map(assignment => ({
        _id: assignment._id,
        title: assignment.title,
        difficulty: assignment.difficulty,
        description: assignment.description,
        createdAt: assignment.createdAt
      }));
    }

    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Failed to fetch assignments' });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    let assignment;
    
    // Check if MongoDB is connected, if not use in-memory data immediately
    if (mongoose.connection.readyState !== 1) {
      console.log('Using in-memory assignment data (MongoDB not connected)');
      assignment = sampleAssignments.find(a => a._id === id);
    } else {
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('MongoDB timeout')), 1000)
        );
        
        const mongoPromise = Assignment.findById(id);
        assignment = await Promise.race([mongoPromise, timeoutPromise]);
      } catch (mongoError) {
        console.log('Using in-memory assignment data (MongoDB query failed)');
        assignment = sampleAssignments.find(a => a._id === id);
      }
    }
    
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid assignment ID' });
    }
    
    res.status(500).json({ message: 'Failed to fetch assignment' });
  }
};

module.exports = {
  getAllAssignments,
  getAssignmentById
};