/**
 * Enrollment Model
 * Represents a student's enrollment in a course
 */
class Enrollment {
  constructor(enrollmentId, studentId, courseId, enrolledDate = new Date()) {
    this.enrollmentId = enrollmentId;
    this.studentId = studentId;
    this.courseId = courseId;
    this.enrolledDate = enrolledDate;
    this.grade = null;
    this.completionPercentage = 0;
    this.status = 'Active'; // Active, Completed, Dropped
  }

  /**
   * Set the student's grade
   */
  setGrade(grade) {
    this.grade = grade;
  }

  /**
   * Update completion percentage
   */
  updateCompletion(percentage) {
    this.completionPercentage = Math.min(100, Math.max(0, percentage));
  }

  /**
   * Mark course as completed
   */
  markCompleted() {
    this.status = 'Completed';
    this.completionPercentage = 100;
  }

  /**
   * Drop the course
   */
  drop() {
    this.status = 'Dropped';
  }

  /**
   * Get letter grade from percentage grade
   */
  getLetterGrade() {
    if (this.grade === null) return null;
    if (this.grade >= 90) return 'A';
    if (this.grade >= 80) return 'B';
    if (this.grade >= 70) return 'C';
    if (this.grade >= 60) return 'D';
    return 'F';
  }

  /**
   * Convert to JSON for API response
   */
  toJSON() {
    return {
      enrollmentId: this.enrollmentId,
      studentId: this.studentId,
      courseId: this.courseId,
      enrolledDate: this.enrolledDate,
      grade: this.grade,
      letterGrade: this.getLetterGrade(),
      completionPercentage: this.completionPercentage,
      status: this.status
    };
  }
}

module.exports = { Enrollment };
