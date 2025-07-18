import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  CssBaseline,
  Container,
  useTheme,
  useMediaQuery,
  Button

} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";


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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const role = localStorage.getItem("role")
  console.log(role);
  const token = localStorage.getItem("token")

  
  useEffect(()=>{
    if(!token){
      window.location.href="/"
    }
  },[])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      {role==="admin"&&<ListItemButton component={Link} to="/viewstaff">
        <ListItemIcon><PeopleAltIcon /></ListItemIcon>
        <ListItemText primary="View Staff" />
      </ListItemButton>}
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
    </Box>
  );
};


export default HomePage;
