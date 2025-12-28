const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  userId: {
    type: String,
    default: 'anonymous' // For now, we'll use anonymous users
  },
  query: {
    type: String,
    required: true
  },
  result: mongoose.Schema.Types.Mixed,
  isCorrect: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 1
  },
  hintsUsed: {
    type: Number,
    default: 0
  },
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

progressSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Progress', progressSchema);