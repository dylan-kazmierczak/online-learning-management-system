/**
 * User Model
 * Represents a user in the LMS system (Student, Instructor, or Admin)
 */
class User {
  constructor(userId, email, firstName, lastName, role, createdAt = new Date()) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role; // Student, Instructor, Admin
    this.createdAt = createdAt;
    this.updatedAt = createdAt;
  }

  /**
   * Get the user's full name
   */
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Check if user is an instructor
   */
  isInstructor() {
    return this.role === 'Instructor';
  }

  /**
   * Check if user is a student
   */
  isStudent() {
    return this.role === 'Student';
  }

  /**
   * Convert to JSON for API response
   */
  toJSON() {
    return {
      userId: this.userId,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.getFullName(),
      role: this.role,
      createdAt: this.createdAt
    };
  }
}

module.exports = { User };
