// middleware/verifyToken.js
const jwt = require('jsonwebtoken');


// Replace with your actual secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Veryfy Token");
  console.log(authHeader,"auth Header");
  
  

  // Check if token is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
