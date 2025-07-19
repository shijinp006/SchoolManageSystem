// middleware/verifyToken.js
import jwt from 'jsonwebtoken';



// Replace with your actual secret key


export const verifyToken = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader,"auth");
  
  
  

  // Check if token is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  // console.log(token,"123");
  

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET );
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};


