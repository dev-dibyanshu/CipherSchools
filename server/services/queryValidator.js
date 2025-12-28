const Joi = require('joi');

// List of dangerous SQL keywords that should be blocked
const DANGEROUS_KEYWORDS = [
  'DROP', 'DELETE', 'INSERT', 'UPDATE', 'ALTER', 'CREATE', 'TRUNCATE',
  'GRANT', 'REVOKE', 'EXEC', 'EXECUTE', 'CALL', 'MERGE', 'REPLACE',
  'LOAD', 'OUTFILE', 'DUMPFILE', 'BACKUP', 'RESTORE'
];

// List of allowed SQL keywords for read-only operations
const ALLOWED_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL',
  'ON', 'GROUP', 'BY', 'HAVING', 'ORDER', 'LIMIT', 'OFFSET', 'UNION',
  'INTERSECT', 'EXCEPT', 'AS', 'DISTINCT', 'ALL', 'EXISTS', 'IN',
  'BETWEEN', 'LIKE', 'IS', 'NULL', 'AND', 'OR', 'NOT', 'CASE', 'WHEN',
  'THEN', 'ELSE', 'END', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE',
  'CAST', 'EXTRACT', 'SUBSTRING', 'UPPER', 'LOWER', 'TRIM', 'LENGTH',
  'WITH', 'RECURSIVE'
];

const validateQuery = (query) => {
  try {
    // Basic validation schema
    const schema = Joi.string()
      .min(1)
      .max(5000)
      .required()
      .messages({
        'string.max': 'Query is too long (maximum 5000 characters)',
        'string.min': 'Query cannot be empty'
      });

    const { error } = schema.validate(query);
    if (error) {
      return {
        isValid: false,
        error: error.details[0].message
      };
    }

    // Clean the query for analysis
    const cleanQuery = query
      .replace(/--.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Convert to uppercase for keyword checking
    const upperQuery = cleanQuery.toUpperCase();

    // Check for dangerous keywords first
    for (const keyword of DANGEROUS_KEYWORDS) {
      // Use word boundaries to avoid false positives
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(upperQuery)) {
        return {
          isValid: false,
          error: `Dangerous operation detected: ${keyword}. Only SELECT queries are allowed.`
        };
      }
    }

    // Check if query starts with SELECT or WITH (for CTEs)
    const trimmedQuery = upperQuery.trim();
    if (!trimmedQuery.startsWith('SELECT') && !trimmedQuery.startsWith('WITH')) {
      return {
        isValid: false,
        error: 'Only SELECT queries and CTEs (WITH) are allowed'
      };
    }

    // Check for multiple statements (basic check for SQL injection)
    const statements = cleanQuery.split(';').filter(stmt => stmt.trim().length > 0);
    if (statements.length > 1) {
      return {
        isValid: false,
        error: 'Multiple statements are not allowed'
      };
    }

    // Additional safety checks
    if (upperQuery.includes('INTO OUTFILE') || upperQuery.includes('INTO DUMPFILE')) {
      return {
        isValid: false,
        error: 'File operations are not allowed'
      };
    }

    return {
      isValid: true,
      error: null
    };

  } catch (error) {
    return {
      isValid: false,
      error: 'Query validation failed'
    };
  }
};

const sanitizeQuery = (query) => {
  // Basic sanitization - remove dangerous characters and normalize
  let sanitized = query
    .trim()
    // Remove null bytes and other control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalize quotes (but don't escape them as we're not using string concatenation)
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"');

  // Ensure it ends with semicolon for proper execution
  if (!sanitized.endsWith(';')) {
    sanitized += ';';
  }

  return sanitized;
};

const isReadOnlyQuery = (query) => {
  const upperQuery = query.toUpperCase().trim();
  
  // Must start with SELECT or WITH (for CTEs)
  if (!upperQuery.startsWith('SELECT') && !upperQuery.startsWith('WITH')) {
    return false;
  }

  // Check that no dangerous keywords are present
  for (const keyword of DANGEROUS_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(upperQuery)) {
      return false;
    }
  }

  return true;
};

module.exports = {
  validateQuery,
  sanitizeQuery,
  isReadOnlyQuery,
  DANGEROUS_KEYWORDS,
  ALLOWED_KEYWORDS
};