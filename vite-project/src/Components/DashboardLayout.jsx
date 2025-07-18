// src/components/DashboardLayout.js
import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header'; // You'll create this
import { Outlet } from 'react-router-dom'; // For nested routes

const drawerWidth = 240;

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: '56px', sm: '64px' }, // Adjust margin top for app bar
          transition: 'margin-left 0.3s ease-in-out', // Animation for sidebar collapse/expand
        }}
      >
        <Outlet /> {/* Renders nested routes (e.g., View Students, View Staff) */}
      </Box>
    </Box>
  );
}

export default DashboardLayout;