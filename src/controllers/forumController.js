/**
 * Forum Controller
 * Handles course discussion forums
 */

const { mockRepository } = require('../data/mockRepository');
const { Discussion } = require('../models/Discussion');

class ForumController {
  /**
   * List all discussions for a course
   */
  static getForumPage(req, res) {
    try {
      const { courseId } = req.params;
      const course = mockRepository.getCourseById(parseInt(courseId));

      if (!course) {
        return res.render('error', { error: 'Course not found', title: 'Error' });
      }

      // Check access: must be enrolled or instructor
      const isInstructor = course.instructorId === req.session.user.userId;
      const enrollments = mockRepository.getEnrollmentsByCourse(parseInt(courseId));
      const isEnrolled = enrollments.some(e => e.studentId === req.session.user.userId);

      if (!isInstructor && !isEnrolled) {
        return res.render('error', { error: 'You must be enrolled to view this forum', title: 'Error' });
      }

      const discussions = mockRepository.getDiscussionsByCourse(parseInt(courseId));

      // Attach author name to each discussion and reply
      const allUsers = mockRepository.getAllUsers();
      const enriched = discussions.map(d => {
        const author = allUsers.find(u => u.userId === d.authorId);
        const replies = d.replies.map(r => {
          const replyAuthor = allUsers.find(u => u.userId === r.authorId);
          return {
            ...r,
            authorName: replyAuthor ? `${replyAuthor.firstName} ${replyAuthor.lastName}` : 'Unknown'
          };
        });
        return {
          ...d.toJSON(),
          authorName: author ? `${author.firstName} ${author.lastName}` : 'Unknown',
          replies
        };
      });

      res.render('forum', {
        title: `${course.title} - Forum`,
        user: req.session.user,
        course,
        discussions: enriched,
        isInstructor
      });
    } catch (error) {
      res.render('error', { error: error.message, title: 'Error' });
    }
  }

  /**
   * Create a new discussion thread
   */
  static postCreateDiscussion(req, res) {
    try {
      const { courseId } = req.params;
      const { title, content } = req.body;

      if (!title || !title.trim() || !content || !content.trim()) {
        return res.redirect(`/course/${courseId}/forum`);
      }

      const newId = mockRepository.discussions.length
        ? Math.max(...mockRepository.discussions.map(d => d.discussionId)) + 1
        : 1;

      const discussion = new Discussion(
        newId,
        parseInt(courseId),
        req.session.user.userId,
        title.trim(),
        content.trim()
      );

      mockRepository.discussions.push(discussion);
      req.session.flash = { success: 'Discussion posted!' };
      res.redirect(`/course/${courseId}/forum`);
    } catch (error) {
      res.render('error', { error: error.message, title: 'Error' });
    }
  }

  /**
   * Add a reply to a discussion
   */
  static postReply(req, res) {
    try {
      const { courseId, discussionId } = req.params;
      const { content } = req.body;

      if (!content || !content.trim()) {
        return res.redirect(`/course/${courseId}/forum`);
      }

      const discussion = mockRepository.getDiscussionById(parseInt(discussionId));
      if (!discussion) {
        return res.render('error', { error: 'Discussion not found', title: 'Error' });
      }

      const newReplyId = discussion.replies.length
        ? Math.max(...discussion.replies.map(r => r.replyId)) + 1
        : 1;

      discussion.addReply(newReplyId, req.session.user.userId, content.trim());
      req.session.flash = { success: 'Reply posted!' };
      res.redirect(`/course/${courseId}/forum`);
    } catch (error) {
      res.render('error', { error: error.message, title: 'Error' });
    }
  }

  /**
   * Delete a discussion (author or instructor only)
   */
  static postDeleteDiscussion(req, res) {
    try {
      const { courseId, discussionId } = req.params;
      const course = mockRepository.getCourseById(parseInt(courseId));
      const discussion = mockRepository.getDiscussionById(parseInt(discussionId));

      if (!discussion) {
        return res.redirect(`/course/${courseId}/forum`);
      }

      const isAuthor = discussion.authorId === req.session.user.userId;
      const isInstructor = course && course.instructorId === req.session.user.userId;

      if (isAuthor || isInstructor) {
        mockRepository.discussions = mockRepository.discussions.filter(d => d.discussionId !== parseInt(discussionId));
        req.session.flash = { success: 'Discussion deleted.' };
      }

      res.redirect(`/course/${courseId}/forum`);
    } catch (error) {
      res.render('error', { error: error.message, title: 'Error' });
    }
  }
  /**
   * Pin or unpin a discussion (instructor only)
   */
  static postPinDiscussion(req, res) {
    try {
      const { courseId, discussionId } = req.params;
      const course = mockRepository.getCourseById(parseInt(courseId));

      if (!course || course.instructorId !== req.session.user.userId) {
        return res.render('error', { error: 'Unauthorized', title: 'Error' });
      }

      const discussion = mockRepository.getDiscussionById(parseInt(discussionId));
      if (!discussion) {
        return res.redirect(`/course/${courseId}/forum`);
      }

      if (discussion.isPinned) {
        discussion.unpin();
        req.session.flash = { success: 'Discussion unpinned.' };
      } else {
        discussion.pin();
        req.session.flash = { success: 'Discussion pinned to top.' };
      }

      res.redirect(`/course/${courseId}/forum`);
    } catch (error) {
      res.render('error', { error: error.message, title: 'Error' });
    }
  }
}

module.exports = { ForumController };
