import Admin from '../../Models/Admin.js';
import bcrypt from 'bcryptjs';


 export const Createstaff = async (req, res) => {
  try {
 

    const { name, email, password, phonenumber, role } = req.body;


    const Phonenumber = parseInt(phonenumber)

    // ✅ Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Validate phone number format (Indian format - 10 digits starting with 6–9)
      // ✅ Validate phone number if it's provided
  if (Phonenumber) {
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(Phonenumber)) {
  
    
    return res.status(400).json({
      message: "Invalid phone number. It must be a 10-digit number starting with 6–9."
    });
  }
}

   

    // ✅ Check if staff already exists
    const existingStaff = await Admin.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ message: "A staff member with this email already exists." });

    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new staff
    const newStaff = new Admin({
      name,
      email,
      password: hashedPassword,
      role,
      phonenumber: Phonenumber, // Save it to DB
      Permissionstatus:""
    });

    await newStaff.save();

    res.status(201).json({ message: "Staff created successfully", staff: newStaff });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({ message: "Server error while creating staff" });
  }
};

export const Viewstaff = async (req, res) => {
  try {
    // Fetch all users with role "staff"
    const staffDetails = await Admin.find({ role: "Staff" });

    if (staffDetails.length === 0) {
      return res.status(404).json({ message: "No staff found" });
    }


    res.status(200).json(staffDetails);
  } catch (error) {
    console.error("Error fetching staff details:", error);
    res.status(500).json({ message: "Server error while fetching staff details" });
  }
};

export const Editstaff = async (req, res) => {
  try {
  

    const { id } = req.params; // Staff ID from URL params
   

  


    // Find existing staff
    const existingStaff = await Admin.findById(id);

    if (!existingStaff) {
      return res.status(404).json({ message: "Staff details not found" });
    }

    // Update allowed fields from req.body
    const { name, email, phonenumber, role, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

    if (name) existingStaff.name = name;
    if (email) existingStaff.email = email;
    if (phonenumber) existingStaff.phonenumber = phonenumber;
    if (role) existingStaff.role = role;
    if (password) existingStaff.password = hashedPassword
  

    // Save changes
    const updatedStaff = await existingStaff.save();

    res.status(200).json({
      message: "Staff details updated successfully",
      staff: updatedStaff,
    });
  } catch (error) {
    console.error("Error editing staff:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


 export const Deletestaff = async (req, res) => {
  try {
  

    const { id } = req.params; // Staff ID from URL
 

   


    const existingStaff = await Admin.findById(id);

    if (!existingStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Delete the staff
    await Admin.findByIdAndDelete(id);

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

//Change Staff Permission
export const ChangePermission = async (req, res) => {


  const { id } = req.params;
 

  try {
    const existingStaff = await Admin.findById(id);

    if (!existingStaff) {
     
      return res.status(404).json({ message: "Staff Not Found" });
    }

    const updatedStaff = await Admin.findByIdAndUpdate(
      id,
      { Permission: "granted" }
    );

    if (updatedStaff) {
      return res.status(200).json({
        message: "Permission updated successfully", 
      });
    } else {
      console.error(`Failed to update permission for staff ID: ${id}. No document returned after update.`);
      return res.status(500).json({ message: "Failed to update permission." });
    }

  } catch (error) {
    console.error(`Error changing permission for staff ID ${id}:`, error.message);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Staff ID format." });
    }
    return res.status(500).json({ message: "Server error during permission update.", error: error.message });
  }
};


export const CancelPermission = async (req, res) => {
 

  const { id } = req.params;


  try {
    const updatedStaff = await Admin.findByIdAndUpdate(
      id,
      { Permission: "" },
    );

    if (!updatedStaff) {
     
      return res.status(404).json({ message: "Staff Not Found" });
    }


    return res.status(200).json({
      message: "Permission cancelled successfully",
      staff: updatedStaff
    });

  } catch (error) {
    console.error(`Error cancelling permission for staff ID ${id}:`, error.message);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Staff ID format." });
    }
    return res.status(500).json({ message: "Server error during permission cancellation.", error: error.message });
  }
};
