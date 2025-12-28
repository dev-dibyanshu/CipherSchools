// LeetCode-style output validation service
const _ = require('lodash');

class OutputValidator {
  constructor() {
    this.validationResults = {
      isCorrect: false,
      sampleTestPassed: false,
      hiddenTestsPassed: false,
      totalTests: 0,
      passedTests: 0,
      failedTests: [],
      feedback: ''
    };
  }

  /**
   * Validate query output against expected results and hidden test cases
   * @param {Array} actualOutput - The result from executing the SQL query
   * @param {Object} assignment - The assignment object with expected output and test cases
   * @param {string} query - The original SQL query for analysis
   * @returns {Object} Validation results with LeetCode-style feedback
   */
  validateOutput(actualOutput, assignment, query) {
    this.validationResults = {
      isCorrect: false,
      sampleTestPassed: false,
      hiddenTestsPassed: false,
      totalTests: 0,
      passedTests: 0,
      failedTests: [],
      feedback: ''
    };

    try {
      // 1. Validate against expected output (sample test case)
      const sampleTestResult = this.validateSampleOutput(actualOutput, assignment.expectedOutput);
      this.validationResults.sampleTestPassed = sampleTestResult.passed;
      this.validationResults.totalTests += 1;
      
      if (sampleTestResult.passed) {
        this.validationResults.passedTests += 1;
      } else {
        this.validationResults.failedTests.push({
          testName: 'Sample Test Case',
          error: sampleTestResult.error,
          expected: assignment.expectedOutput,
          actual: actualOutput
        });
      }

      // 2. Validate against hidden test cases
      const hiddenTestResults = this.validateHiddenTestCases(actualOutput, assignment.hiddenTestCases || [], query);
      this.validationResults.totalTests += hiddenTestResults.totalTests;
      this.validationResults.passedTests += hiddenTestResults.passedTests;
      this.validationResults.failedTests.push(...hiddenTestResults.failedTests);
      this.validationResults.hiddenTestsPassed = hiddenTestResults.allPassed;

      // 3. Determine overall correctness
      this.validationResults.isCorrect = this.validationResults.sampleTestPassed && this.validationResults.hiddenTestsPassed;

      // 4. Generate feedback message
      this.generateFeedback();

      return this.validationResults;

    } catch (error) {
      console.error('Output validation error:', error);
      return {
        isCorrect: false,
        sampleTestPassed: false,
        hiddenTestsPassed: false,
        totalTests: 1,
        passedTests: 0,
        failedTests: [{ testName: 'Validation Error', error: 'Failed to validate output' }],
        feedback: 'Unable to validate query results. Please try again.'
      };
    }
  }

  /**
   * Validate actual output against expected sample output
   */
  validateSampleOutput(actual, expected) {
    if (!expected || expected.length === 0) {
      return { passed: true, error: null };
    }

    if (!actual || actual.length === 0) {
      return { 
        passed: false, 
        error: 'Query returned no results, but expected results were provided' 
      };
    }

    // Check row count
    if (actual.length !== expected.length) {
      return {
        passed: false,
        error: `Expected ${expected.length} rows, but got ${actual.length} rows`
      };
    }

    // Check column structure (first row)
    const actualColumns = Object.keys(actual[0]).sort();
    const expectedColumns = Object.keys(expected[0]).sort();
    
    if (!_.isEqual(actualColumns, expectedColumns)) {
      return {
        passed: false,
        error: `Column mismatch. Expected columns: [${expectedColumns.join(', ')}], Got: [${actualColumns.join(', ')}]`
      };
    }

    // Check data content (order-independent comparison)
    const sortedActual = this.sortResults(actual);
    const sortedExpected = this.sortResults(expected);

    if (!_.isEqual(sortedActual, sortedExpected)) {
      return {
        passed: false,
        error: 'Query results do not match expected output'
      };
    }

    return { passed: true, error: null };
  }

  /**
   * Validate against hidden test cases
   */
  validateHiddenTestCases(actual, hiddenTestCases, query) {
    const results = {
      totalTests: hiddenTestCases.length,
      passedTests: 0,
      failedTests: [],
      allPassed: true
    };

    for (const testCase of hiddenTestCases) {
      const testResult = this.runHiddenTest(actual, testCase, query);
      
      if (testResult.passed) {
        results.passedTests += 1;
      } else {
        results.failedTests.push({
          testName: testCase.description || 'Hidden Test Case',
          error: testResult.error,
          isHidden: true
        });
        results.allPassed = false;
      }
    }

    return results;
  }

