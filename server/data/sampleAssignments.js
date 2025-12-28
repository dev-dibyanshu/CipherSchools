// Expanded sample assignments - 15 questions total (5 Easy, 5 Medium, 5 Hard)
const sampleAssignments = [
  // ===== EASY QUESTIONS (5 total) =====
  {
    _id: '1',
    title: "Basic SELECT Query",
    difficulty: "Easy",
    question: "Write a query to select all students with grade 'A'.",
    description: "Practice basic SELECT statement with WHERE clause filtering",
    requirements: [
      "Use SELECT statement",
      "Filter by grade column",
      "Return all columns for matching students"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "email", type: "VARCHAR(100)", description: "Email address" },
          { name: "age", type: "INTEGER", description: "Student age" },
          { name: "grade", type: "CHAR(1)", description: "Letter grade (A, B, C, D, F)" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 20, grade: "A" },
          { id: 2, name: "Bob Smith", email: "bob@example.com", age: 22, grade: "B" },
          { id: 3, name: "Carol Davis", email: "carol@example.com", age: 19, grade: "A" },
          { id: 4, name: "David Wilson", email: "david@example.com", age: 21, grade: "C" },
          { id: 5, name: "Eva Brown", email: "eva@example.com", age: 20, grade: "A" }
        ]
      }
    ],
    expectedOutput: [
      { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 20, grade: "A" },
      { id: 3, name: "Carol Davis", email: "carol@example.com", age: 19, grade: "A" },
      { id: 5, name: "Eva Brown", email: "eva@example.com", age: 20, grade: "A" },
      { id: 7, name: "Grace Lee", email: "grace@example.com", age: 18, grade: "A" },
      { id: 9, name: "Ivy Chen", email: "ivy@example.com", age: 19, grade: "A" }
    ],
    hiddenTestCases: [
      {
        description: "Should return exactly 5 students with grade A",
        expectedRowCount: 5
      },
      {
        description: "Should not include students with other grades",
        forbiddenValues: ["B", "C", "D", "F"]
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    _id: '2',
    title: "Count Students by Age",
    difficulty: "Easy",
    question: "Write a query to count how many students are older than 20.",
    description: "Practice COUNT function with WHERE clause",
    requirements: [
      "Use COUNT() function",
      "Filter students where age > 20",
      "Return single count value"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "age", type: "INTEGER", description: "Student age" },
          { name: "grade", type: "CHAR(1)", description: "Letter grade" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", age: 20, grade: "A" },
          { id: 2, name: "Bob Smith", age: 22, grade: "B" },
          { id: 3, name: "Carol Davis", age: 19, grade: "A" },
          { id: 4, name: "David Wilson", age: 21, grade: "C" },
          { id: 5, name: "Eva Brown", age: 20, grade: "A" }
        ]
      }
    ],
    expectedOutput: [
      { count: 4 }
    ],
    hiddenTestCases: [
      {
        description: "Should return exactly one row with count",
        expectedRowCount: 1
      },
      {
        description: "Count should be 4 for students older than 20",
        expectedValue: { count: 4 }
      }
    ],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  },
  {
    _id: '3',
    title: "Select Specific Columns",
    difficulty: "Easy",
    question: "Write a query to select only the name and email of all students.",
    description: "Practice selecting specific columns instead of using SELECT *",
    requirements: [
      "Select only name and email columns",
      "Return all students",
      "Do not use SELECT *"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "email", type: "VARCHAR(100)", description: "Email address" },
          { name: "age", type: "INTEGER", description: "Student age" },
          { name: "grade", type: "CHAR(1)", description: "Letter grade" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 20, grade: "A" },
          { id: 2, name: "Bob Smith", email: "bob@example.com", age: 22, grade: "B" },
          { id: 3, name: "Carol Davis", email: "carol@example.com", age: 19, grade: "A" }
        ]
      }
    ],
    expectedOutput: [
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Smith", email: "bob@example.com" },
      { name: "Carol Davis", email: "carol@example.com" },
      { name: "David Wilson", email: "david@example.com" },
      { name: "Eva Brown", email: "eva@example.com" },
      { name: "Frank Miller", email: "frank@example.com" },
      { name: "Grace Lee", email: "grace@example.com" },
      { name: "Henry Taylor", email: "henry@example.com" },
      { name: "Ivy Chen", email: "ivy@example.com" },
      { name: "Jack Robinson", email: "jack@example.com" }
    ],
    hiddenTestCases: [
      {
        description: "Should return exactly 2 columns",
        expectedColumnCount: 2
      },
      {
        description: "Should return all 10 students",
        expectedRowCount: 10
      }
    ],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03')
  },
  {
    _id: '4',
    title: "Order Students by Age",
    difficulty: "Easy",
    question: "Write a query to select all students ordered by age from youngest to oldest.",
    description: "Practice ORDER BY clause with ascending sort",
    requirements: [
      "Select all columns",
      "Order by age in ascending order",
      "Show youngest students first"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "age", type: "INTEGER", description: "Student age" },
          { name: "grade", type: "CHAR(1)", description: "Letter grade" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", age: 20, grade: "A" },
          { id: 2, name: "Bob Smith", age: 22, grade: "B" },
          { id: 3, name: "Carol Davis", age: 19, grade: "A" },
          { id: 4, name: "David Wilson", age: 21, grade: "C" }
        ]
      }
    ],
    expectedOutput: [
      { id: 7, name: "Grace Lee", email: "grace@example.com", age: 18, grade: "A" },
      { id: 3, name: "Carol Davis", email: "carol@example.com", age: 19, grade: "A" },
      { id: 9, name: "Ivy Chen", email: "ivy@example.com", age: 19, grade: "A" },
      { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 20, grade: "A" },
      { id: 5, name: "Eva Brown", email: "eva@example.com", age: 20, grade: "A" }
    ],
    hiddenTestCases: [
      {
        description: "Should be ordered by age ascending",
        checkOrder: "age_asc"
      },
      {
        description: "Should include all students",
        expectedRowCount: 10
      }
    ],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04')
  },
  {
    _id: '5',
    title: "Find Students with Specific Names",
    difficulty: "Easy",
    question: "Write a query to find all students whose names start with 'A'.",
    description: "Practice LIKE operator with pattern matching",
    requirements: [
      "Use LIKE operator",
      "Find names starting with 'A'",
      "Return all matching students"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "email", type: "VARCHAR(100)", description: "Email address" },
          { name: "age", type: "INTEGER", description: "Student age" },
          { name: "grade", type: "CHAR(1)", description: "Letter grade" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 20, grade: "A" },
          { id: 2, name: "Bob Smith", email: "bob@example.com", age: 22, grade: "B" },
          { id: 3, name: "Carol Davis", email: "carol@example.com", age: 19, grade: "A" },
          { id: 4, name: "Andrew Wilson", email: "andrew@example.com", age: 21, grade: "C" }
        ]
      }
    ],
    expectedOutput: [
      { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 20, grade: "A" }
    ],
    hiddenTestCases: [
      {
        description: "Should only return names starting with 'A'",
        patternCheck: "name_starts_with_A"
      },
      {
        description: "Should use LIKE operator",
        requiredOperator: "LIKE"
      }
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },

  // ===== MEDIUM QUESTIONS (5 total) =====
  {
    _id: '6',
    title: "JOIN Two Tables",
    difficulty: "Medium",
    question: "Write a query to show student names along with their enrolled course names.",
    description: "Practice INNER JOIN between students and enrollments tables",
    requirements: [
      "Use INNER JOIN to connect students and enrollments",
      "Join enrollments with courses to get course names",
      "Return student name and course name columns"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "email", type: "VARCHAR(100)", description: "Email address" },
          { name: "age", type: "INTEGER", description: "Student age" },
          { name: "grade", type: "CHAR(1)", description: "Letter grade" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 20, grade: "A" },
          { id: 2, name: "Bob Smith", email: "bob@example.com", age: 22, grade: "B" },
          { id: 3, name: "Carol Davis", email: "carol@example.com", age: 19, grade: "A" }
        ]
      },
      {
        tableName: "courses",
        columns: [
          { name: "id", type: "INTEGER", description: "Course ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Course name" },
          { name: "credits", type: "INTEGER", description: "Credit hours" },
          { name: "instructor", type: "VARCHAR(100)", description: "Instructor name" }
        ],
        sampleData: [
          { id: 1, name: "Database Systems", credits: 3, instructor: "Dr. Wilson" },
          { id: 2, name: "Web Development", credits: 4, instructor: "Prof. Brown" },
          { id: 3, name: "Data Structures", credits: 3, instructor: "Dr. Johnson" }
        ]
      },
      {
        tableName: "enrollments",
        columns: [
          { name: "id", type: "INTEGER", description: "Enrollment ID (Primary Key)" },
          { name: "student_id", type: "INTEGER", description: "Foreign Key to students.id" },
          { name: "course_id", type: "INTEGER", description: "Foreign Key to courses.id" },
          { name: "enrollment_date", type: "DATE", description: "Date of enrollment" }
        ],
        sampleData: [
          { id: 1, student_id: 1, course_id: 1, enrollment_date: "2024-01-15" },
          { id: 2, student_id: 1, course_id: 2, enrollment_date: "2024-01-15" },
          { id: 3, student_id: 2, course_id: 1, enrollment_date: "2024-01-16" },
          { id: 4, student_id: 3, course_id: 3, enrollment_date: "2024-01-17" }
        ]
      }
    ],
    expectedOutput: [
      { name: "Alice Johnson", course_name: "Database Systems" },
      { name: "Alice Johnson", course_name: "Web Development" },
      { name: "Bob Smith", course_name: "Database Systems" },
      { name: "Carol Davis", course_name: "Data Structures" }
    ],
    hiddenTestCases: [
      {
        description: "Should use JOIN operations",
        requiredOperator: "JOIN"
      },
      {
        description: "Should return student-course pairs",
        expectedRowCount: 16
      }
    ],
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06')
  },
  {
    _id: '7',
    title: "Students Without Enrollments",
    difficulty: "Medium",
    question: "Find all students who are not enrolled in any courses.",
    description: "Practice LEFT JOIN with NULL checking",
    requirements: [
      "Use LEFT JOIN between students and enrollments",
      "Filter for students with no enrollments",
      "Return student information only"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "email", type: "VARCHAR(100)", description: "Email address" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", email: "alice@example.com" },
          { id: 2, name: "Bob Smith", email: "bob@example.com" },
          { id: 3, name: "Carol Davis", email: "carol@example.com" },
          { id: 4, name: "David Wilson", email: "david@example.com" }
        ]
      },
      {
        tableName: "enrollments",
        columns: [
          { name: "student_id", type: "INTEGER", description: "Foreign Key to students.id" },
          { name: "course_id", type: "INTEGER", description: "Foreign Key to courses.id" }
        ],
        sampleData: [
          { student_id: 1, course_id: 1 },
          { student_id: 2, course_id: 1 },
          { student_id: 3, course_id: 2 }
        ]
      }
    ],
    expectedOutput: [
      { id: 4, name: "David Wilson", email: "david@example.com" },
      { id: 10, name: "Jack Robinson", email: "jack@example.com" }
    ],
    hiddenTestCases: [
      {
        description: "Should use LEFT JOIN",
        requiredOperator: "LEFT JOIN"
      },
      {
        description: "Should check for NULL values",
        requiredCondition: "IS NULL"
      }
    ],
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07')
  },
  {
    _id: '8',
    title: "Course Enrollment Count",
    difficulty: "Medium",
    question: "Show each course name with the number of students enrolled in it.",
    description: "Practice GROUP BY with COUNT and JOIN",
    requirements: [
      "Join courses with enrollments",
      "Group by course",
      "Count students per course",
      "Show course name and count"
    ],
    tableStructure: [
      {
        tableName: "courses",
        columns: [
          { name: "id", type: "INTEGER", description: "Course ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Course name" }
        ],
        sampleData: [
          { id: 1, name: "Database Systems" },
          { id: 2, name: "Web Development" },
          { id: 3, name: "Data Structures" }
        ]
      },
      {
        tableName: "enrollments",
        columns: [
          { name: "student_id", type: "INTEGER", description: "Foreign Key to students.id" },
          { name: "course_id", type: "INTEGER", description: "Foreign Key to courses.id" }
        ],
        sampleData: [
          { student_id: 1, course_id: 1 },
          { student_id: 2, course_id: 1 },
          { student_id: 3, course_id: 2 },
          { student_id: 4, course_id: 1 }
        ]
      }
    ],
    expectedOutput: [
      { name: "Database Systems", student_count: 5 },
      { name: "Web Development", student_count: 2 },
      { name: "Data Structures", student_count: 1 }
    ],
    hiddenTestCases: [
      {
        description: "Should use GROUP BY",
        requiredOperator: "GROUP BY"
      },
      {
        description: "Should count enrollments correctly",
        expectedRowCount: 3
      }
    ],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08')
  },
  {
    _id: '9',
    title: "Students in Multiple Courses",
    difficulty: "Medium",
    question: "Find students who are enrolled in more than one course.",
    description: "Practice GROUP BY with HAVING clause",
    requirements: [
      "Group students by their ID",
      "Count enrollments per student",
      "Use HAVING to filter students with > 1 enrollment",
      "Return student information"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson" },
          { id: 2, name: "Bob Smith" },
          { id: 3, name: "Carol Davis" }
        ]
      },
      {
        tableName: "enrollments",
        columns: [
          { name: "student_id", type: "INTEGER", description: "Foreign Key to students.id" },
          { name: "course_id", type: "INTEGER", description: "Foreign Key to courses.id" }
        ],
        sampleData: [
          { student_id: 1, course_id: 1 },
          { student_id: 1, course_id: 2 },
          { student_id: 2, course_id: 1 },
          { student_id: 3, course_id: 2 },
          { student_id: 3, course_id: 3 }
        ]
      }
    ],
    expectedOutput: [
      { id: 1, name: "Alice Johnson", course_count: 2 },
      { id: 7, name: "Grace Lee", course_count: 2 }
    ],
    hiddenTestCases: [
      {
        description: "Should use HAVING clause",
        requiredOperator: "HAVING"
      },
      {
        description: "Should only return students with multiple enrollments",
        minCourseCount: 2
      }
    ],
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-09')
  },
  {
    _id: '10',
    title: "Average Age by Grade",
    difficulty: "Medium",
    question: "Calculate the average age of students for each grade level.",
    description: "Practice AVG function with GROUP BY",
    requirements: [
      "Group students by grade",
      "Calculate average age per grade",
      "Return grade and average age",
      "Round average to 2 decimal places"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "grade", type: "CHAR(1)", description: "Letter grade" },
          { name: "age", type: "INTEGER", description: "Student age" }
        ],
        sampleData: [
          { grade: "A", age: 20 },
          { grade: "A", age: 19 },
          { grade: "B", age: 22 },
          { grade: "B", age: 23 },
          { grade: "C", age: 21 }
        ]
      }
    ],
    expectedOutput: [
      { grade: "A", avg_age: 19.40 },
      { grade: "B", avg_age: 22.50 },
      { grade: "C", avg_age: 21.50 }
    ],
    hiddenTestCases: [
      {
        description: "Should use AVG function",
        requiredFunction: "AVG"
      },
      {
        description: "Should group by grade",
        requiredOperator: "GROUP BY"
      }
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },

  // ===== HARD QUESTIONS (5 total) =====
  {
    _id: '11',
    title: "Complex Aggregate with HAVING",
    difficulty: "Hard",
    question: "Write a query to find the average age of students for each grade, showing only grades with more than 1 student.",
    description: "Practice aggregate functions, GROUP BY, and HAVING clauses",
    requirements: [
      "Use AVG() function to calculate average age",
      "Group results by grade",
      "Use HAVING clause to filter groups with more than 1 student",
      "Order results by grade"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "email", type: "VARCHAR(100)", description: "Email address" },
          { name: "age", type: "INTEGER", description: "Student age" },
          { name: "grade", type: "CHAR(1)", description: "Letter grade" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 20, grade: "A" },
          { id: 2, name: "Bob Smith", email: "bob@example.com", age: 22, grade: "B" },
          { id: 3, name: "Carol Davis", email: "carol@example.com", age: 19, grade: "A" },
          { id: 4, name: "David Wilson", email: "david@example.com", age: 21, grade: "C" },
          { id: 5, name: "Eva Brown", email: "eva@example.com", age: 20, grade: "A" },
          { id: 6, name: "Frank Miller", email: "frank@example.com", age: 23, grade: "B" },
          { id: 7, name: "Grace Lee", email: "grace@example.com", age: 18, grade: "A" }
        ]
      }
    ],
    expectedOutput: [
      { grade: "A", avg_age: 19.40, student_count: 5 },
      { grade: "B", avg_age: 22.50, student_count: 2 }
    ],
    hiddenTestCases: [
      {
        description: "Should use HAVING clause",
        requiredOperator: "HAVING"
      },
      {
        description: "Should only show grades with > 1 student",
        minStudentCount: 2
      }
    ],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11')
  },
  {
    _id: '12',
    title: "Complex JOIN with Subquery",
    difficulty: "Hard",
    question: "Find students who are enrolled in the course with the highest number of enrollments.",
    description: "Practice subqueries, JOINs, and aggregate functions",
    requirements: [
      "Use subquery to find course with most enrollments",
      "Join students with enrollments and courses",
      "Return student names and the popular course name",
      "Handle ties appropriately"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Student full name" }
        ],
        sampleData: [
          { id: 1, name: "Alice Johnson" },
          { id: 2, name: "Bob Smith" },
          { id: 3, name: "Carol Davis" }
        ]
      },
      {
        tableName: "courses",
        columns: [
          { name: "id", type: "INTEGER", description: "Course ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Course name" }
        ],
        sampleData: [
          { id: 1, name: "Database Systems" },
          { id: 2, name: "Web Development" },
          { id: 3, name: "Data Structures" }
        ]
      },
      {
        tableName: "enrollments",
        columns: [
          { name: "student_id", type: "INTEGER", description: "Foreign Key to students.id" },
          { name: "course_id", type: "INTEGER", description: "Foreign Key to courses.id" }
        ],
        sampleData: [
          { student_id: 1, course_id: 1 },
          { student_id: 2, course_id: 1 },
          { student_id: 3, course_id: 1 },
          { student_id: 1, course_id: 2 }
        ]
      }
    ],
    expectedOutput: [
      { name: "Alice Johnson", course_name: "Database Systems" },
      { name: "Bob Smith", course_name: "Database Systems" },
      { name: "Carol Davis", course_name: "Database Systems" },
      { name: "Eva Brown", course_name: "Database Systems" },
      { name: "Grace Lee", course_name: "Database Systems" }
    ],
    hiddenTestCases: [
      {
        description: "Should use subquery",
        requiredPattern: "subquery"
      },
      {
        description: "Should find most popular course",
        expectedCourse: "Database Systems"
      }
    ],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    _id: '13',
    title: "Window Functions - Ranking",
    difficulty: "Hard",
    question: "Rank students by age within each grade level, showing student name, grade, age, and rank.",
    description: "Practice window functions with RANK() OVER",
    requirements: [
      "Use RANK() window function",
      "Partition by grade level",
      "Order by age descending within each grade",
      "Show name, grade, age, and rank"
    ],
    tableStructure: [
      {
        tableName: "students",
        columns: [
          { name: "name", type: "VARCHAR(100)", description: "Student full name" },
          { name: "grade", type: "CHAR(1)", description: "Letter grade" },
          { name: "age", type: "INTEGER", description: "Student age" }
        ],
        sampleData: [
          { name: "Alice Johnson", grade: "A", age: 20 },
          { name: "Bob Smith", grade: "B", age: 22 },
          { name: "Carol Davis", grade: "A", age: 19 },
          { name: "David Wilson", grade: "A", age: 21 }
        ]
      }
    ],
    expectedOutput: [
      { name: "Grace Lee", grade: "A", age: 18, rank: 5 },
      { name: "Carol Davis", grade: "A", age: 19, rank: 4 },
      { name: "Ivy Chen", grade: "A", age: 19, rank: 4 },
      { name: "Alice Johnson", grade: "A", age: 20, rank: 2 },
      { name: "Eva Brown", grade: "A", age: 20, rank: 2 }
    ],
    hiddenTestCases: [
      {
        description: "Should use RANK() function",
        requiredFunction: "RANK"
      },
      {
        description: "Should partition by grade",
        requiredClause: "PARTITION BY"
      }
    ],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  },
  {
    _id: '14',
    title: "Recursive CTE - Course Prerequisites",
    difficulty: "Hard",
    question: "Find all prerequisite courses for 'Advanced Database Systems' using a recursive CTE.",
    description: "Practice recursive Common Table Expressions",
    requirements: [
      "Use WITH RECURSIVE clause",
      "Navigate course prerequisite relationships",
      "Return all prerequisite courses in hierarchy",
      "Include course names and levels"
    ],
    tableStructure: [
      {
        tableName: "courses",
        columns: [
          { name: "id", type: "INTEGER", description: "Course ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Course name" },
          { name: "prerequisite_id", type: "INTEGER", description: "Required prerequisite course ID" }
        ],
        sampleData: [
          { id: 1, name: "Intro to Programming", prerequisite_id: null },
          { id: 2, name: "Data Structures", prerequisite_id: 1 },
          { id: 3, name: "Database Systems", prerequisite_id: 2 },
          { id: 4, name: "Advanced Database Systems", prerequisite_id: 3 }
        ]
      }
    ],
    expectedOutput: [
      { course_name: "Database Systems", level: 1 },
      { course_name: "Data Structures", level: 2 },
      { course_name: "Intro to Programming", level: 3 }
    ],
    hiddenTestCases: [
      {
        description: "Should use WITH RECURSIVE",
        requiredClause: "WITH RECURSIVE"
      },
      {
        description: "Should traverse prerequisite chain",
        expectedLevels: 3
      }
    ],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    _id: '15',
    title: "Complex Analytics Query",
    difficulty: "Hard",
    question: "Create a report showing each course with enrollment count, average student age, and percentage of total enrollments.",
    description: "Practice advanced analytics with multiple aggregate functions and window functions",
    requirements: [
      "Calculate enrollment count per course",
      "Calculate average age of enrolled students per course",
      "Calculate percentage of total enrollments",
      "Use window functions for percentage calculation",
      "Round percentages to 2 decimal places"
    ],
    tableStructure: [
      {
        tableName: "courses",
        columns: [
          { name: "id", type: "INTEGER", description: "Course ID (Primary Key)" },
          { name: "name", type: "VARCHAR(100)", description: "Course name" }
        ],
        sampleData: [
          { id: 1, name: "Database Systems" },
          { id: 2, name: "Web Development" },
          { id: 3, name: "Data Structures" }
        ]
      },
      {
        tableName: "students",
        columns: [
          { name: "id", type: "INTEGER", description: "Student ID (Primary Key)" },
          { name: "age", type: "INTEGER", description: "Student age" }
        ],
        sampleData: [
          { id: 1, age: 20 },
          { id: 2, age: 22 },
          { id: 3, age: 19 }
        ]
      },
      {
        tableName: "enrollments",
        columns: [
          { name: "student_id", type: "INTEGER", description: "Foreign Key to students.id" },
          { name: "course_id", type: "INTEGER", description: "Foreign Key to courses.id" }
        ],
        sampleData: [
          { student_id: 1, course_id: 1 },
          { student_id: 2, course_id: 1 },
          { student_id: 3, course_id: 2 }
        ]
      }
    ],
    expectedOutput: [
      { course_name: "Database Systems", enrollment_count: 5, avg_age: 20.60, percentage: 31.25 },
      { course_name: "Web Development", enrollment_count: 2, avg_age: 21.00, percentage: 12.50 },
      { course_name: "Data Structures", enrollment_count: 1, avg_age: 19.00, percentage: 6.25 }
    ],
    hiddenTestCases: [
      {
        description: "Should calculate percentages correctly",
        totalPercentage: 100.00
      },
      {
        description: "Should use window functions",
        requiredFunction: "OVER"
      }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

module.exports = sampleAssignments;