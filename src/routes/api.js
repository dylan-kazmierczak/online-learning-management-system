/**
 * Data Access Routes
 * RESTful API endpoints for accessing LMS data
 */

const { Router } = require('express');
const { DataAccessController } = require('../controllers/dataAccessController');

const router = Router();

// System Statistics
router.get('/stats', DataAccessController.getSystemStats);

// User Routes
router.get('/users', DataAccessController.getAllUsers);
router.get('/users/:id', DataAccessController.getUserById);

// Course Routes
router.get('/courses', DataAccessController.getAllCourses);
router.get('/courses/:id', DataAccessController.getCourseById);
router.get('/instructors/:instructorId/courses', DataAccessController.getCoursesByInstructor);

// Enrollment Routes
router.get('/enrollments', DataAccessController.getAllEnrollments);
router.get('/students/:studentId/enrollments', DataAccessController.getEnrollmentsByStudent);
router.get('/courses/:courseId/enrollments', DataAccessController.getEnrollmentsByCourse);

// Assignment Routes
router.get('/assignments', DataAccessController.getAllAssignments);
router.get('/courses/:courseId/assignments', DataAccessController.getAssignmentsByCourse);

// Submission Routes
router.get('/submissions', DataAccessController.getAllSubmissions);
router.get('/assignments/:assignmentId/submissions', DataAccessController.getSubmissionsByAssignment);
router.get('/students/:studentId/submissions', DataAccessController.getSubmissionsByStudent);

// Grade Routes
router.get('/grades', DataAccessController.getAllGrades);
router.get('/instructors/:instructorId/grades', DataAccessController.getGradesByInstructor);

module.exports = { api_router: router };
