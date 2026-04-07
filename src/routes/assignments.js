/**
 * Assignment Routes
 * Handles assignment creation, submission, and grading
 */

const { Router } = require('express');
const { AssignmentController } = require('../controllers/assignmentController');
const { requireLogin } = require('../utils/auth_middleware');

const router = Router();

// Create assignment (instructor only)
router.get('/course/:courseId/assignment/create', requireLogin('Instructor'), AssignmentController.getCreateAssignmentPage);
router.post('/course/:courseId/assignment/create', requireLogin('Instructor'), AssignmentController.postCreateAssignment);

// Assignment detail
router.get('/assignment/:assignmentId', requireLogin(), AssignmentController.getAssignmentPage);

// Submit assignment (student only)
router.get('/assignment/:assignmentId/submit', requireLogin('Student'), AssignmentController.getSubmitAssignmentPage);
router.post('/assignment/:assignmentId/submit', requireLogin('Student'), AssignmentController.postSubmitAssignment);

// Grade submission (instructor only)
router.get('/submission/:submissionId/grade', requireLogin('Instructor'), AssignmentController.getGradingPage);
router.post('/submission/:submissionId/grade', requireLogin('Instructor'), AssignmentController.postGradeSubmission);

// View grades (student only)
router.get('/my-grades', requireLogin('Student'), AssignmentController.getStudentGradesPage);

module.exports = { assignment_router: router };
