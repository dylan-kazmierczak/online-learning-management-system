/**
 * Grade Model
 * Represents a grade for a submitted assignment
 */
class Grade {
  constructor(gradeId, submissionId, instructorId, pointsEarned, gradedAt = new Date()) {
    this.gradeId = gradeId;
    this.submissionId = submissionId;
    this.instructorId = instructorId;
    this.pointsEarned = pointsEarned;
    this.gradedAt = gradedAt;
    this.comments = '';
    this.feedback = '';
  }

  /**
   * Add instructor comments
   */
  addComments(comments) {
    this.comments = comments;
  }

  /**
   * Add detailed feedback
   */
  addFeedback(feedback) {
    this.feedback = feedback;
  }

  /**
   * Calculate percentage score (assuming maxPoints is passed)
   */
  getPercentage(maxPoints) {
    if (maxPoints === 0) return 0;
    return Math.round((this.pointsEarned / maxPoints) * 100);
  }

  /**
   * Get letter grade from percentage
   */
  getLetterGrade(maxPoints) {
    const percentage = this.getPercentage(maxPoints);
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  /**
   * Convert to JSON for API response
   */
  toJSON(maxPoints = 100) {
    return {
      gradeId: this.gradeId,
      submissionId: this.submissionId,
      instructorId: this.instructorId,
      pointsEarned: this.pointsEarned,
      maxPoints: maxPoints,
      percentage: this.getPercentage(maxPoints),
      letterGrade: this.getLetterGrade(maxPoints),
      comments: this.comments,
      feedback: this.feedback,
      gradedAt: this.gradedAt
    };
  }
}

module.exports = { Grade };
