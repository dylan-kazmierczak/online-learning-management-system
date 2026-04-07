/**
 * Mock Data Repository
 * Provides sample data for the LMS system demonstrating the data model
 * In a real implementation, this would be replaced with actual database queries
 */

const { User } = require('../models/User');
const { Course } = require('../models/Course');
const { Enrollment } = require('../models/Enrollment');
const { Assignment } = require('../models/Assignment');
const { Submission } = require('../models/Submission');
const { Grade } = require('../models/Grade');

class MockRepository {
  constructor() {
    this.initializeMockData();
  }

  /**
   * Initialize all mock data
   */
  initializeMockData() {
    this.users = this.createMockUsers();
    this.courses = this.createMockCourses();
    this.enrollments = this.createMockEnrollments();
    this.assignments = this.createMockAssignments();
    this.submissions = this.createMockSubmissions();
    this.grades = this.createMockGrades();
  }

  /**
   * Create mock users
   */
  createMockUsers() {
    return [
      new User(1, 'john.smith@university.edu', 'John', 'Smith', 'Student'),
      new User(2, 'alex.johnson@university.edu', 'Alex', 'Johnson', 'Student'),
      new User(3, 'sarah.williams@university.edu', 'Sarah', 'Williams', 'Instructor'),
      new User(4, 'michael.chen@university.edu', 'Michael', 'Chen', 'Instructor'),
      new User(5, 'emma.davis@university.edu', 'Emma', 'Davis', 'Student'),
      new User(6, 'robert.wilson@university.edu', 'Robert', 'Wilson', 'Instructor')
    ];
  }

  /**
   * Create mock courses
   */
  createMockCourses() {
    const course1 = new Course(
      1,
      3, // Sarah Williams (Instructor)
      'CS 101: Introduction to Programming',
      'Learn the fundamentals of programming using Python. Perfect for beginners.',
      new Date('2026-01-15'),
      new Date('2026-05-15'),
      40
    );
    course1.publish();

    const course2 = new Course(
      2,
      4, // Michael Chen (Instructor)
      'MATH 201: Calculus II',
      'Advanced calculus topics including integration and differential equations.',
      new Date('2026-01-20'),
      new Date('2026-05-20'),
      35
    );
    course2.publish();

    const course3 = new Course(
      3,
      6, // Robert Wilson (Instructor)
      'BUS 301: Business Analytics',
      'Analyze business data using modern analytics tools and techniques.',
      new Date('2026-02-01'),
      new Date('2026-06-01'),
      50
    );
    course3.publish();

    const course4 = new Course(
      4,
      3, // Sarah Williams (Instructor)
      'WEB 201: Web Development with React',
      'Build dynamic web applications with React, JavaScript, and modern web technologies.',
      new Date('2026-02-10'),
      new Date('2026-06-10'),
      30
    );
    course4.publish();

    const course5 = new Course(
      5,
      4, // Michael Chen (Instructor)
      'DATA 101: Data Science Fundamentals',
      'Introduction to data science, machine learning, and statistical analysis with Python.',
      new Date('2026-03-01'),
      new Date('2026-07-01'),
      25
    );
    course5.publish();

    const course6 = new Course(
      6,
      6, // Robert Wilson (Instructor)
      'ENG 150: Professional Writing & Communication',
      'Develop essential communication skills for academic and professional success.',
      new Date('2026-02-15'),
      new Date('2026-05-15'),
      45
    );
    course6.publish();

    return [course1, course2, course3, course4, course5, course6];
  }

  /**
   * Create mock enrollments
   */
  createMockEnrollments() {
    const enrollments = [
      // John Smith (Student 1) enrollments
      new Enrollment(1, 1, 1, new Date('2026-01-16')),
      new Enrollment(2, 1, 2, new Date('2026-01-21')),
      new Enrollment(3, 1, 3, new Date('2026-02-02')),

      // Alex Johnson (Student 2) enrollments
      new Enrollment(4, 2, 1, new Date('2026-01-17')),
      new Enrollment(5, 2, 2, new Date('2026-01-22')),

      // Emma Davis (Student 3) enrollments
      new Enrollment(6, 5, 1, new Date('2026-01-18')),
      new Enrollment(7, 5, 3, new Date('2026-02-03'))
    ];

    // Set some grades
    enrollments[0].setGrade(92); // John in CS 101
    enrollments[0].updateCompletion(85);

    enrollments[1].setGrade(87); // John in MATH 201
    enrollments[1].updateCompletion(75);

    enrollments[3].setGrade(95); // Alex in CS 101
    enrollments[3].updateCompletion(90);

    return enrollments;
  }

  /**
   * Create mock assignments
   */
  createMockAssignments() {
    const assignment1 = new Assignment(
      1,
      1,
      'Programming Challenge: Calculator App',
      'Build a functional calculator application using Python with basic arithmetic operations.',
      new Date('2026-03-13'),
      100
    );
    assignment1.publish();

    const assignment2 = new Assignment(
      2,
      1,
      'Quiz 1: Fundamentals Review',
      'Test your knowledge of programming fundamentals covered in modules 1-2.',
      new Date('2026-02-28'),
      50
    );
    assignment2.publish();

    const assignment3 = new Assignment(
      3,
      2,
      'Problem Set 6: Derivatives & Integration',
      'Solve 10 calculus problems focusing on derivative and integration techniques.',
      new Date('2026-03-18'),
      100
    );
    assignment3.publish();

    const assignment4 = new Assignment(
      4,
      3,
      'Data Analysis Project',
      'Analyze a provided business dataset and create a comprehensive report with visualizations.',
      new Date('2026-04-15'),
      150
    );
    assignment4.publish();

    return [assignment1, assignment2, assignment3, assignment4];
  }

