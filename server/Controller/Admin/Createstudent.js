import Student from '../../models/student.js';

export const Createstudent = async (req, res) => {
  console.log("Check Student Creations");

  try {
    const { name, grade, age, address, phonenumber } = req.body;
    const { role, Permission } = req.query;
    const Phonenumber = parseInt(phonenumber)

    
    
     // Validate Phone Number
     if(Phonenumber){
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(Phonenumber)) {
    return res.status(400).json({
      message: "Invalid phone number. It must be a 10-digit number starting with 6–9."
    });
  }
     }
 

  


    // Basic validation
    if (!name || !grade || !age || !address || !Phonenumber) { 
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(age) || age <= 0) {
      return res.status(400).json({ message: "Age must be a valid positive number" });
    }

    // Authorization check: allow only admins or users with "granted" permission
    if (role !== 'Super Admin' && Permission !== "granted") {
      return res.status(403).json({ message: "Unauthorized. Only admins or permitted users can edit students." });
    }

    // Optional: check for duplicate student by phone number or name
    const existingStudent = await Student.findOne({ Phonenumber });
    if (existingStudent) {
      console.log("existed");
      
      return res.status(409).json({ message: "Student with this phone number already exists" });
    }

    // Create new student
    const newStudent = new Student({
      name,
      grade,
      age,
      address,
      phonenumber:Phonenumber
    });

    await newStudent.save();
  
    
    return res.status(201).json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const Viewstudentsdetails = async (req, res) => {
  console.log("Check Viewstudentsdetails");

  try {
    const viewstudent = await Student.find();

    if (!viewstudent || viewstudent.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    
    res.status(200).json(viewstudent);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error while fetching student details" });
  }
};

export const Editstudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { role, Permission } = req.query;
    const { name, grade, age, address, phonenumber } = req.body;

    const Phonenumber = parseInt(phonenumber)

    // console.log("Edit Request - Role:", role, "Permission:", Permission, "Student ID:", id);

    // Authorization check: allow only admins or users with "granted" permission
    if (role !== 'Super Admin' && Permission !== "granted") {
      return res.status(403).json({ message: "Unauthorized. Only admins or permitted users can edit students." });
    }

    // Validate Phone Number
    if(Phonenumber){
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(Phonenumber)) {
    return res.status(400).json({
      message: "Invalid phone number. It must be a 10-digit number starting with 6–9."
    });
  }
    }
  

    // Check if the student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Update only provided fields
    if (name) student.name = name;
    if (grade) student.grade = grade;
    if (age) student.age = age;
    if (address) student.address = address;
    if (Phonenumber) student.phonenumber = Phonenumber;

    await student.save();

    return res.status(200).json({
      message: "Student updated successfully",
      student,
    });

  } catch (error) {
    console.error("Error editing student:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const Deletestudent = async (req, res) => {
  try {
    console.log("Check Delete Student");

    const { id } = req.params; // Student Id From URL
     const { role,Permission } = req.query; // Role from query (e.g., ?role=admin)

     console.log(role,"role",Permission,"permission");
     
      // Only admin can edit
    if (role !== 'Super Admin'&&Permission!=="granted") {
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



