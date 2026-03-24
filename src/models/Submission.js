/**
 * Submission Model
 * Represents a student's submission of an assignment
 */
class Submission {
  constructor(submissionId, assignmentId, studentId, submittedAt = new Date()) {
    this.submissionId = submissionId;
    this.assignmentId = assignmentId;
    this.studentId = studentId;
    this.submittedAt = submittedAt;
    this.filePath = null;
    this.textContent = null;
    this.status = 'Submitted'; // Submitted, Graded
    this.isLate = false;
  }

  /**
   * Mark submission as graded
   */
  markGraded() {
    this.status = 'Graded';
  }

  /**
   * Check if submission is pending grade
   */
  isPending() {
    return this.status === 'Submitted';
  }

  /**
   * Mark submission as late
   */
  markLate() {
    this.isLate = true;
  }

  /**
   * Convert to JSON for API response
   */
  toJSON() {
    return {
      submissionId: this.submissionId,
      assignmentId: this.assignmentId,
      studentId: this.studentId,
      submittedAt: this.submittedAt,
      filePath: this.filePath,
      textContent: this.textContent,
      status: this.status,
      isLate: this.isLate
    };
  }
}

module.exports = { Submission };
