/**
 * Dashboard Controller
 * Handles student and instructor dashboards
 */

const { mockRepository } = require('../data/mockRepository');

class DashboardController {
  /**
   * Get home page
   */
  static getHome(req, res) {
    if (req.session.user) {
      if (req.session.user.role === 'Student') {
        return res.redirect('/student-dashboard');
      } else if (req.session.user.role === 'Instructor') {
        return res.redirect('/instructor-dashboard');
      }
    }
    res.render('home', { title: 'Welcome - LMS' });
  }

  /**
   * Get student dashboard
   */
  static getStudentDashboard(req, res) {
    try {
      const user = req.session.user;
      
      // Get student's enrollments (only active ones)
      const allEnrollments = mockRepository.getEnrollmentsByStudent(user.userId);
      const enrollments = allEnrollments.filter(e => e.status === 'Active');
      const enrollmentData = enrollments.map(e => {
        const course = mockRepository.getCourseById(e.courseId);
        const assignments = mockRepository.getAssignmentsByCourse(e.courseId);
        const submissions = mockRepository.getSubmissionsByStudent(user.userId);
        const relevantSubmissions = submissions.filter(s => 
          assignments.some(a => a.assignmentId === s.assignmentId)
        );
        
        return {
          enrollmentId: e.enrollmentId,
          courseId: course.courseId,
          courseTitle: course.title,
          courseDescription: course.description,
          grade: e.grade,
          letterGrade: e.getLetterGrade(),
          completionPercentage: e.completionPercentage,
          status: e.status,
          assignmentCount: assignments.length,
          submissionCount: relevantSubmissions.length
        };
      });

      res.render('student-dashboard', {
        title: 'Student Dashboard',
        user: user,
        enrollments: enrollmentData,
        enrollmentCount: enrollments.length
      });
    } catch (error) {
      res.render('error', { 
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Get instructor dashboard
   */
  static getInstructorDashboard(req, res) {
    try {
      const user = req.session.user;
      
      // Get instructor's courses
      const courses = mockRepository.getCoursesByInstructor(user.userId);
      const courseData = courses.map(c => {
        const enrollments = mockRepository.getEnrollmentsByCourse(c.courseId);
        const assignments = mockRepository.getAssignmentsByCourse(c.courseId);
        const submissions = assignments.flatMap(a => 
          mockRepository.getSubmissionsByAssignment(a.assignmentId)
        );
        
        return {
          courseId: c.courseId,
          title: c.title,
          description: c.description,
          isPublished: c.isPublished,
          isActive: c.isActive(),
          enrollmentCount: enrollments.length,
          assignmentCount: assignments.length,
          submissionCount: submissions.length,
          startDate: c.startDate.toLocaleDateString(),
          endDate: c.endDate.toLocaleDateString()
        };
      });

      res.render('instructor-dashboard', {
        title: 'Instructor Dashboard',
        user: user,
        courses: courseData,
        courseCount: courses.length,
        totalEnrollments: courseData.reduce((sum, c) => sum + c.enrollmentCount, 0),
        totalAssignments: courseData.reduce((sum, c) => sum + c.assignmentCount, 0)
      });
    } catch (error) {
      res.render('error', { 
        error: error.message,
        title: 'Error'
      });
    }
  }
}

module.exports = { DashboardController };
