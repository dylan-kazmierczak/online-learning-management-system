/**
 * Discussion Model
 * Represents a forum post/thread within a course
 */

class Discussion {
  constructor(discussionId, courseId, authorId, title, content, createdAt = new Date()) {
    this.discussionId = discussionId;
    this.courseId = courseId;
    this.authorId = authorId;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.replies = []; // Array of Reply objects
    this.isPinned = false;
  }

  addReply(replyId, authorId, content) {
    this.replies.push({
      replyId,
      authorId,
      content,
      createdAt: new Date()
    });
  }

  pin() {
    this.isPinned = true;
  }

  unpin() {
    this.isPinned = false;
  }

  toJSON() {
    return {
      discussionId: this.discussionId,
      courseId: this.courseId,
      authorId: this.authorId,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      replies: this.replies,
      isPinned: this.isPinned,
      replyCount: this.replies.length
    };
  }
}

module.exports = { Discussion };
