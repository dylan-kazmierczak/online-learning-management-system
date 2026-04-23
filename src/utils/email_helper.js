/**
 * Email Helper Utility
 * Handles sending email notifications for LMS events using Nodemailer.
 * 
 * In development (no SMTP config), uses Ethereal Email - a free fake SMTP service.
 * Sent emails can be previewed at the URL logged to the console.
 * 
 * To use a real mail server, set in your .env file:
 *   EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM
 */

const nodemailer = require('nodemailer');
const { logger } = require('./winston_helper');

/**
 * Create a transporter. Uses real SMTP if configured, otherwise Ethereal (fake inbox).
 */
async function createTransporter() {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Dev fallback: Ethereal fake SMTP - preview emails at https://ethereal.email
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

/**
 * Send an email notification.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} [html] - Optional HTML body
 */
async function sendEmail(to, subject, text, html) {
  try {
    const transporter = await createTransporter();
    const from = process.env.EMAIL_FROM || 'LMS Notifications <noreply@lms.edu>';

    const info = await transporter.sendMail({ from, to, subject, text, html });

    // Log Ethereal preview URL in dev mode
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      logger.info(`[EMAIL PREVIEW] ${subject} → ${previewUrl}`);
    } else {
      logger.info(`Email sent to ${to}: ${subject} (id: ${info.messageId})`);
    }

    return { success: true, messageId: info.messageId, previewUrl: previewUrl || null };
  } catch (err) {
    logger.error(`Failed to send email to ${to}: ${err.message}`);
    return { success: false, error: err.message };
  }
}

/**
 * Notify a student that they have been enrolled in a course.
 */
async function sendEnrollmentNotification(studentEmail, studentName, courseName) {
  const subject = `Enrollment Confirmed: ${courseName}`;
  const text = `Hi ${studentName},\n\nYou have successfully enrolled in "${courseName}".\n\nLog in to your LMS dashboard to get started.\n\nBest,\nLMS Team`;
  const html = `
    <h2>Enrollment Confirmed</h2>
    <p>Hi <strong>${studentName}</strong>,</p>
    <p>You have successfully enrolled in <strong>${courseName}</strong>.</p>
    <p>Log in to your <a href="${process.env.APP_URL || 'http://localhost:8080'}">LMS dashboard</a> to get started.</p>
    <br><p>Best,<br>LMS Team</p>
  `;
  return sendEmail(studentEmail, subject, text, html);
}

/**
 * Notify an instructor that a student submitted an assignment.
 */
async function sendSubmissionNotification(instructorEmail, instructorName, studentName, assignmentTitle, courseName) {
  const subject = `New Submission: ${assignmentTitle}`;
  const text = `Hi ${instructorName},\n\n${studentName} has submitted "${assignmentTitle}" for ${courseName}.\n\nLog in to grade the submission.\n\nBest,\nLMS Team`;
  const html = `
    <h2>New Assignment Submission</h2>
    <p>Hi <strong>${instructorName}</strong>,</p>
    <p><strong>${studentName}</strong> has submitted <strong>${assignmentTitle}</strong> for <em>${courseName}</em>.</p>
    <p>Log in to your <a href="${process.env.APP_URL || 'http://localhost:8080'}">LMS dashboard</a> to grade the submission.</p>
    <br><p>Best,<br>LMS Team</p>
  `;
  return sendEmail(instructorEmail, subject, text, html);
}

/**
 * Notify a student that their assignment has been graded.
 */
async function sendGradeNotification(studentEmail, studentName, assignmentTitle, courseName, score, maxScore) {
  const subject = `Grade Posted: ${assignmentTitle}`;
  const percent = Math.round((score / maxScore) * 100);
  const text = `Hi ${studentName},\n\nYour submission for "${assignmentTitle}" in ${courseName} has been graded.\n\nScore: ${score}/${maxScore} (${percent}%)\n\nLog in to view feedback.\n\nBest,\nLMS Team`;
  const html = `
    <h2>Grade Posted</h2>
    <p>Hi <strong>${studentName}</strong>,</p>
    <p>Your submission for <strong>${assignmentTitle}</strong> in <em>${courseName}</em> has been graded.</p>
    <p>Score: <strong>${score}/${maxScore} (${percent}%)</strong></p>
    <p>Log in to your <a href="${process.env.APP_URL || 'http://localhost:8080'}">LMS dashboard</a> to view detailed feedback.</p>
    <br><p>Best,<br>LMS Team</p>
  `;
  return sendEmail(studentEmail, subject, text, html);
}

module.exports = {
  sendEmail,
  sendEnrollmentNotification,
  sendSubmissionNotification,
  sendGradeNotification,
};
