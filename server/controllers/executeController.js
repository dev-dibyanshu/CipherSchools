const { getPool } = require('../db/postgresql');
const { sanitizeQuery, validateQuery } = require('../services/queryValidator');
const OutputValidator = require('../services/outputValidator');
const Assignment = require('../models/Assignment');

const executeQuery = async (req, res) => {
  const pool = getPool();
  let client;

  try {
    const { query, assignmentId } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query is required and must be a string' });
    }

    // Validate and sanitize the query
    const validation = validateQuery(query);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.error });
    }

    const sanitizedQuery = sanitizeQuery(query);

    // Get a client from the pool
    client = await pool.connect();

    // Set a statement timeout to prevent long-running queries
    await client.query('SET statement_timeout = 30000'); // 30 seconds

    // Execute the query within a transaction for safety
    await client.query('BEGIN');
    
    try {
      const result = await client.query(sanitizedQuery);
      
      // Rollback the transaction to prevent any data modifications
      await client.query('ROLLBACK');
      
      // Prepare basic response
      const response = {
        success: true,
        result: result.rows,
        rowCount: result.rowCount,
        executionTime: Date.now()
      };

      // If assignmentId is provided, validate output against expected results
      if (assignmentId) {
        try {
          // Try to fetch assignment from MongoDB first
          let assignment = null;
          
          try {
            assignment = await Assignment.findById(assignmentId);
          } catch (mongoError) {
            // If MongoDB fails (like ObjectId format issues), fall back to in-memory data
            console.log('MongoDB lookup failed, using in-memory data for validation');
            const sampleAssignments = require('../data/sampleAssignments');
            assignment = sampleAssignments.find(a => a._id === assignmentId);
          }
          
          if (assignment) {
            const validator = new OutputValidator();
            const validationResults = validator.validateOutput(result.rows, assignment, query);
            
            // Add validation results to response
            response.validation = validationResults;
          }
        } catch (validationError) {
          console.error('Validation error:', validationError);
          // Don't fail the entire request if validation fails
          response.validation = {
            isCorrect: false,
            feedback: 'Unable to validate query results',
            error: 'Validation service unavailable'
          };
        }
      }
      
      // Return the results with optional validation
      res.json(response);
      
    } catch (queryError) {
      // Rollback on error
      await client.query('ROLLBACK');
      throw queryError;
    }

  } catch (error) {
    console.error('Query execution error:', error);
    
    let errorMessage = 'Query execution failed';
    
    // Handle specific PostgreSQL errors
    if (error.code) {
      switch (error.code) {
        case '42601': // Syntax error
          errorMessage = 'SQL syntax error: ' + error.message;
          break;
        case '42703': // Undefined column
          errorMessage = 'Column not found: ' + error.message;
          break;
        case '42P01': // Undefined table
          errorMessage = 'Table not found: ' + error.message;
          break;
        case '42883': // Undefined function
          errorMessage = 'Function not found: ' + error.message;
          break;
        case '23505': // Unique violation
          errorMessage = 'Unique constraint violation: ' + error.message;
          break;
        case '23503': // Foreign key violation
          errorMessage = 'Foreign key constraint violation: ' + error.message;
          break;
        case '57014': // Query canceled (timeout)
          errorMessage = 'Query timeout - execution took too long';
          break;
        default:
          errorMessage = error.message || 'Database error occurred';
      }
    }

    res.status(400).json({
      success: false,
      message: errorMessage,
      code: error.code
    });

  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
};

module.exports = {
  executeQuery
};