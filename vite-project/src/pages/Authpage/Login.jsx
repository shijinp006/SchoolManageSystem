import React, { useState,useEffect } from 'react';
import { Box, Button, Paper, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../Context/LoaderContext.jsx';
export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { showLoader, hideLoader } = Loader();

  const navigate = useNavigate()
  
useEffect(() => {
       showLoader();
       setTimeout(() => {
         hideLoader();
       }, 2000); // simulate loading
     }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Admin/login`, formData);
      const { token } = response.data;
      const { admin } = response.data;
      const Permission = admin?.Permission;
      const role = admin?.role

      

      // Store token
      localStorage.setItem('token', token);
      localStorage.setItem('Permission', Permission);
      localStorage.setItem('role', role);

      
      if (response && response.status === 200) { // Check for successful response status
        // Success Toast
        toast.success('Login successful!', {
          theme: 'colored',
        });
        navigate("/home")
        showLoader();
       setTimeout(() => {
         hideLoader();
       }, 2000); // simulate loading
       
      } else {
        
        toast.warn(response.data?.message || 'Login completed with an unexpected status.', {
         
          theme: 'colored',
        });
      }
      

      console.log('Form Data:', formData);
    } catch (error) {
      

      // Error Toast
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.', { // More descriptive default message
       
        theme: 'colored',
      });

      console.error('Login Error:', error);
    }
  };

  return (
   
  <Box
    sx={{
      minHeight: '100vh',
      width: '100vw',
      bgcolor: '#f1f8e9', // ✅ Match dashboard background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 2,
    }}
  >
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 4 },
        width: {
          xs: '90%',
          sm: 400,
          md: 450,
        },
        maxWidth: '500px',
        backgroundColor: '#5c605cff', // Form background color (blue)
        borderRadius: '8px',
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 3, color: '#fff' }} // ✅ White title for contrast
      >
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <Box sx={{ mb: 2 }}>
          <Typography
            component="label"
            htmlFor="email"
            sx={{
              fontWeight: 'bold',
              display: 'block',
              mb: 0.5,
              color: '#ffffff',
            }}
          >
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
                backgroundColor: '#e0e0e0',
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#999' },
                '&.Mui-focused fieldset': { borderColor: '#4caf50' },
              },
              '& .MuiInputBase-input': {
                py: 1.25,
                color: '#333333',
              },
            }}
          />
        </Box>

        {/* Password Field */}
        <Box sx={{ mb: 3 }}>
          <Typography
            component="label"
            htmlFor="password"
            sx={{
              fontWeight: 'bold',
              display: 'block',
              mb: 0.5,
              color: '#ffffff',
            }}
          >
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
                backgroundColor: '#e0e0e0',
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#999' },
                '&.Mui-focused fieldset': { borderColor: '#4caf50' },
              },
              '& .MuiInputBase-input': {
                py: 1.25,
                color: '#333333',
              },
            }}
          />
        </Box>

        {/* Login Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            bgcolor: '#4caf50',
            color: '#fff',
            fontWeight: 'bold',
            py: 1.5,
            fontSize: '16px',
            borderRadius: '5px',
            '&:hover': {
              bgcolor: '#4caf50',
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