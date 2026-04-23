/**
 * Assignment Management Controller
 * Handles assignment creation, submission, and grading
 */

const { mockRepository } = require('../data/mockRepository');
const { Assignment } = require('../models/Assignment');
const { Submission } = require('../models/Submission');
const { Grade } = require('../models/Grade');
const { sendSubmissionNotification, sendGradeNotification } = require('../utils/email_helper');

class AssignmentController {
  /**
   * Get create assignment page
   */
  static getCreateAssignmentPage(req, res) {
    const { courseId } = req.params;
    const course = mockRepository.getCourseById(parseInt(courseId));

    if (!course || course.instructorId !== req.session.user.userId) {
      return res.render('error', {
        error: 'Unauthorized',
        title: 'Error'
      });
    }

    res.render('create-assignment', {
      title: 'Create Assignment',
      user: req.session.user,
      courseId: courseId,
      course: course
    });
  }

  /**
   * Handle create assignment
   */
  static postCreateAssignment(req, res) {
    try {
      const { courseId } = req.params;
      const { title, description, dueDate, maxPoints } = req.body;

      const course = mockRepository.getCourseById(parseInt(courseId));
      if (!course || course.instructorId !== req.session.user.userId) {
        return res.render('error', {
          error: 'Unauthorized',
          title: 'Error'
        });
      }

      // Validate input
      if (!title || !description || !dueDate || !maxPoints) {
        return res.render('create-assignment', {
          error: 'All fields are required',
          courseId: courseId,
          course: course,
          title: 'Create Assignment',
          user: req.session.user
        });
      }

      // Create new assignment
      const newAssignmentId = Math.max(...mockRepository.getAllAssignments().map(a => a.assignmentId)) + 1;
      const newAssignment = new Assignment(
        newAssignmentId,
        parseInt(courseId),
        title,
        description,
        new Date(dueDate),
        parseInt(maxPoints)
      );
      newAssignment.publish();

      mockRepository.assignments.push(newAssignment);
      req.session.flash = { success: `Assignment "${title}" created successfully!` };
      res.redirect(`/course/${courseId}`);
    } catch (error) {
      res.render('create-assignment', {
        error: 'Failed to create assignment: ' + error.message,
        courseId: courseId,
        title: 'Create Assignment',
        user: req.session.user
      });
    }
  }

