/**
 * Authentication Middleware
 * Checks if user is logged in and has the required role
 */

function requireLogin(role = null) {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }

    if (role && req.session.user.role !== role) {
      return res.render('error', {
        error: 'You do not have permission to access this page',
        title: 'Unauthorized'
      });
    }

    next();
  };
}

function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'Admin') {
    return res.render('error', {
      error: 'Admin access required',
      title: 'Unauthorized'
    });
  }
  next();
}

module.exports = { requireLogin, requireAdmin };
