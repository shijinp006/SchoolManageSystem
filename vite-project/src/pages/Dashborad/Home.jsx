import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  ListItem,
  Container,
  Grid,
  Avatar,
  MenuItem
 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {  useDispatch } from "react-redux";
import { Loader } from '../../Context/LoaderContext.jsx';

import {
  createStaff
} from "../../Redux/Slice/StaffSlice.jsx";
import {
  createStudent
} from "../../Redux/Slice/StudentSlice.jsx";


const drawerWidth = 240;

const StatCard = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 4,
      textAlign: "center",
      bgcolor: "#ffffff",
    }}
  >
    <Avatar sx={{ bgcolor: "#4caf50", mx: "auto", mb: 1 }}>{icon}</Avatar>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
      {value}
    </Typography>
  </Paper>
);

const DashboardContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight="bold"
        color="primary.main"
        gutterBottom
        align="center"
      >
     
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Students" value="150" icon={<SchoolIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Staffs" value="35" icon={<GroupsIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Grade 10 Students" value="30" icon={<MenuBookIcon />} />
        </Grid>
      </Grid>
    </>
  );
};



const HomePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [studentform,setStudentform] = useState(false)
  const [staffform,setStaffform] = useState(false)
  const { showLoader, hideLoader } = Loader();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate =useNavigate()
  const[formData, setFormData] = useState({
        name: '',
        age :'',
        grade:'',
        address:'',
        phonenumber :''
      });
      const[staffformData, setStaffFormData] = useState({
        name: '',
        email :'',
        password:'',
        role:'',
        phonenumber:''
        
      });

  
  //Get Token,role
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token")
  console.log(role,"role");
  

 
  

  const dispatch = useDispatch();
  useEffect(() => {
    showLoader();
    setTimeout(() => {
      hideLoader();
    }, 2000); // simulate loading
  }, []);

  //Student Handle Change
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
   
    //Staff handle Change

    const handleChange1 = (e) => {
      const { name, value } = e.target;
      setStaffFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Handle Form 
    const handleStudentform = () =>{
      
      setStudentform(true)
    }
const handleStafftform = () =>{
      
      setStaffform(true)
    }


  useEffect(()=>{
    if(!token){
      window.location.href="/"
    }
  },[])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

//Creating Student
 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  try {
    
    const updatedData = formData;
    await dispatch(createStudent(updatedData)).unwrap();
    setStudentform(false); 
    setFormData({ name: "", age: "", grade: "", address: "", phonenumber: "" }); 
    navigate("/viewstudent")
  } catch (error) {
    console.error("Failed to create student:", error);
    // Optionally show error to user with toast or alert
  }
};

//Creating Staff

const Createstaff = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  try {
    
    const updatedData = staffformData;
    await dispatch(createStaff(updatedData)).unwrap();
    setStaffFormData(false); 
    setStaffFormData({ name: "", email: "", password: "", role: "", phonenumber: "" }); 
    navigate("/viewstaff"); // navigate after success
  } catch (error) {
    console.error("Failed to create student:", error);
    // Optionally show error to user with toast or alert
  }
};

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />

      {/* Navigation Bar (Always visible) */}
    <AppBar
  position="fixed"
  sx={{
    zIndex: theme.zIndex.drawer + 1,
    bgcolor: "#388e3c", // Custom green
  }}
>
  <Toolbar>
    {isMobile && (
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
    )}
    <Typography variant="h6" noWrap component="div">
      My School Dashboard
    </Typography>

    <Box sx={{ flexGrow: 1 }} /> {/* Push the button to the right */}

    <Button
      color="inherit"
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  sx={{ textTransform: "none" }}
>
  🚪 Logout
    </Button>
  </Toolbar>