  /**
   * Create mock submissions
   */
  createMockSubmissions() {
    const submissions = [];

    // John Smith submissions
    const sub1 = new Submission(1, 1, 1, new Date('2026-03-12T14:30:00'));
    sub1.filePath = 'submissions/calculator_app.py';
    sub1.markGraded();
    submissions.push(sub1);

    const sub2 = new Submission(2, 2, 1, new Date('2026-02-27T10:15:00'));
    sub2.markGraded();
    submissions.push(sub2);

    // Alex Johnson submissions
    const sub3 = new Submission(3, 1, 2, new Date('2026-03-11T16:45:00'));
    sub3.filePath = 'submissions/calculator_advanced.py';
    sub3.markGraded();
    submissions.push(sub3);

    const sub4 = new Submission(4, 2, 2, new Date('2026-02-26T09:20:00'));
    sub4.markGraded();
    submissions.push(sub4);

    // Emma Davis submissions
    const sub5 = new Submission(5, 1, 5, new Date('2026-03-10T13:00:00'));
    sub5.filePath = 'submissions/calculator_simple.py';
    sub5.markGraded();
    submissions.push(sub5);

    return submissions;
  }

  /**
   * Create mock grades
   */
  createMockGrades() {
    const grades = [];

    const grade1 = new Grade(1, 1, 3, 94, new Date('2026-03-13T15:00:00'));
    grade1.addComments('Excellent work! Clean code and good error handling.');
    grade1.addFeedback('Your calculator implementation is well-structured. Consider adding input validation for non-numeric values.');
    grades.push(grade1);

    const grade2 = new Grade(2, 2, 3, 45, new Date('2026-02-28T11:00:00'));
    grade2.addComments('Good understanding of fundamentals. Review module on recursion.');
    grades.push(grade2);

    const grade3 = new Grade(3, 3, 3, 98, new Date('2026-03-11T17:30:00'));
    grade3.addComments('Outstanding! Perfect score.');
    grade3.addFeedback('Impressive attention to detail and comprehensive solution.');
    grades.push(grade3);

    const grade4 = new Grade(4, 4, 4, 88, new Date('2026-02-27T10:00:00'));
    grade4.addComments('Solid performance on most problems. See comments on #5 and #8.');
    grades.push(grade4);

    const grade5 = new Grade(5, 5, 3, 90, new Date('2026-03-10T14:00:00'));
    grade5.addComments('Very good work. Great understanding of the concepts.');
    grades.push(grade5);

    return grades;
  }

  // ===== GETTER METHODS =====

  /**
   * Get all users
   */
  getAllUsers() {
    return this.users;
  }

  /**
   * Get user by ID
   */
  getUserById(userId) {
    return this.users.find(u => u.userId === userId) || null;
  }

  /**
   * Get all courses
   */
  getAllCourses() {
    return this.courses;
  }

  /**
   * Get course by ID
   */
  getCourseById(courseId) {
    return this.courses.find(c => c.courseId === courseId) || null;
  }

  /**
   * Get courses taught by specific instructor
   */
  getCoursesByInstructor(instructorId) {
    return this.courses.filter(c => c.instructorId === instructorId);
  }

  /**
   * Get all enrollments
   */
  getAllEnrollments() {
    return this.enrollments;
  }

  /**
   * Get enrollments for a student
   */
  getEnrollmentsByStudent(studentId) {
    return this.enrollments.filter(e => e.studentId === studentId);
  }

  /**
   * Get enrollments for a course
   */
  getEnrollmentsByCourse(courseId) {
    return this.enrollments.filter(e => e.courseId === courseId);
  }

  /**
   * Get all assignments
   */
  getAllAssignments() {
    return this.assignments;
  }

  /**
   * Get assignments for a course
   */
  getAssignmentsByCourse(courseId) {
    return this.assignments.filter(a => a.courseId === courseId);
  }

  /**
   * Get all submissions
   */
  getAllSubmissions() {
    return this.submissions;
  }

  /**
   * Get submissions for an assignment
   */
  getSubmissionsByAssignment(assignmentId) {
    return this.submissions.filter(s => s.assignmentId === assignmentId);
  }

  /**
   * Get submissions by student
   */
  getSubmissionsByStudent(studentId) {
    return this.submissions.filter(s => s.studentId === studentId);
  }

  /**
   * Get all grades
   */
  getAllGrades() {
    return this.grades;
  }

  /**
   * Get grade for a submission
   */
  getGradeBySubmission(submissionId) {
    return this.grades.find(g => g.submissionId === submissionId) || null;
  }

  /**
   * Get grades given by instructor
   */
  getGradesByInstructor(instructorId) {
    return this.grades.filter(g => g.instructorId === instructorId);
  }

  /**
   * Get summary statistics
   */
  getSystemStatistics() {
    return {
      totalUsers: this.users.length,
      totalCourses: this.courses.length,
      totalEnrollments: this.enrollments.length,
      totalAssignments: this.assignments.length,
      totalSubmissions: this.submissions.length,
      totalGrades: this.grades.length,
      activeInstructors: this.users.filter(u => u.isInstructor()).length,
      activeStudents: this.users.filter(u => u.isStudent()).length
    };
  }
}

// Export singleton instance
const mockRepository = new MockRepository();
module.exports = { mockRepository };
