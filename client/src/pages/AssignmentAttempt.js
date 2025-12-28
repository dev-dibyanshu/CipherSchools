import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { fetchAssignment, executeQuery, getHint } from '../utils/api';

const QuestionPanel = ({ assignment }) => {
  if (!assignment) return null;

  return (
    <div className="panel question-panel">
      <div className="panel__header">
        <h2 className="panel__title">{assignment.title}</h2>
        <span className={`assignment-card__difficulty assignment-card__difficulty--${assignment.difficulty.toLowerCase()}`}>
          {assignment.difficulty}
        </span>
      </div>
      <div className="panel__content">
        <p>{assignment.question}</p>
        {assignment.requirements && assignment.requirements.length > 0 && (
          <div className="question-panel__requirements">
            <h4>Requirements:</h4>
            <ul>
              {assignment.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const DataPanel = ({ assignment }) => {
  if (!assignment || !assignment.tableStructure) return null;

  return (
    <div className="panel data-panel">
      <div className="panel__header">
        <h3 className="panel__title">Sample Data</h3>
      </div>
      <div className="panel__content">
        {assignment.tableStructure.map((table, index) => (
          <div key={index} className="data-panel__schema">
            <h4>{table.tableName}</h4>
            <table className="data-panel__table">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {table.columns.map((column, colIndex) => (
                  <tr key={colIndex}>
                    <td><code>{column.name}</code></td>
                    <td>{column.type}</td>
                    <td>{column.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {table.sampleData && table.sampleData.length > 0 && (
              <>
                <h5>Sample Rows:</h5>
                <table className="data-panel__table">
                  <thead>
                    <tr>
                      {table.columns.map((column, colIndex) => (
                        <th key={colIndex}>{column.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.sampleData.slice(0, 5).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {table.columns.map((column, colIndex) => (
                          <td key={colIndex}>{row[column.name]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const EditorPanel = ({ query, setQuery, onExecute, isExecuting }) => {
  return (
    <div className="panel editor-panel">
      <div className="panel__header">
        <h3 className="panel__title">SQL Editor</h3>
      </div>
      
      <div className="editor-panel__actions">
        <div></div> {/* Spacer */}
        <button 
          className="editor-panel__execute-btn"
          onClick={onExecute}
          disabled={isExecuting || !query.trim()}
        >
          {isExecuting ? <span className="spinner"></span> : 'Execute Query'}
        </button>
      </div>
      
      <div className="editor-panel__editor-container">
        <Editor
          height="100%"
          defaultLanguage="sql"
          value={query}
          onChange={(value) => setQuery(value || '')}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 20,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            padding: { top: 10, bottom: 10 },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            tabSize: 2,
            insertSpaces: true,
            renderLineHighlight: 'all',
            selectOnLineNumbers: true,
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 5,
            lineNumbersMinChars: 3,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10
            },
            readOnly: false,
            domReadOnly: false
          }}
        />
      </div>
    </div>
  );
};

const ResultPanel = ({ result, error, isExecuting, validation }) => {
  const renderValidationResults = () => {
    if (!validation) return null;

    return (
      <div className="result-panel__validation">
        <div className={`validation-feedback ${validation.isCorrect ? 'validation-feedback--success' : 'validation-feedback--error'}`}>
          {validation.feedback}
        </div>
        
        {validation.totalTests > 0 && (
          <div className="validation-stats">
            <div className="validation-stats__summary">
              Test Results: {validation.passedTests}/{validation.totalTests} passed
            </div>
            
            {validation.failedTests && validation.failedTests.length > 0 && (
              <div className="validation-stats__failures">
                {validation.failedTests.map((test, index) => (
                  <div key={index} className="validation-failure">
                    <strong>{test.testName}:</strong> {test.error}
                    {!test.isHidden && test.expected && (
                      <details className="validation-failure__details">
                        <summary>Show expected vs actual</summary>
                        <div className="validation-comparison">
                          <div className="validation-comparison__expected">
                            <strong>Expected:</strong>
                            <pre>{JSON.stringify(test.expected, null, 2)}</pre>
                          </div>
                          <div className="validation-comparison__actual">
                            <strong>Actual:</strong>
                            <pre>{JSON.stringify(test.actual, null, 2)}</pre>
                          </div>
                        </div>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderTable = (data) => {
    if (!data || data.length === 0) {
      return <div className="result-panel__empty">No results returned</div>;
    }

    const columns = Object.keys(data[0]);
    
    return (
      <table className="result-panel__table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="panel result-panel">
      <div className="panel__header">
        <h3 className="panel__title">Results</h3>
      </div>
      <div className="panel__content">
        {isExecuting && (
          <div className="result-panel__empty">
            <span className="spinner"></span> Executing query...
          </div>
        )}
        {error && (
          <div className="result-panel__error">
            <strong>Error:</strong> {error}
          </div>
        )}
        {result && !error && !isExecuting && (
          <>
            <div className="result-panel__success">
              ✅ Query executed successfully! Returned {result.length} row{result.length !== 1 ? 's' : ''}.
            </div>
            {renderValidationResults()}
            {renderTable(result)}
          </>
        )}
        {!result && !error && !isExecuting && (
          <div className="result-panel__empty">
            Write and execute a SQL query to see results
          </div>
        )}
      </div>
    </div>
  );
};

const HintPanel = ({ assignmentId, query }) => {
  const [hint, setHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetHint = async () => {
    if (!query.trim()) {
      alert('Please write a SQL query first');
      return;
    }

    setIsLoading(true);
    try {
      const hintData = await getHint(assignmentId, query);
      setHint(hintData.hint);
    } catch (error) {
      console.error('Error getting hint:', error);
      setHint('Sorry, unable to get hint at this time. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel hint-panel">
      <div className="panel__header">
        <h3 className="panel__title">Hints</h3>
        <button 
          className="hint-panel__button"
          onClick={handleGetHint}
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner"></span> : 'Get Hint'}
        </button>
      </div>
      <div className="panel__content">
        {isLoading && (
          <div className="hint-panel__loading">Getting hint...</div>
        )}
        {hint && !isLoading && (
          <div className="hint-panel__content">
            <p>{hint}</p>
          </div>
        )}
        {!hint && !isLoading && (
          <div className="hint-panel__loading">
            Click "Get Hint" for guidance on your SQL query
          </div>
        )}
      </div>
    </div>
  );
};

const AssignmentAttempt = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [query, setQuery] = useState('-- Write your SQL query here\nSELECT * FROM students;');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        console.log('Loading assignment:', id);
        const data = await fetchAssignment(id);
        console.log('Assignment loaded:', data);
        setAssignment(data);
      } catch (err) {
        console.error('Error loading assignment:', err);
        setError('Failed to load assignment');
      } finally {
        setLoading(false);
      }
    };

    loadAssignment();
  }, [id]);

  const handleExecuteQuery = async () => {
    if (!query.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    console.log('Executing query:', query);
    setIsExecuting(true);
    setError(null);
    setResult(null);
    setValidation(null);

    try {
      const data = await executeQuery(query, id);
      console.log('Query result:', data);
      setResult(data.result);
      
      // Set validation results if available
      if (data.validation) {
        setValidation(data.validation);
      }
    } catch (err) {
      console.error('Query execution error:', err);
      setError(err.message || 'Query execution failed');
    } finally {
      setIsExecuting(false);
    }
  };

  if (loading) {
    return (
      <div className="assignment-attempt">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          Loading assignment...
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="assignment-attempt">
        <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
          Assignment not found
        </div>
      </div>
    );
  }

  return (
    <div className="assignment-attempt">
      {/* Question Section */}
      <div className="assignment-attempt__question">
        <QuestionPanel assignment={assignment} />
      </div>

      {/* Main Content Area */}
      <div className="assignment-attempt__main">
        {/* Data Panel */}
        <div className="assignment-attempt__data">
          <DataPanel assignment={assignment} />
        </div>

        {/* Editor Panel */}
        <div className="assignment-attempt__editor">
          <EditorPanel 
            query={query}
            setQuery={setQuery}
            onExecute={handleExecuteQuery}
            isExecuting={isExecuting}
          />
        </div>

        {/* Result Panel */}
        <div className="assignment-attempt__result">
          <ResultPanel 
            result={result}
            error={error}
            isExecuting={isExecuting}
            validation={validation}
          />
        </div>
      </div>

      {/* Hint Section */}
      <div className="assignment-attempt__hint">
        <HintPanel assignmentId={id} query={query} />
      </div>
    </div>
  );
};

export default AssignmentAttempt;