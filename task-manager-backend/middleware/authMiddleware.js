const jwt = require("jsonwebtoken");

// Middleware function to protect routes
const protect = (req, res, next) => {
  // Get token from headers
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // Expecting 'Bearer <token>'

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request object
    req.user = { id: decoded.id };

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
