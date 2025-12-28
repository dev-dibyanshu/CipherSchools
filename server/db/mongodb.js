const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // For demo purposes, we'll create a simple fallback if MongoDB is not available
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost')) {
      console.log('📦 MongoDB not configured, using in-memory storage for demo');
      return;
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 2000, // Timeout after 2s instead of 30s
      connectTimeoutMS: 2000, // Give up initial connection after 2s
      socketTimeoutMS: 2000, // Close sockets after 2s of inactivity
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('📦 Continuing with in-memory storage for demo');
  }
};

module.exports = connectDB;