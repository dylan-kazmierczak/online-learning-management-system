/**
 * Course Routes
 * Handles course creation, enrollment, and management
 */

const { Router } = require('express');
const { CourseController } = require('../controllers/courseController');
const { requireLogin } = require('../utils/auth_middleware');

const router = Router();

// Create course (instructor only)
router.get('/create', requireLogin('Instructor'), CourseController.getCreateCoursePage);
router.post('/create', requireLogin('Instructor'), CourseController.postCreateCourse);

// Course detail
router.get('/course/:courseId', requireLogin(), CourseController.getCoursePage);

// Enroll in course (student only)
router.get('/enroll', requireLogin('Student'), CourseController.getEnrollPage);
router.post('/enroll', requireLogin('Student'), CourseController.postEnrollCourse);

// Unenroll from course (student only)
router.post('/unenroll', requireLogin('Student'), CourseController.postUnenrollCourse);

// Upload content (instructor only)
router.get('/course/:courseId/upload', requireLogin('Instructor'), CourseController.getUploadContentPage);
router.post('/course/:courseId/upload', requireLogin('Instructor'), CourseController.postUploadContent);

module.exports = { course_router: router };
