/**
 * Middleware to allow only admin users
 */
const adminMiddleware = (req, res, next) => {
  // Check if user is attached to request (auth middleware should run before this)
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user info" });
  }

  // Check if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied: Admin only" });
  }

  // User is admin, proceed
  next();
};

export default adminMiddleware;
