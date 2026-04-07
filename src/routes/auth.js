/**
 * Authentication Routes
 * Handles login, registration, and logout flows
 */

const { Router } = require('express');
const { AuthController } = require('../controllers/authController');

const router = Router();

// Login routes
router.get('/login', AuthController.getLoginPage);
router.post('/login', AuthController.postLogin);

// Registration routes
router.get('/register', AuthController.getRegisterPage);
router.post('/register', AuthController.postRegister);

// Logout
router.get('/logout', AuthController.getLogout);

module.exports = { auth_router: router };