</AppBar>


      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#f1f8e9",
          },
        }}
      >
        <Toolbar /> {/* For top spacing under AppBar */}
        
        <Box sx={{ overflow: "auto" }}>
  <List>
     <ListItem disablePadding>
      <ListItemButton component={Link} to="/home">
        <ListItemIcon><DashboardIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton component={Link} to="/viewstudent">
        <ListItemIcon><SchoolIcon /></ListItemIcon>
        <ListItemText primary="View Students" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      {role==="Super Admin"&&<ListItemButton component={Link} to="/viewstaff">
        <ListItemIcon><PeopleAltIcon /></ListItemIcon>
        <ListItemText primary="View Staff" />
      </ListItemButton>}
    </ListItem>
    <ListItem disablePadding>
     <ListItemButton onClick={handleStudentform}>
        <ListItemIcon><PersonAddIcon /></ListItemIcon>
        <ListItemText primary="Create Student" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
    {role === "Super Admin" && (
  <ListItemButton onClick={handleStafftform}>
    <ListItemIcon><PersonAddIcon /></ListItemIcon>
    <ListItemText primary="Create Staff" />
  </ListItemButton>
)}
    </ListItem>

  </List>
</Box>

      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f9fbe7",
          minHeight: "100vh",
          px: 2,
          py: 4,
          width:isMobile ? "100%":"1020px",
        }}
      >
        <Toolbar /> {/* Adds spacing below AppBar */}
        <Container maxWidth="lg">
          <DashboardContent />
        </Container>
      </Box>
     {studentform && (
  <Dialog
    open={studentform}
    onClose={() => setStudentform(false)}
    fullWidth
    maxWidth="xs" // ⬅️ Use "xs" for smaller dialog
    scroll="paper"
    PaperProps={{
      sx: {
        p: 2,
        borderRadius: 2,
        maxHeight: "80vh", // ⬅️ Slightly shorter
        width: "100%",
      },
    }}
  >
    <DialogTitle sx={{ fontSize: "1.1rem", textAlign: "center", pb: 1 }}>
      Create Student
    </DialogTitle>

    <form onSubmit={handleSubmit }>
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
          type="text"
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Grade"
          name="grade"
          type="text"
          value={formData.grade}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Phone Number"
          name="phonenumber"
          type="text"
          value={formData.phonenumber}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Button onClick={() => setStudentform(false)} size="small" color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button type="submit" size="small" variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </form>
  </Dialog>
)}
{staffform && (
  <Dialog
    open={staffform}
    onClose={() => setStaffform(false)}
    fullWidth
    maxWidth="xs" // ⬅️ Use "xs" for smaller dialog
    scroll="paper"
    PaperProps={{
      sx: {
        p: 2,
        borderRadius: 2,
        maxHeight: "80vh", // ⬅️ Slightly shorter
        width: "100%",
      },
    }}
  >
    <DialogTitle sx={{ fontSize: "1.1rem", textAlign: "center", pb: 1 }}>
      Create Staff
    </DialogTitle>

    <form onSubmit={Createstaff}>
      <DialogContent sx={{ pt: 0 }}>
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Name"
          name="name"
          value={staffformData.name}
          onChange={handleChange1}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={staffformData.email}
          onChange={handleChange1}
        />
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Password"
          name="password"
          type="text"
          value={staffformData.password}
          onChange={handleChange1}
        />
        <TextField
          select
          size="small"
          margin="dense"
          fullWidth
          label="Role"
          name="role"
          value={staffformData.role}
          onChange={handleChange1}
       >
       <MenuItem value="Super Admin">Admin</MenuItem>
       <MenuItem value="Staff">Staff</MenuItem>
      
  {/* Add more roles as needed */}
   </TextField>
        <TextField
          size="small"
          margin="dense"
          fullWidth
          label="Phone Number"
          name="phonenumber"
          type="text"
          value={staffformData.phonenumber}
          onChange={handleChange1}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
        <Button onClick={() => setStaffform(false)} size="small" color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button type="submit" size="small" variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </form>
  </Dialog>
)}
    </Box>
  );
};


export default HomePage;