  /**
   * Run individual hidden test case
   */
  runHiddenTest(actual, testCase, query) {
    try {
      // Row count validation
      if (testCase.expectedRowCount !== undefined) {
        if (actual.length !== testCase.expectedRowCount) {
          return {
            passed: false,
            error: `Expected ${testCase.expectedRowCount} rows, got ${actual.length}`
          };
        }
      }

      // Column count validation
      if (testCase.expectedColumnCount !== undefined && actual.length > 0) {
        const actualColumnCount = Object.keys(actual[0]).length;
        if (actualColumnCount !== testCase.expectedColumnCount) {
          return {
            passed: false,
            error: `Expected ${testCase.expectedColumnCount} columns, got ${actualColumnCount}`
          };
        }
      }

      // Forbidden values check
      if (testCase.forbiddenValues && actual.length > 0) {
        const columns = Object.keys(actual[0]);
        for (const row of actual) {
          for (const column of columns) {
            if (testCase.forbiddenValues.includes(row[column])) {
              return {
                passed: false,
                error: `Found forbidden value '${row[column]}' in results`
              };
            }
          }
        }
      }

      // Required operator check
      if (testCase.requiredOperator) {
        const upperQuery = query.toUpperCase();
        if (!upperQuery.includes(testCase.requiredOperator.toUpperCase())) {
          return {
            passed: false,
            error: `Query must use ${testCase.requiredOperator} operator`
          };
        }
      }

      // Required function check
      if (testCase.requiredFunction) {
        const upperQuery = query.toUpperCase();
        if (!upperQuery.includes(testCase.requiredFunction.toUpperCase())) {
          return {
            passed: false,
            error: `Query must use ${testCase.requiredFunction}() function`
          };
        }
      }

      // Required clause check
      if (testCase.requiredClause) {
        const upperQuery = query.toUpperCase();
        if (!upperQuery.includes(testCase.requiredClause.toUpperCase())) {
          return {
            passed: false,
            error: `Query must use ${testCase.requiredClause} clause`
          };
        }
      }

      // Minimum count validation
      if (testCase.minStudentCount !== undefined && actual.length > 0) {
        const hasValidCount = actual.every(row => 
          row.student_count >= testCase.minStudentCount || 
          row.count >= testCase.minStudentCount
        );
        if (!hasValidCount) {
          return {
            passed: false,
            error: `All results must have count >= ${testCase.minStudentCount}`
          };
        }
      }

      // Expected value validation
      if (testCase.expectedValue) {
        const found = actual.some(row => _.isEqual(row, testCase.expectedValue));
        if (!found) {
          return {
            passed: false,
            error: 'Expected specific value not found in results'
          };
        }
      }

      return { passed: true, error: null };

    } catch (error) {
      return {
        passed: false,
        error: 'Hidden test case validation failed'
      };
    }
  }

  /**
   * Sort results for consistent comparison
   */
  sortResults(results) {
    if (!results || results.length === 0) return results;
    
    return results.map(row => {
      const sortedRow = {};
      Object.keys(row).sort().forEach(key => {
        sortedRow[key] = row[key];
      });
      return sortedRow;
    }).sort((a, b) => {
      return JSON.stringify(a).localeCompare(JSON.stringify(b));
    });
  }

  /**
   * Generate LeetCode-style feedback message
   */
  generateFeedback() {
    if (this.validationResults.isCorrect) {
      this.validationResults.feedback = `🎉 All test cases passed! (${this.validationResults.passedTests}/${this.validationResults.totalTests})`;
    } else if (this.validationResults.sampleTestPassed && !this.validationResults.hiddenTestsPassed) {
      this.validationResults.feedback = `✅ Sample test case passed, but some hidden test cases failed. (${this.validationResults.passedTests}/${this.validationResults.totalTests} passed)`;
    } else if (!this.validationResults.sampleTestPassed) {
      const sampleError = this.validationResults.failedTests.find(test => test.testName === 'Sample Test Case');
      this.validationResults.feedback = `❌ Sample test case failed: ${sampleError ? sampleError.error : 'Output does not match expected result'}`;
    } else {
      this.validationResults.feedback = `❌ ${this.validationResults.failedTests.length} test case(s) failed. (${this.validationResults.passedTests}/${this.validationResults.totalTests} passed)`;
    }
  }
}

module.exports = OutputValidator;