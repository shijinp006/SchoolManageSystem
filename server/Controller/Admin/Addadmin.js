// controllers/adminController.js
const Admin = require('../../Models/Admin');
const bcrypt = require('bcryptjs');

const addAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name, password, email, role, "Received data");

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    

    if (role && !['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Role must be either "admin" or "user".' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await newAdmin.save();

    res.status(201).json({
      message: 'Admin created successfully.',
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addAdmin,
};
