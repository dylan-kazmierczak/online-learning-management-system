/**
 * Mock Repository Integration Tests
 * Tests for the data access layer - verifies all repository methods work correctly
 */

const { mockRepository } = require('../src/data/mockRepository');

describe('MockRepository - Users', () => {
  test('getAllUsers returns a non-empty array', () => {
    const users = mockRepository.getAllUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  test('getUserById returns the correct user', () => {
    const user = mockRepository.getUserById(1);
    expect(user).toBeDefined();
    expect(user.userId).toBe(1);
  });

  test('getUserById returns null for non-existent user', () => {
    const user = mockRepository.getUserById(9999);
    expect(user).toBeNull();
  });

  test('getUserById returns user with correct email', () => {
    const user = mockRepository.getUserById(1);
    expect(user).toBeDefined();
    expect(user.email).toBe('john.smith@university.edu');
  });
});

describe('MockRepository - Courses', () => {
  test('getAllCourses returns a non-empty array', () => {
    const courses = mockRepository.getAllCourses();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);
  });

  test('getCourseById returns the correct course', () => {
    const course = mockRepository.getCourseById(1);
    expect(course).toBeDefined();
    expect(course.courseId).toBe(1);
  });

  test('getCourseById returns null for unknown course', () => {
    const course = mockRepository.getCourseById(9999);
    expect(course).toBeNull();
  });

  test('all courses have required fields', () => {
    const courses = mockRepository.getAllCourses();
    courses.forEach(c => {
      expect(c.courseId).toBeDefined();
      expect(c.title).toBeDefined();
      expect(c.description).toBeDefined();
    });
  });
});

describe('MockRepository - Enrollments', () => {
  test('getEnrollmentsByStudent returns enrollments for a given student', () => {
    const enrollments = mockRepository.getEnrollmentsByStudent(1);
    expect(Array.isArray(enrollments)).toBe(true);
    enrollments.forEach(e => expect(e.studentId).toBe(1));
  });

  test('getEnrollmentsByCourse returns enrollments for a given course', () => {
    const enrollments = mockRepository.getEnrollmentsByCourse(1);
    expect(Array.isArray(enrollments)).toBe(true);
    enrollments.forEach(e => expect(e.courseId).toBe(1));
  });

  test('returns empty array for student with no enrollments', () => {
    const enrollments = mockRepository.getEnrollmentsByStudent(9999);
    expect(enrollments).toEqual([]);
  });
});

describe('MockRepository - Assignments', () => {
  test('getAllAssignments returns a non-empty array', () => {
    const assignments = mockRepository.getAllAssignments();
    expect(Array.isArray(assignments)).toBe(true);
    expect(assignments.length).toBeGreaterThan(0);
  });

  test('getAssignmentsByCourse returns only assignments for that course', () => {
    const assignments = mockRepository.getAssignmentsByCourse(1);
    assignments.forEach(a => expect(a.courseId).toBe(1));
  });
});

describe('MockRepository - Grades', () => {
  test('getAllGrades returns a non-empty array', () => {
    const grades = mockRepository.getAllGrades();
    expect(Array.isArray(grades)).toBe(true);
    expect(grades.length).toBeGreaterThan(0);
  });

  test('getGradeBySubmission returns grade for valid submission', () => {
    const grade = mockRepository.getGradeBySubmission(1);
    expect(grade).toBeDefined();
    expect(grade.submissionId).toBe(1);
  });

  test('getGradeBySubmission returns null for missing submission', () => {
    const grade = mockRepository.getGradeBySubmission(9999);
    expect(grade).toBeNull();
  });
});

describe('MockRepository - Discussions', () => {
  test('getDiscussionsByCourse returns discussions for a course', () => {
    const discussions = mockRepository.getDiscussionsByCourse(1);
    expect(Array.isArray(discussions)).toBe(true);
    discussions.forEach(d => expect(d.courseId).toBe(1));
  });

  test('pinned discussions appear first', () => {
    const discussions = mockRepository.getDiscussionsByCourse(1);
    const pinnedIndex = discussions.findIndex(d => d.isPinned);
    const unpinnedIndex = discussions.findIndex(d => !d.isPinned);
    if (pinnedIndex !== -1 && unpinnedIndex !== -1) {
      expect(pinnedIndex).toBeLessThan(unpinnedIndex);
    }
  });

  test('getDiscussionById returns the correct discussion', () => {
    const discussion = mockRepository.getDiscussionById(1);
    expect(discussion).toBeDefined();
    expect(discussion.discussionId).toBe(1);
  });

  test('getDiscussionById returns null for unknown id', () => {
    const discussion = mockRepository.getDiscussionById(9999);
    expect(discussion).toBeNull();
  });
});

describe('MockRepository - System Stats', () => {
  test('getSystemStatistics returns correct shape', () => {
    const stats = mockRepository.getSystemStatistics();
    expect(stats).toHaveProperty('totalUsers');
    expect(stats).toHaveProperty('totalCourses');
    expect(stats).toHaveProperty('totalEnrollments');
    expect(stats).toHaveProperty('totalAssignments');
    expect(stats).toHaveProperty('totalSubmissions');
    expect(stats).toHaveProperty('totalGrades');
    expect(stats.totalUsers).toBeGreaterThan(0);
    expect(stats.totalCourses).toBeGreaterThan(0);
  });
});
