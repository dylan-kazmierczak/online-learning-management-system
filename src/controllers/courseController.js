/**
 * Course Management Controller
 * Handles course creation, enrollment, and management
 */

const { mockRepository } = require('../data/mockRepository');
const { Course } = require('../models/Course');
const { Enrollment } = require('../models/Enrollment');
const { sendEnrollmentNotification } = require('../utils/email_helper');

class CourseController {
  /**
   * Get create course page
   */
  static getCreateCoursePage(req, res) {
    res.render('create-course', { 
      title: 'Create Course',
      user: req.session.user
    });
  }

  /**
   * Handle create course
   */
  static postCreateCourse(req, res) {
    try {
      const { title, description, startDate, endDate, enrollmentLimit } = req.body;
      const instructorId = req.session.user.userId;

      // Validate input
      if (!title || !description || !startDate || !endDate) {
        return res.render('create-course', {
          error: 'All fields are required',
          title: 'Create Course',
          user: req.session.user
        });
      }

      // Validate date range
      if (new Date(endDate) <= new Date(startDate)) {
        return res.render('create-course', {
          error: 'End date must be after start date',
          title: 'Create Course',
          user: req.session.user
        });
      }

      // Create new course
      const newCourseId = Math.max(...mockRepository.getAllCourses().map(c => c.courseId)) + 1;
      const newCourse = new Course(
        newCourseId,
        instructorId,
        title,
        description,
        new Date(startDate),
        new Date(endDate),
        parseInt(enrollmentLimit) || 50
      );
      newCourse.publish();

      mockRepository.courses.push(newCourse);

      req.session.flash = { success: `Course "${title}" created successfully!` };
      res.redirect(`/course/${newCourseId}`);
    } catch (error) {
      res.render('create-course', {
        error: 'Failed to create course: ' + error.message,
        title: 'Create Course',
        user: req.session.user
      });
    }
  }

  /**
   * Get course detail page
   */
  static getCoursePage(req, res) {
    try {
      const { courseId } = req.params;
      const course = mockRepository.getCourseById(parseInt(courseId));

      if (!course) {
        return res.render('error', {
          error: 'Course not found',
          title: 'Course Not Found'
        });
      }

      const enrollments = mockRepository.getEnrollmentsByCourse(parseInt(courseId));
      const assignments = mockRepository.getAssignmentsByCourse(parseInt(courseId));
      const isEnrolled = enrollments.some(e => e.studentId === req.session.user.userId);
      const studentEnrollment = enrollments.find(e => e.studentId === req.session.user.userId);
      const isInstructor = course.instructorId === req.session.user.userId;

      res.render('course-detail', {
        title: course.title,
        course: course,
        user: req.session.user,
        enrollmentCount: enrollments.length,
        assignmentCount: assignments.length,
        assignments: assignments,
        isEnrolled: isEnrolled,
        enrollmentId: studentEnrollment ? studentEnrollment.enrollmentId : null,
        isInstructor: isInstructor,
        durationWeeks: course.getDurationInWeeks()
      });
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Get enroll course page with search and filter support
   */
  static getEnrollPage(req, res) {
    const { search = '', instructor: instructorFilter = '' } = req.query;

    const allCourses = mockRepository.getAllCourses().filter(c => c.isPublished);
    const studentEnrollments = mockRepository.getEnrollmentsByStudent(req.session.user.userId);
    const enrolledCourseIds = studentEnrollments.map(e => e.courseId);
    let availableCourses = allCourses.filter(c => !enrolledCourseIds.includes(c.courseId));

    // Search by title or description
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      availableCourses = availableCourses.filter(c =>
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
      );
    }

    // Filter by instructor
    if (instructorFilter) {
      availableCourses = availableCourses.filter(c => c.instructorId === parseInt(instructorFilter));
    }

    // Build instructor list for filter dropdown
    const instructors = mockRepository.getAllUsers()
      .filter(u => u.role === 'Instructor')
      .map(u => ({ userId: u.userId, name: `${u.firstName} ${u.lastName}` }));

    res.render('enroll-course', {
      title: 'Enroll in Course',
      user: req.session.user,
      courses: availableCourses,
      instructors,
      search,
      selectedInstructor: instructorFilter,
      resultCount: availableCourses.length
    });
  }

  /**
   * Handle course enrollment
   */
  static postEnrollCourse(req, res) {
    try {
      const { courseId } = req.body;
      const studentId = req.session.user.userId;

      const course = mockRepository.getCourseById(parseInt(courseId));
      if (!course) {
        return res.render('error', {
          error: 'Course not found',
          title: 'Error'
        });
      }

      // Check if already enrolled
      const existingEnrollment = mockRepository.getEnrollmentsByCourse(parseInt(courseId))
        .find(e => e.studentId === studentId);
      
      if (existingEnrollment) {
        return res.render('error', {
          error: 'You are already enrolled in this course',
          title: 'Enrollment Error'
        });
      }

      // Create enrollment
      const newEnrollmentId = Math.max(...mockRepository.getAllEnrollments().map(e => e.enrollmentId)) + 1;
      const newEnrollment = new Enrollment(
        newEnrollmentId,
        studentId,
        parseInt(courseId),
        new Date()
      );

      mockRepository.enrollments.push(newEnrollment);

      // Send enrollment confirmation email (non-blocking)
      const student = mockRepository.getUserById(studentId);
      const enrolledCourse = mockRepository.getCourseById(parseInt(courseId));
      if (student && enrolledCourse) {
        sendEnrollmentNotification(
          student.email,
          `${student.firstName} ${student.lastName}`,
          enrolledCourse.title
        ).catch(() => {});
      }

      req.session.flash = { success: `Successfully enrolled in "${enrolledCourse ? enrolledCourse.title : 'course'}"!` };
      res.redirect(`/course/${courseId}`);
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Handle course unenrollment
   */
  static postUnenrollCourse(req, res) {
    try {
      const { enrollmentId } = req.body;
      
      const enrollment = mockRepository.getAllEnrollments().find(e => 
        e.enrollmentId === parseInt(enrollmentId)
      );

      if (!enrollment) {
        return res.render('error', {
          error: 'Enrollment not found',
          title: 'Error'
        });
      }

      enrollment.drop();
      res.redirect('/student-dashboard');
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Get upload content page
   */
  static getUploadContentPage(req, res) {
    const { courseId } = req.params;
    const course = mockRepository.getCourseById(parseInt(courseId));

    if (!course || course.instructorId !== req.session.user.userId) {
      return res.render('error', {
        error: 'Unauthorized',
        title: 'Error'
      });
    }

    res.render('upload-content', {
      title: 'Upload Course Content',
      user: req.session.user,
      course: course
    });
  }

  /**
   * Handle content upload
   */
  static postUploadContent(req, res) {
    try {
      const { courseId } = req.params;
      const { fileName, fileType, description } = req.body;

      const course = mockRepository.getCourseById(parseInt(courseId));
      if (!course || course.instructorId !== req.session.user.userId) {
        return res.render('error', {
          error: 'Unauthorized',
          title: 'Error'
        });
      }

      // In a real app, would handle file upload
      // For now, just store metadata
      if (!course.courseContent) {
        course.courseContent = [];
      }

      course.courseContent.push({
        fileName: fileName,
        fileType: fileType,
        description: description,
        uploadedAt: new Date(),
        uploadedBy: req.session.user.userId
      });

      res.redirect(`/course/${courseId}`);
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }
}

module.exports = { CourseController };
