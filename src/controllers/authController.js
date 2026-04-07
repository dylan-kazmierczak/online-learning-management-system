/**
 * Authentication Controller
 * Handles user login, registration, and logout
 */

const { mockRepository } = require('../data/mockRepository');

class AuthController {
  /**
   * Render login page
   */
  static getLoginPage(req, res) {
    res.render('login', { title: 'Login - LMS', layout: 'auth' });
  }

  /**
   * Handle login
   */
  static postLogin(req, res) {
    try {
      const { userId, password } = req.body;
      
      // Find user by ID (password validation is simple for mock)
      const user = mockRepository.getUserById(parseInt(userId));
      
      if (!user) {
        return res.render('login', { 
          error: 'Invalid User ID',
          title: 'Login - LMS',
          layout: 'auth'
        });
      }

      // Set session
      req.session.user = {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        fullName: user.getFullName()
      };

      // Redirect based on role
      if (user.role === 'Student') {
        res.redirect('/student-dashboard');
      } else if (user.role === 'Instructor') {
        res.redirect('/instructor-dashboard');
      } else {
        res.redirect('/dashboard');
      }
    } catch (error) {
      res.render('login', { 
        error: 'Login failed: ' + error.message,
        title: 'Login - LMS',
        layout: 'auth'
      });
    }
  }

  /**
   * Render registration page
   */
  static getRegisterPage(req, res) {
    res.render('register', { title: 'Register - LMS', layout: 'auth' });
  }

  /**
   * Handle registration
   */
  static postRegister(req, res) {
    try {
      const { email, firstName, lastName, role, password, confirmPassword } = req.body;
      
      // Validate passwords match
      if (password !== confirmPassword) {
        return res.render('register', { 
          error: 'Passwords do not match',
          title: 'Register - LMS',
          layout: 'auth'
        });
      }

      // Validate input
      if (!email || !firstName || !lastName || !role) {
        return res.render('register', { 
          error: 'All fields are required',
          title: 'Register - LMS',
          layout: 'auth'
        });
      }

      // Check if user already exists
      const existingUser = mockRepository.getAllUsers().find(u => u.email === email);
      if (existingUser) {
        return res.render('register', { 
          error: 'Email already registered',
          title: 'Register - LMS',
          layout: 'auth'
        });
      }

      // Create new user (in real app, would save to database)
      const newUserId = Math.max(...mockRepository.getAllUsers().map(u => u.userId)) + 1;
      const newUser = {
        userId: newUserId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        createdAt: new Date()
      };

      // Add to mock repository
      mockRepository.users.push(newUser);

      // Set session
      req.session.user = {
        userId: newUser.userId,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        fullName: `${newUser.firstName} ${newUser.lastName}`
      };

      // Redirect to appropriate dashboard
      if (role === 'Student') {
        res.redirect('/student-dashboard');
      } else if (role === 'Instructor') {
        res.redirect('/instructor-dashboard');
      } else {
        res.redirect('/dashboard');
      }
    } catch (error) {
      res.render('register', { 
        error: 'Registration failed: ' + error.message,
        title: 'Register - LMS',
        layout: 'auth'
      });
    }
  }

  /**
   * Handle logout
   */
  static getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.send('Error logging out');
      }
      res.redirect('/');
    });
  }
}

module.exports = { AuthController };
