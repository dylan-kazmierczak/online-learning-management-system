/**
 * Assignment Model
 * Represents an assignment in a course
 */
class Assignment {
  constructor(assignmentId, courseId, title, description, dueDate, maxPoints = 100) {
    this.assignmentId = assignmentId;
    this.courseId = courseId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.maxPoints = maxPoints;
    this.isPublished = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Publish the assignment
   */
  publish() {
    this.isPublished = true;
    this.updatedAt = new Date();
  }

  /**
   * Check if assignment is due
   */
  isDue() {
    return new Date() > this.dueDate;
  }

  /**
   * Get days until due
   */
  getDaysUntilDue() {
    const diffMs = this.dueDate - new Date();
    return Math.ceil(diffMs / (24 * 60 * 60 * 1000));
  }

  /**
   * Check if submission is late
   */
  isLateSubmission(submissionDate) {
    return submissionDate > this.dueDate;
  }

  /**
   * Convert to JSON for API response
   */
  toJSON() {
    return {
      assignmentId: this.assignmentId,
      courseId: this.courseId,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      maxPoints: this.maxPoints,
      isPublished: this.isPublished,
      isDue: this.isDue(),
      daysUntilDue: this.getDaysUntilDue(),
      createdAt: this.createdAt
    };
  }
}

module.exports = { Assignment };
