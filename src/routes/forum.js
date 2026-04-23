/**
 * Forum Routes
 * Course discussion forum endpoints
 */

const { Router } = require('express');
const { ForumController } = require('../controllers/forumController');
const { requireLogin } = require('../utils/auth_middleware');

const router = Router();

// View forum for a course
router.get('/course/:courseId/forum', requireLogin(), ForumController.getForumPage);

// Create a new discussion thread
router.post('/course/:courseId/forum', requireLogin(), ForumController.postCreateDiscussion);

// Reply to a discussion
router.post('/course/:courseId/forum/:discussionId/reply', requireLogin(), ForumController.postReply);

// Delete a discussion
router.post('/course/:courseId/forum/:discussionId/delete', requireLogin(), ForumController.postDeleteDiscussion);

// Pin or unpin a discussion (instructor only)
router.post('/course/:courseId/forum/:discussionId/pin', requireLogin(), ForumController.postPinDiscussion);

module.exports = { forum_router: router };
