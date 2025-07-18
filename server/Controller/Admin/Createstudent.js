const Student = require('../../Models/Student');

const Createstudent = async (req, res) => {
  console.log("Check Student Creations");

  try {
    const { name, grade, age, address, phonenumber } = req.body;
    console.log( typeof(phonenumber));
    

    // Basic validation
    if (!name || !grade || !age || !address || !phonenumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({ message: "Phone number must be a 10-digit number" });
    }

    if (isNaN(age) || age <= 0) {
      return res.status(400).json({ message: "Age must be a valid positive number" });
    }

    // Optional: check for duplicate student by phone number or name
    const existingStudent = await Student.findOne({ phonenumber });
    if (existingStudent) {
      return res.status(409).json({ message: "Student with this phone number already exists" });
    }

    // Create new student
    const newStudent = new Student({
      name,
      grade,
      age,
      address,
      phonenumber
    });

    await newStudent.save();

    return res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const Viewstudentsdetails = async (req, res) => {
  console.log("Check Viewstudentsdetails");

  try {
    const viewstudent = await Student.find();

    if (!viewstudent || viewstudent.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    console.log(viewstudent);
    res.status(200).json(viewstudent);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error while fetching student details" });
  }
};

const Editstudent = async (req, res) => {
  try {
    console.log("Check Edit Student");

    const  {id}  = req.params.id; // Student ID from URL
    const { role } = req.query; // Role from query (e.g., ?role=admin)
    const { name, grade, age, address, phonenumber } = req.body;

    console.log("Requested by role:", role);
    console.log(id,"recievd id");
    

   


    // Only admin can edit
    if (role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized. Only admins can edit students." });
    }

    // Check if student exists
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update the student fields if provided
    if (name) existingStudent.name = name;
    if (grade) existingStudent.grade = grade;
    if (age) existingStudent.age = age;
    if (address) existingStudent.address = address;
    if (phonenumber) existingStudent.phonenumber = phonenumber;

    // Save the updated student
    await existingStudent.save();

    res.status(200).json({
      message: "Student updated successfully",
      student: existingStudent
    });

  } catch (error) {
    console.error("Error editing student:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const Deletestudent = async (req, res) => {
  try {
    console.log("Check Delete Student");

    const { id } = req.params; // Student Id From URL
     const { role } = req.query; // Role from query (e.g., ?role=admin)

     console.log(role,"role");
     
      // Only admin can edit
    if (role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized. Only admins can Delete students." });
    }

    const existingStudent = await Student.findById(id);

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(id);

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Delete Student Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {Createstudent,Viewstudentsdetails,Editstudent,Deletestudent}