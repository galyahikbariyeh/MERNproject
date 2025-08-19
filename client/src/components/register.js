import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment
} from '@mui/material';
import {
  AccountCircle,
  Email,
  Lock,
  Home,
  Phone
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    FullName: '',
    address: '',
    phone: ''
  });

  return (
    <>
    
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
          backgroundSize: 'cover',      
    backgroundPosition: 'center', 
    // backgroundRepeat: 'no-repeat',
    // backgroundImage: `url('https://img.freepik.com/fotos-premium/eletrodomesticos-fogao-a-gas-tv-cinema-geladeira-ar-condicionado-micro-ondas_505080-1032.jpg')`,
        // bgcolor: '#94b6d9ff'
         backgroundColor:'#1976d2',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 450,
          width: '100%',
          borderRadius: 3,
          backgroundColor: '#ffffff'
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Register
        </Typography>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await axios.post(
                'http://127.0.0.1:5050/api/createUser',
                userData
              );
              alert('Registration successful')
              console.log('Registration successful:', res.data);
              navigate('/');
            } catch (error) {
              console.error('Error during registration', error);
            }
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              )
            }}
          />

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
              )
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
              )
            }}
          />

          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.Fullname}
            onChange={(e) =>
              setUserData({ ...userData, Fullname: e.target.value })
            }
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home color="primary" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="primary" />
                </InputAdornment>
              )
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
              '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
    </>
  );
}
