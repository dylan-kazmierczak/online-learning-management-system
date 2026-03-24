/**
 * Course Model
 * Represents a course in the LMS system
 */
class Course {
  constructor(courseId, instructorId, title, description, startDate, endDate, enrollmentLimit = 50) {
    this.courseId = courseId;
    this.instructorId = instructorId;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.enrollmentLimit = enrollmentLimit;
    this.isPublished = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Publish the course
   */
  publish() {
    this.isPublished = true;
    this.updatedAt = new Date();
  }

  /**
   * Unpublish the course
   */
  unpublish() {
    this.isPublished = false;
    this.updatedAt = new Date();
  }

  /**
   * Check if course is currently active
   */
  isActive() {
    const now = new Date();
    return this.startDate <= now && now <= this.endDate && this.isPublished;
  }

  /**
   * Get course duration in weeks
   */
  getDurationInWeeks() {
    if (!this.startDate || !this.endDate) return 0;
    const diffMs = this.endDate - this.startDate;
    return Math.ceil(diffMs / (7 * 24 * 60 * 60 * 1000));
  }

  /**
   * Convert to JSON for API response
   */
  toJSON() {
    return {
      courseId: this.courseId,
      instructorId: this.instructorId,
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      enrollmentLimit: this.enrollmentLimit,
      isPublished: this.isPublished,
      isActive: this.isActive(),
      durationWeeks: this.getDurationInWeeks(),
      createdAt: this.createdAt
    };
  }
}

module.exports = { Course };
