// controllers/adminController.js
import Admin from '../../Models/Admin.js';
import bcrypt from 'bcryptjs';

 export const addAdmin = async (req, res) => {
  try {
    // const { name, email, password, role } = req.body;
 
    // // Basic validation
    // if (!name || !email || !password) {
    //   return res.status(400).json({ message: 'Name, email, and password are required.' });
    // }

    const name = "Admin"
    const email = "admin@gmail.com"
    const password ="admin@123"
    const role = "Super Admin"
    const Permission = "granted"


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    

    if (role && !['Super Admin', 'Staff'].includes(role)) {
      return res.status(400).json({ message: 'Role must be either "Super Admin" or "Staff".' });
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
      role: role || 'Staff',
      Permission:Permission || " "
    });

    await newAdmin.save();

    res.status(201).json({
      message: 'Admin created successfully.',
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
        Permission:newAdmin. Permission
      },
    });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