  /**
   * Get assignment detail page
   */
  static getAssignmentPage(req, res) {
    try {
      const { assignmentId } = req.params;
      const assignment = mockRepository.getAllAssignments().find(a => a.assignmentId === parseInt(assignmentId));

      if (!assignment) {
        return res.render('error', {
          error: 'Assignment not found',
          title: 'Error'
        });
      }

      const course = mockRepository.getCourseById(assignment.courseId);
      const submissions = mockRepository.getSubmissionsByAssignment(parseInt(assignmentId));
      const isInstructor = course.instructorId === req.session.user.userId;
      const studentSubmission = submissions.find(s => s.studentId === req.session.user.userId);

      res.render('assignment-detail', {
        title: assignment.title,
        user: req.session.user,
        assignment: assignment.toJSON(),
        course: course,
        submissions: submissions,
        studentSubmission: studentSubmission,
        isInstructor: isInstructor,
        submissionCount: submissions.length
      });
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Get submit assignment page
   */
  static getSubmitAssignmentPage(req, res) {
    try {
      const { assignmentId } = req.params;
      const assignment = mockRepository.getAllAssignments().find(a => a.assignmentId === parseInt(assignmentId));

      if (!assignment) {
        return res.render('error', {
          error: 'Assignment not found',
          title: 'Error'
        });
      }

      // Check if student is enrolled in course
      const enrollments = mockRepository.getEnrollmentsByStudent(req.session.user.userId);
      const isEnrolled = enrollments.some(e => e.courseId === assignment.courseId);

      if (!isEnrolled) {
        return res.render('error', {
          error: 'You are not enrolled in this course',
          title: 'Error'
        });
      }

      const course = mockRepository.getCourseById(assignment.courseId);
      const existingSubmission = mockRepository.getSubmissionsByAssignment(parseInt(assignmentId))
        .find(s => s.studentId === req.session.user.userId);

      res.render('submit-assignment', {
        title: 'Submit Assignment: ' + assignment.title,
        user: req.session.user,
        assignment: assignment,
        course: course,
        existingSubmission: existingSubmission,
        assignmentId: assignmentId
      });
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Handle assignment submission
   */
  static postSubmitAssignment(req, res) {
    try {
      const { assignmentId } = req.params;
      const { content } = req.body;

      const assignment = mockRepository.getAllAssignments().find(a => a.assignmentId === parseInt(assignmentId));
      if (!assignment) {
        return res.render('error', {
          error: 'Assignment not found',
          title: 'Error'
        });
      }

      const studentId = req.session.user.userId;
      let submission = mockRepository.getSubmissionsByAssignment(parseInt(assignmentId))
        .find(s => s.studentId === studentId);

      if (!submission) {
        // Create new submission
        const newSubmissionId = Math.max(...mockRepository.getAllSubmissions().map(s => s.submissionId)) + 1;
        submission = new Submission(
          newSubmissionId,
          parseInt(assignmentId),
          studentId,
          new Date()
        );
        mockRepository.submissions.push(submission);
      }

      // Update submission
      submission.textContent = content;
      submission.submittedAt = new Date();

      if (assignment.isLateSubmission(new Date())) {
        submission.markLate();
      }

      // Notify instructor of new submission (non-blocking)
      const course = mockRepository.getCourseById(assignment.courseId);
      const instructor = course ? mockRepository.getUserById(course.instructorId) : null;
      const student = mockRepository.getUserById(studentId);
      if (instructor && student) {
        sendSubmissionNotification(
          instructor.email,
          `${instructor.firstName} ${instructor.lastName}`,
          `${student.firstName} ${student.lastName}`,
          assignment.title,
          course.title
        ).catch(() => {});
      }

      req.session.flash = { success: 'Assignment submitted successfully!' };
      res.redirect(`/assignment/${assignmentId}`);
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Get grading page
   */
  static getGradingPage(req, res) {
    try {
      const { submissionId } = req.params;
      const submission = mockRepository.getAllSubmissions().find(s => s.submissionId === parseInt(submissionId));

      if (!submission) {
        return res.render('error', {
          error: 'Submission not found',
          title: 'Error'
        });
      }

      const assignment = mockRepository.getAllAssignments().find(a => a.assignmentId === submission.assignmentId);
      const course = mockRepository.getCourseById(assignment.courseId);

      // Check authorization
      if (course.instructorId !== req.session.user.userId) {
        return res.render('error', {
          error: 'Unauthorized',
          title: 'Error'
        });
      }

      const student = mockRepository.getUserById(submission.studentId);
      const existingGrade = mockRepository.getAllGrades().find(g => g.submissionId === parseInt(submissionId));

      res.render('grade-submission', {
        title: 'Grade Submission',
        user: req.session.user,
        submission: submission,
        assignment: assignment,
        course: course,
        student: student,
        existingGrade: existingGrade,
        submissionId: submissionId
      });
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Handle grading
   */
  static postGradeSubmission(req, res) {
    try {
      const { submissionId } = req.params;
      const { pointsEarned, comments, feedback } = req.body;

      const submission = mockRepository.getAllSubmissions().find(s => s.submissionId === parseInt(submissionId));
      if (!submission) {
        return res.render('error', {
          error: 'Submission not found',
          title: 'Error'
        });
      }

      submission.markGraded();

      let grade = mockRepository.getAllGrades().find(g => g.submissionId === parseInt(submissionId));

      if (!grade) {
        // Create new grade
        const newGradeId = Math.max(...mockRepository.getAllGrades().map(g => g.gradeId)) + 1;
        grade = new Grade(
          newGradeId,
          parseInt(submissionId),
          req.session.user.userId,
          parseInt(pointsEarned),
          new Date()
        );
        mockRepository.grades.push(grade);
      } else {
        // Update existing grade
        grade.pointsEarned = parseInt(pointsEarned);
      }

      if (comments) grade.addComments(comments);
      if (feedback) grade.addFeedback(feedback);

      const assignment = mockRepository.getAllAssignments().find(a => a.assignmentId === submission.assignmentId);

      // Notify student their grade is posted (non-blocking)
      const course = mockRepository.getCourseById(assignment.courseId);
      const student = mockRepository.getUserById(submission.studentId);
      if (student && course) {
        sendGradeNotification(
          student.email,
          `${student.firstName} ${student.lastName}`,
          assignment.title,
          course.title,
          parseInt(pointsEarned),
          assignment.maxPoints
        ).catch(() => {});
      }

      req.session.flash = { success: `Grade posted: ${pointsEarned}/${assignment.maxPoints} points.` };
      res.redirect(`/assignment/${assignment.assignmentId}`);
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }

  /**
   * Get student grades page
   */
  static getStudentGradesPage(req, res) {
    try {
      const userId = req.session.user.userId;
      const submissions = mockRepository.getSubmissionsByStudent(userId);
      
      const grades = submissions.map(s => {
        const assignment = mockRepository.getAllAssignments().find(a => a.assignmentId === s.assignmentId);
        const course = mockRepository.getCourseById(assignment.courseId);
        const grade = mockRepository.getAllGrades().find(g => g.submissionId === s.submissionId);

        return {
          submissionId: s.submissionId,
          assignmentId: assignment.assignmentId,
          assignmentTitle: assignment.title,
          courseTitle: course.title,
          courseId: course.courseId,
          pointsEarned: grade ? grade.pointsEarned : null,
          maxPoints: assignment.maxPoints,
          percentage: grade ? grade.getPercentage(assignment.maxPoints) : null,
          letterGrade: grade ? grade.getLetterGrade(assignment.maxPoints) : null,
          comments: grade ? grade.comments : null,
          feedback: grade ? grade.feedback : null,
          submittedAt: s.submittedAt,
          isLate: s.isLate,
          status: grade ? 'Graded' : 'Pending'
        };
      });

      const gradedGrades = grades.filter(g => g.percentage !== null);
      const gpa = gradedGrades.length
        ? Math.round(gradedGrades.reduce((sum, g) => sum + g.percentage, 0) / gradedGrades.length)
        : null;

      res.render('student-grades', {
        title: 'My Grades',
        user: req.session.user,
        grades: grades,
        gpa: gpa,
        gradedCount: gradedGrades.length
      });
    } catch (error) {
      res.render('error', {
        error: error.message,
        title: 'Error'
      });
    }
  }
}

module.exports = { AssignmentController };
