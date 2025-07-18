import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

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
 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStaff,
  deleteStaff,
  updateStaff,
} from "../../Redux/Slice/StaffSlice.jsx";

const drawerWidth = 240;



export const ViewStaff = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [staffData,setStaffdata]  =useState([])
  console.log(staffData,"staff");
  const [editform,setEditform] = useState(false)
     const [stafftId, setStaffId] = useState(null);
  
     const [formData, setFormData] = useState({
      name: '',
      email :''
    });
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

   const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.students);
    
   useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchStaff());
      if (fetchStaff.fulfilled.match(response)) {
        setStaffdata(response.payload); // Only set data if fulfilled
      }
    };
    fetchData();
  }, [dispatch]);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleEdit = (id) =>{
      setStaffId(id)
      setEditform(true)
    }
  
    
  
   const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      dispatch(deleteStaff(id));
    }
  };
  
  
    const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form refresh on submit
  
    console.log(stafftId, "staffId122");
  
    const updatedData = formData;
    dispatch(updateStaff({ id: stafftId, data: updatedData }));
  
    // Optionally close the dialog and reset form
    setEditform(false);
  };
  
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

        <ListItemButton component={Link} to="/viewstudent">
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary="View Students" />
        </ListItemButton>

       
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
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
              Staff Management
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
            Staff List
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e0f2f1" }}>
                  <TableCell><strong>NO</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                   <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffData.map((staff,index) => (
                  <TableRow key={staff._id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                     <TableCell>
                              <Button 
                                variant="outlined" 
                                color="primary" 
                                size="small" 
                                onClick={() => handleEdit(staff._id)}
                                sx={{ marginRight: 1 }}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="outlined" 
                                color="error" 
                                size="small" 
                                onClick={() => handleDelete(staff._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {editform && (
            <Dialog
              open={editform}
              onClose={() => setEditform(false)}
            
              fullWidth
              maxWidth="sm" // Responsive width
              scroll="paper"
              PaperProps={{
                sx: {
                  p: 2,
                  borderRadius: 2,
                  maxHeight: "90vh",
                  width: "100%", // Ensure full width inside maxWidth
                },
              }}
            >
              <DialogTitle sx={{ fontSize: "1.25rem", textAlign: "center" }}>
                Edit Student
              </DialogTitle>
      
              <form onSubmit={handleUpdate}>
                <DialogContent>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                 
                </DialogContent>
      
                <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
                  <Button onClick={() => setEditform(false)} color="secondary" variant="outlined">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Update
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          )}
    </Box>
  );
};
