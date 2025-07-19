import React, { useState,useEffect } from "react";
import { data, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
   Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import {  useDispatch } from "react-redux";
import { Loader } from '../../Context/LoaderContext';
import {
  fetchStudents,
  deleteStudent,

  updateStudent,
} from "../../Redux/Slice/StudentSlice";
const drawerWidth = 240;



export const ViewStudent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [studentData,setStudentdata] = useState([])
  const [editform,setEditform] = useState(false)
  const [studentId, setStudentId] = useState(null);
  const { showLoader, hideLoader } = Loader();

   const [formData, setFormData] = useState({});

  // Get Role
  const role = localStorage.getItem("role")

  


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

   const dispatch = useDispatch();
     // const { list, loading } = useSelector((state) => state.students);

   //Get Token
   const token = localStorage.getItem("token")

   useEffect(() => {
       showLoader();
       setTimeout(() => {
         hideLoader();
       }, 2000); // simulate loading
     }, []);

  
 useEffect(() => {
  const fetchData = async () => {
    const response = await dispatch(fetchStudents());
    if (fetchStudents.fulfilled.match(response)) {
      setStudentdata(response.payload); // Only set data if fulfilled
    }
  };
  fetchData();
}, [dispatch,showLoader]);


const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEdit = (id) =>{
    setStudentId(id)
    setEditform(true)
    const data = studentData.find((data) =>data._id === id)

    if(data){
      setFormData({name:data.name,age:data.age,grade:data.grade, address:data.address,phonenumber:data.phonenumber})
    }
    
  }

  

 const handleDelete = (id) => {
   showLoader();
       setTimeout(() => {
         hideLoader();
       }, 2000); // simulate loading
  const confirmDelete = window.confirm('Are you sure you want to delete this student?');
  if (confirmDelete) {
    dispatch(deleteStudent(id));
  }
};


  const handleUpdate = (e) => {
  e.preventDefault(); // Prevent form refresh on submit

  

  const updatedData = formData;
  dispatch(updateStudent({ id: studentId, data: updatedData })).unwrap();

  // Optionally close the dialog and reset form
  setEditform(false);
  setFormData({name:"",age:"",grade:"",address:"",phonenumber:""})
   showLoader();
       setTimeout(() => {
         hideLoader();
       }, 2000); // simulate loading
};
useEffect(()=>{
      if(!token){
        window.location.href="/"
      }
    },[])

 


  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Admin Panel
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItemButton component={Link} to="/home">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        

        {role === "Super Admin" &&<ListItemButton component={Link} to="/viewstaff">
          <ListItemIcon><GroupIcon /></ListItemIcon>
         <ListItemText primary="View Staff" />

        </ListItemButton>}
      </List>
    </Box>
  );

  
  return (
    
  <Box sx={{ display: "flex", width:isMobile?"370px": "100%" }}>
      
    <CssBaseline />

      {/* AppBar on mobile */}
      {isMobile && (
        <AppBar position="fixed" sx={{ bgcolor: "#388e3c" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Students Management
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#f1f8e9",
            },
          }}
        >
          {isMobile && <Toolbar />}
          {drawer}
        </Drawer>
      </Box>
      

      {/* Main Content */}

      <Box
      
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fbe7",
          minHeight: "100vh",
          py: { xs: 10, sm: 4 },
          px: { xs: 2, sm: 4 },
          width: isMobile?"100%" :"1020px",
          overflowX: "auto",
        }}
      >
        {isMobile && <Toolbar />} {/* Prevent AppBar overlap */}

        <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            align="center"
            gutterBottom
            sx={{ color: "#2e7d32" }}
          >
            STUDENTS LIST
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
           <Table size={isMobile ? "small" : "medium"}>
  <TableHead>
    <TableRow sx={{ backgroundColor: "#e0f2f1" }}>
      <TableCell><strong>NO</strong></TableCell>
      <TableCell><strong>Name</strong></TableCell>
      <TableCell><strong>Age</strong></TableCell>
      <TableCell><strong>Address</strong></TableCell>
      <TableCell><strong>Phone Number</strong></TableCell>
      <TableCell><strong>Grade</strong></TableCell>
      <TableCell><strong>Action</strong></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {studentData.length === 0 ? (
  // Display this message when studentData is empty
 <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
    No students to display.
  </Typography>
) : (
  // Display the table rows when studentData has members
  // This should be placed inside your <tbody> or equivalent table body component
  <>
    {studentData.map((student, index) => (
      <TableRow key={student._id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{student.name}</TableCell>
        <TableCell>{student.age}</TableCell>
        <TableCell>{student.address}</TableCell>
        <TableCell>{student.phonenumber}</TableCell>
        <TableCell>{student.grade}</TableCell>
        <TableCell>
          <Stack direction={isMobile ? "column" : "row"} 
           spacing={isMobile ? 0.5 : 1} >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(student._id)}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(student._id)}
          >
            Delete
          </Button>
          </Stack>
        </TableCell>
        
      </TableRow>
    ))}
  </>
)}
  </TableBody>
</Table>

          </TableContainer>
        </Box>
      </Box>
    {editform && (
  <Dialog
    open={editform}
    onClose={() => setEditform(false)}
    fullScreen={false} // Force off full screen
    fullWidth
    maxWidth="xs" // Smaller width
    scroll="paper"
    PaperProps={{
      sx: {
        p: 2,
        borderRadius: 2,
        maxHeight: "80vh", // Reduce height
        width: "100%",
      },
    }}
  >
    <DialogTitle sx={{ fontSize: "1.1rem", textAlign: "center", pb: 1 }}>
      Edit Student
    </DialogTitle>

    <form onSubmit={handleUpdate}>
      <DialogContent sx={{ pt: 0 }}>
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Phone Number"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          type="tel"
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Button onClick={() => setEditform(false)} size="small" color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button type="submit" size="small" variant="contained" color="primary">
          Update
        </Button>
      </DialogActions>
    </form>
  </Dialog>
)}

    </Box>
   
  );
  
};
