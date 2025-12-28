const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateHint = async (assignment, userQuery) => {
  try {
    // Construct the prompt for the LLM
    const prompt = `
You are a SQL learning assistant. A student is working on a SQL assignment and needs a helpful hint.

ASSIGNMENT DETAILS:
Title: ${assignment.title}
Difficulty: ${assignment.difficulty}
Question: ${assignment.question}
Requirements: ${assignment.requirements ? assignment.requirements.join(', ') : 'None specified'}

TABLE STRUCTURE:
${assignment.tableStructure.map(table => 
  `Table: ${table.tableName}
  Columns: ${table.columns.map(col => `${col.name} (${col.type})`).join(', ')}`
).join('\n')}

STUDENT'S CURRENT QUERY:
${userQuery}

INSTRUCTIONS:
- Provide a helpful hint that guides the student toward the solution
- DO NOT provide the complete SQL solution
- Focus on concepts, approach, or specific SQL techniques they should consider
- If their query has syntax errors, point them out gently
- If they're on the right track, encourage them and suggest the next step
- Keep the hint concise but informative
- Be supportive and educational

Provide only the hint text, no additional formatting or explanations.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful SQL tutor who provides hints and guidance without giving away complete solutions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const hint = response.choices[0]?.message?.content?.trim();
    
    if (!hint) {
      throw new Error('No hint generated');
    }

    return hint;

  } catch (error) {
    console.error('LLM service error:', error);
    
    // Fallback hints based on common patterns
    return generateFallbackHint(assignment, userQuery);
  }
};

const generateFallbackHint = (assignment, userQuery) => {
  const upperQuery = userQuery.toUpperCase();
  
  // Basic fallback hints based on query analysis
  if (!upperQuery.includes('SELECT')) {
    return "Start your query with SELECT to specify which columns you want to retrieve.";
  }
  
  if (!upperQuery.includes('FROM')) {
    return "Don't forget to specify which table(s) you're selecting data FROM.";
  }
  
  if (assignment.difficulty === 'Easy' && !upperQuery.includes('WHERE')) {
    return "Consider using a WHERE clause to filter your results based on the requirements.";
  }
  
  if (assignment.difficulty === 'Medium' && !upperQuery.includes('JOIN')) {
    return "This assignment might require joining multiple tables. Look at the relationships between tables.";
  }
  
  if (assignment.difficulty === 'Hard' && !upperQuery.includes('GROUP BY')) {
    return "For complex queries, you might need to group your results and use aggregate functions like COUNT, SUM, or AVG.";
  }
  
  // Check for common SQL functions based on assignment requirements
  const requirements = assignment.requirements ? assignment.requirements.join(' ').toLowerCase() : '';
  
  if (requirements.includes('count') && !upperQuery.includes('COUNT')) {
    return "Try using the COUNT() function to count rows or specific values.";
  }
  
  if (requirements.includes('average') && !upperQuery.includes('AVG')) {
    return "Consider using the AVG() function to calculate averages.";
  }
  
  if (requirements.includes('maximum') && !upperQuery.includes('MAX')) {
    return "The MAX() function can help you find the highest value in a column.";
  }
  
  if (requirements.includes('minimum') && !upperQuery.includes('MIN')) {
    return "The MIN() function can help you find the lowest value in a column.";
  }
  
  // Default encouraging hint
  return "You're on the right track! Review the assignment requirements and think about what SQL clauses and functions might help you achieve the desired result.";
};

module.exports = {
  generateHint
};