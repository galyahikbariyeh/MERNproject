import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  };

  
  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <Box>
    
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Card sx={{ p: 4, minWidth: 300, textAlign: 'center', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              You have been logged out
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Go to Login Page
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}