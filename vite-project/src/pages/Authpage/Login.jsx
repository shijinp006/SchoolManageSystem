import React, { useState } from 'react';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Admin/login`, formData);
      const { token } = response.data;
      console.log(response, "res");
      console.log(token, "token");

      // Store token
      localStorage.setItem('token', token);

      // --- Start of improved if condition for toast ---
      if (response && response.status === 200) { // Check for successful response status
        // Success Toast
        toast.success('Login successful!', {
          // position: 'top-right', // Removed as per your provided code
          // autoClose: 3000,     // Removed as per your provided code
          theme: 'colored',
        });
        // Optionally, redirect the user after a successful login and toast
        // Example: navigate('/dashboard'); // If you are using react-router-dom's useNavigate hook
      } else {
        // This 'else' block might catch non-200 successful responses,
        // though typically Axios throws an error for non-2xx status codes.
        // It's good for explicit handling if your backend sends successful
        // but non-200 status codes for certain scenarios.
        toast.warn(response.data?.message || 'Login completed with an unexpected status.', {
          // position: 'top-right', // Removed as per your provided code
          // autoClose: 3000,     // Removed as per your provided code
          theme: 'colored',
        });
      }
      // --- End of improved if condition for toast ---

      console.log('Form Data:', formData);
    } catch (error) {
      // The 'catch' block inherently handles errors, including network errors
      // and HTTP status codes outside of 2xx.

      // Error Toast
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.', { // More descriptive default message
        // position: 'top-right', // Removed as per your provided code
        // autoClose: 3000,     // Removed as per your provided code
        theme: 'colored',
      });

      console.error('Login Error:', error);
    }
  };

   return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw', // Ensures the Box takes the full viewport width
        bgcolor: '#ffffff', // Changed: Main background color is now white
        display: 'flex',
        justifyContent: 'center', // Centers children horizontally
        alignItems: 'center',   // Centers children vertically
        p: 2, // Padding around the login form, ensures space on very small screens
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4 }, // Responsive padding inside the paper
          width: {
            xs: '90%', // Use a percentage for xs to ensure some margin on very small screens
            sm: 400,    // 400px width on small screens and up
            md: 450,    // Slightly wider on medium screens and up
          },
          maxWidth: '500px', // Set a maximum width to prevent it from becoming too wide on large screens
          backgroundColor: '#245996ff', // Changed: Form background color is now blue
          borderRadius: '8px', // Slightly rounded corners for the paper
          boxSizing: 'border-box', // Include padding and border in the element's total width and height
        }}
      >
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <Typography component="label" htmlFor="email" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5, color: '#ffffff' }}> {/* Added color for label */}
              Email
            </Typography>
            <TextField
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#e0e0e0', // Grey background for the input field
                  '& fieldset': {
                    borderColor: '#ccc', // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#999', // Hover border color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3c5bdaff', // Focus border color matching button
                  },
                },
                '& .MuiInputBase-input': {
                  py: 1.25, // Adjust vertical padding for input text
                  color: '#333333' // Added color for input text for contrast with light background
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography component="label" htmlFor="password" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5, color: '#ffffff' }}> {/* Added color for label */}
              Password
            </Typography>
            <TextField
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              size="medium"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#e0e0e0', // Grey background for the input field
                  '& fieldset': {
                    borderColor: '#ccc', // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#999', // Hover border color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3c5bdaff', // Focus border color matching button
                  },
                },
                '& .MuiInputBase-input': {
                  py: 1.25, // Adjust vertical padding for input text
                  color: '#333333' // Added color for input text
                }
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#5072e0ff', // Blue background for the button
              color: '#fff',     // White text color
              fontWeight: 'bold',
              py: 1.5,          // Vertical padding
              fontSize: '16px',
              borderRadius: '5px', // Slightly rounded corners for the button
              '&:hover': {
                bgcolor: '#200e96ff', // Darker blue on hover
              },
            }}
          >
            LOG IN
          </Button>
        </form>
      </Paper>
    </Box>
  );
};