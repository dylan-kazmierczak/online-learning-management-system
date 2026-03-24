/**
 * Data Access Controller
 * Handles all API requests for LMS data retrieval
 */

const { mockRepository } = require('../data/mockRepository');

class DataAccessController {
  /**
   * Get system overview and statistics
   */
  static getSystemStats(req, res) {
    try {
      const stats = mockRepository.getSystemStatistics();
      res.status(200).json({
        success: true,
        message: 'System statistics retrieved successfully',
        data: stats,
        timestamp: new Date()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving system statistics',
        error: error.message
      });
    }
  }

  // ===== USER ENDPOINTS =====

  /**
   * Get all users
   */
  static getAllUsers(req, res) {
    try {
      const users = mockRepository.getAllUsers();
      const jsonUsers = users.map(u => u.toJSON());
      res.status(200).json({
        success: true,
        message: `Retrieved ${users.length} users`,
        data: jsonUsers,
        count: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving users',
        error: error.message
      });
    }
  }

  /**
   * Get user by ID
   */
  static getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = mockRepository.getUserById(parseInt(id));
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User with ID ${id} not found`
        });
      }

      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: user.toJSON()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving user',
        error: error.message
      });
    }
  }

  // ===== COURSE ENDPOINTS =====

  /**
   * Get all courses
   */
  static getAllCourses(req, res) {
    try {
      const courses = mockRepository.getAllCourses();
      const jsonCourses = courses.map(c => c.toJSON());
      res.status(200).json({
        success: true,
        message: `Retrieved ${courses.length} courses`,
        data: jsonCourses,
        count: courses.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving courses',
        error: error.message
      });
    }
  }

  /**
   * Get course by ID
   */
  static getCourseById(req, res) {
    try {
      const { id } = req.params;
      const course = mockRepository.getCourseById(parseInt(id));
      
      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course with ID ${id} not found`
        });
      }

      // Get enrollments for this course
      const enrollments = mockRepository.getEnrollmentsByCourse(parseInt(id));
      const assignments = mockRepository.getAssignmentsByCourse(parseInt(id));

      res.status(200).json({
        success: true,
        message: 'Course retrieved successfully',
        data: {
          ...course.toJSON(),
          enrollmentCount: enrollments.length,
          assignmentCount: assignments.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving course',
        error: error.message
      });
    }
  }

  /**
   * Get courses by instructor
   */
  static getCoursesByInstructor(req, res) {
    try {
      const { instructorId } = req.params;
      const courses = mockRepository.getCoursesByInstructor(parseInt(instructorId));
      const jsonCourses = courses.map(c => c.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${courses.length} courses for instructor`,
        data: jsonCourses,
        count: courses.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving courses',
        error: error.message
      });
    }
  }

  // ===== ENROLLMENT ENDPOINTS =====

  /**
   * Get all enrollments
   */
  static getAllEnrollments(req, res) {
    try {
      const enrollments = mockRepository.getAllEnrollments();
      const jsonEnrollments = enrollments.map(e => e.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${enrollments.length} enrollments`,
        data: jsonEnrollments,
        count: enrollments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving enrollments',
        error: error.message
      });
    }
  }

  /**
   * Get enrollments for a student
   */
  static getEnrollmentsByStudent(req, res) {
    try {
      const { studentId } = req.params;
      const enrollments = mockRepository.getEnrollmentsByStudent(parseInt(studentId));
      const jsonEnrollments = enrollments.map(e => e.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${enrollments.length} enrollments for student`,
        data: jsonEnrollments,
        count: enrollments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving enrollments',
        error: error.message
      });
    }
  }

  /**
   * Get enrollments for a course
   */
  static getEnrollmentsByCourse(req, res) {
    try {
      const { courseId } = req.params;
      const enrollments = mockRepository.getEnrollmentsByCourse(parseInt(courseId));
      const jsonEnrollments = enrollments.map(e => e.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${enrollments.length} enrollments for course`,
        data: jsonEnrollments,
        count: enrollments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving enrollments',
        error: error.message
      });
    }
  }

  // ===== ASSIGNMENT ENDPOINTS =====

  /**
   * Get all assignments
   */
  static getAllAssignments(req, res) {
    try {
      const assignments = mockRepository.getAllAssignments();
      const jsonAssignments = assignments.map(a => a.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${assignments.length} assignments`,
        data: jsonAssignments,
        count: assignments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving assignments',
        error: error.message
      });
    }
  }

  /**
   * Get assignments for a course
   */
  static getAssignmentsByCourse(req, res) {
    try {
      const { courseId } = req.params;
      const assignments = mockRepository.getAssignmentsByCourse(parseInt(courseId));
      const jsonAssignments = assignments.map(a => a.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${assignments.length} assignments for course`,
        data: jsonAssignments,
        count: assignments.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving assignments',
        error: error.message
      });
    }
  }

  // ===== SUBMISSION ENDPOINTS =====

  /**
   * Get all submissions
   */
  static getAllSubmissions(req, res) {
    try {
      const submissions = mockRepository.getAllSubmissions();
      const jsonSubmissions = submissions.map(s => s.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${submissions.length} submissions`,
        data: jsonSubmissions,
        count: submissions.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving submissions',
        error: error.message
      });
    }
  }

  /**
   * Get submissions for an assignment
   */
  static getSubmissionsByAssignment(req, res) {
    try {
      const { assignmentId } = req.params;
      const submissions = mockRepository.getSubmissionsByAssignment(parseInt(assignmentId));
      const jsonSubmissions = submissions.map(s => s.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${submissions.length} submissions for assignment`,
        data: jsonSubmissions,
        count: submissions.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving submissions',
        error: error.message
      });
    }
  }

  /**
   * Get submissions by student
   */
  static getSubmissionsByStudent(req, res) {
    try {
      const { studentId } = req.params;
      const submissions = mockRepository.getSubmissionsByStudent(parseInt(studentId));
      const jsonSubmissions = submissions.map(s => s.toJSON());

      res.status(200).json({
        success: true,
        message: `Retrieved ${submissions.length} submissions for student`,
        data: jsonSubmissions,
        count: submissions.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving submissions',
        error: error.message
      });
    }
  }

  // ===== GRADE ENDPOINTS =====

  /**
   * Get all grades
   */
  static getAllGrades(req, res) {
    try {
      const grades = mockRepository.getAllGrades();
      const jsonGrades = grades.map(g => g.toJSON(100)); // Assuming maxPoints = 100

      res.status(200).json({
        success: true,
        message: `Retrieved ${grades.length} grades`,
        data: jsonGrades,
        count: grades.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving grades',
        error: error.message
      });
    }
  }

  /**
   * Get grades by instructor
   */
  static getGradesByInstructor(req, res) {
    try {
      const { instructorId } = req.params;
      const grades = mockRepository.getGradesByInstructor(parseInt(instructorId));
      const jsonGrades = grades.map(g => g.toJSON(100));

      res.status(200).json({
        success: true,
        message: `Retrieved ${grades.length} grades for instructor`,
        data: jsonGrades,
        count: grades.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving grades',
        error: error.message
      });
    }
  }
}

module.exports = { DataAccessController };
