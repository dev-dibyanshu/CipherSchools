-- CipherSQLStudio PostgreSQL Setup Script
-- Run this script to create the sample database structure

-- Create database (run this as superuser)
-- CREATE DATABASE ciphersqlstudio;

-- Connect to the ciphersqlstudio database before running the rest

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER CHECK (age > 0 AND age < 150),
    grade CHAR(1) CHECK (grade IN ('A', 'B', 'C', 'D', 'F'))
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    credits INTEGER CHECK (credits > 0 AND credits <= 6),
    instructor VARCHAR(100) NOT NULL
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE(student_id, course_id)
);

-- Insert sample students
INSERT INTO students (name, email, age, grade) VALUES
('Alice Johnson', 'alice@example.com', 20, 'A'),
('Bob Smith', 'bob@example.com', 22, 'B'),
('Carol Davis', 'carol@example.com', 19, 'A'),
('David Wilson', 'david@example.com', 21, 'C'),
('Eva Brown', 'eva@example.com', 20, 'A'),
('Frank Miller', 'frank@example.com', 23, 'B'),
('Grace Lee', 'grace@example.com', 18, 'A'),
('Henry Taylor', 'henry@example.com', 24, 'B'),
('Ivy Chen', 'ivy@example.com', 19, 'A'),
('Jack Robinson', 'jack@example.com', 22, 'C')
ON CONFLICT (email) DO NOTHING;

-- Insert sample courses
INSERT INTO courses (name, credits, instructor) VALUES
('Database Systems', 3, 'Dr. Wilson'),
('Web Development', 4, 'Prof. Brown'),
('Data Structures', 3, 'Dr. Johnson'),
('Machine Learning', 4, 'Dr. Smith'),
('Computer Networks', 3, 'Prof. Davis'),
('Software Engineering', 4, 'Dr. Martinez'),
('Operating Systems', 3, 'Prof. Anderson'),
('Algorithms', 3, 'Dr. Thompson')
ON CONFLICT DO NOTHING;

-- Insert sample enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES
(1, 1, '2024-01-15'), -- Alice -> Database Systems
(1, 2, '2024-01-15'), -- Alice -> Web Development
(2, 1, '2024-01-16'), -- Bob -> Database Systems
(2, 5, '2024-01-16'), -- Bob -> Computer Networks
(3, 3, '2024-01-17'), -- Carol -> Data Structures
(3, 4, '2024-01-17'), -- Carol -> Machine Learning
(4, 2, '2024-01-18'), -- David -> Web Development
(5, 1, '2024-01-19'), -- Eva -> Database Systems
(5, 3, '2024-01-19'), -- Eva -> Data Structures
(6, 4, '2024-01-20'), -- Frank -> Machine Learning
(6, 5, '2024-01-20'), -- Frank -> Computer Networks
(7, 1, '2024-01-21'), -- Grace -> Database Systems
(7, 2, '2024-01-21'), -- Grace -> Web Development
(8, 6, '2024-01-22'), -- Henry -> Software Engineering
(9, 3, '2024-01-23'), -- Ivy -> Data Structures
(10, 7, '2024-01-24') -- Jack -> Operating Systems
ON CONFLICT (student_id, course_id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade);
CREATE INDEX IF NOT EXISTS idx_students_age ON students(age);
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_date ON enrollments(enrollment_date);

-- Create a view for student course information (optional)
CREATE OR REPLACE VIEW student_courses AS
SELECT 
    s.id as student_id,
    s.name as student_name,
    s.email,
    s.age,
    s.grade,
    c.id as course_id,
    c.name as course_name,
    c.credits,
    c.instructor,
    e.enrollment_date
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id;

-- Display summary information
SELECT 'Students' as table_name, COUNT(*) as record_count FROM students
UNION ALL
SELECT 'Courses' as table_name, COUNT(*) as record_count FROM courses
UNION ALL
SELECT 'Enrollments' as table_name, COUNT(*) as record_count FROM enrollments;

-- Show sample data
SELECT 'Sample Students:' as info;
SELECT id, name, email, age, grade FROM students LIMIT 5;

SELECT 'Sample Courses:' as info;
SELECT id, name, credits, instructor FROM courses LIMIT 5;

SELECT 'Sample Enrollments:' as info;
SELECT e.id, s.name as student_name, c.name as course_name, e.enrollment_date 
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c ON e.course_id = c.id
LIMIT 5;