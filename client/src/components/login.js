import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './navBar';

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  
const [errorMsg, setErrorMsg] = useState('');
  return (
    <>
      {/* <Navbar /> */}
      
      <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor:'#4a96e2ff',
    // backgroundRepeat: 'no-repeat',
    // backgroundImage: `url('https://media.elbalad.news/2024/10/large/1039/4/11.jpg')`,
    // bgcolor: 'transparent', 
    filter: 'contrast(115%) brightness(110%) saturate(110%)', 
  }}
>

        <Paper
          elevation={4}
          sx={{
            p: 4,
            maxWidth: 400,
            width: '100%',
            borderRadius: 3,
            backgroundColor: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontWeight: 'bold', color: '#1976d2' }}
          >
            Login
          </Typography>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await axios.post(
                  'http://127.0.0.1:5050/api/login',
                  userData
                );
                console.log('Login successful:', res.data);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userRole', res.data.user.role);

            if (res.data.user.role === 'admin') {
              navigate('/dash');
            } else {
              navigate('/home');
            }
                
                // navigate('/dash');
              } catch (error) {
                alert('User not found');
                
                
                console.error('Error during login', error);
              }
            }}
          >
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                fontSize: '16px',
                textTransform: 'none',
                borderRadius: 2,
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              Login
            </Button>

           
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
            >
             I don't have an account?{' '}
              <Link
                to="/createUser"
                style={{
                  color: '#1976d2',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Register 
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
    </>
  );
}


