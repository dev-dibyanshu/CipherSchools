const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
require('dotenv').config();

const sampleAssignments = [
  {
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
      { id: 5, name: "Eva Brown", email: "eva@example.com", age: 20, grade: "A" }
    ]
  },
  {
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
    ]
  },
  {
    title: "Aggregate Functions with GROUP BY",
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
    ]
  },
  {
    title: "Subquery with EXISTS",
    difficulty: "Hard",
    question: "Find all courses that have at least one student enrolled.",
    description: "Practice subqueries using EXISTS clause",
    requirements: [
      "Use EXISTS with a subquery",
      "Check for enrollment relationship",
      "Return course id, name, and instructor",
      "Order by course name"
    ],
    tableStructure: [
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
          { id: 3, name: "Data Structures", credits: 3, instructor: "Dr. Johnson" },
          { id: 4, name: "Machine Learning", credits: 4, instructor: "Dr. Smith" }
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
    ]
  }
];

const seedAssignments = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📦 Connected to MongoDB');

    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('🗑️  Cleared existing assignments');

    // Insert sample assignments
    const insertedAssignments = await Assignment.insertMany(sampleAssignments);
    console.log(`✅ Inserted ${insertedAssignments.length} sample assignments`);

    // Display inserted assignments
    insertedAssignments.forEach((assignment, index) => {
      console.log(`${index + 1}. ${assignment.title} (${assignment.difficulty})`);
    });

    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('📦 MongoDB connection closed');
  }
};

// Run the seeding function
if (require.main === module) {
  seedAssignments();
}

module.exports = { seedAssignments, sampleAssignments };