const Admin = require('../../Models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Store this in .env securely

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password,"Recieved Data");
  

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email:email });
    if (!admin) {
      return res.status(404).json({ message: 'Invalid email.' });
    }
    console.log(admin.role,'role');
    

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role,Permission:admin.Permission },
      JWT_SECRET,
      
    );
    // console.log(token,"token");
    
    console.log(admin.Permission,"per");
    
    // Respond with token and user data
    return res.status(200).json({
      message: 'Login successful.',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role:admin.role,
        Permission:admin.Permission
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { login };
