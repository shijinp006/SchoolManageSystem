// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A standard blue
    },
    secondary: {
      main: '#dc004e', // A vibrant red
    },
    background: {
      default: '#f4f6f8', // Light grey for the main content background
      paper: '#ffffff',   // White for cards and surfaces
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Slightly rounded corners
  },
});

export default theme;