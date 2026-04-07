/**
 * Dashboard Routes
 * Handles home page, student dashboard, and instructor dashboard
 */

const { Router } = require('express');
const { DashboardController } = require('../controllers/dashboardController');
const { requireLogin } = require('../utils/auth_middleware');

const router = Router();

// Home page (public)
router.get('/', DashboardController.getHome);

// Dashboard pages (require login)
router.get('/student-dashboard', requireLogin('Student'), DashboardController.getStudentDashboard);
router.get('/instructor-dashboard', requireLogin('Instructor'), DashboardController.getInstructorDashboard);

module.exports = { dashboard_router: router };
