
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Modal, Card, CardContent, Avatar, Grid } from '@mui/material';
import Navbar from './navBar';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
};

export default function UserProfile() {
  const [profileData, setProfileData] = useState({});
  const [openPass, setOpenPass] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    Fullname: '',
    profileImage: null,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:5050/api/getProfile', {
      headers: { Auth: `${token}` },
    })
      .then(res => {
        setProfileData(res.data);
        setFormData({
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          Fullname: res.data.Fullname,
          profileImage: null,
        });
      })
      .catch(err => console.log(err));
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key]);
      });

      await axios.put('http://127.0.0.1:5050/api/updateUser', data, {
        headers: {
          Auth: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully!');
      setOpenEdit(false);
    } catch (error) {
      console.log(error);
      alert('Error updating profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5050/api/changePassword', {
        oldPassword,
        newPassword,
      }, {
        headers: { Auth: `${token}` },
      });

      alert('Password changed successfully!');
      setOpenPass(false);
    } catch (error) {
      console.log(error);
      alert('Error changing password');
    }
  };

  return (
    <>
    <Navbar/>
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: 2 }}>
            <Avatar
              src={`http://127.0.0.1:5050/${profileData.profileImage}`}
              alt="Profile"
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Typography variant="h5">{profileData.username}</Typography>
            <Typography variant="body1" color="textSecondary">{profileData.email}</Typography>
            <Typography variant="body2" color="textSecondary">Phone: {profileData.phone}</Typography>
            <Typography variant="body2" color="textSecondary">Address: {profileData.address}</Typography>
            <Typography variant="body2" color="textSecondary">Fullname: {profileData.Fullname}</Typography>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => setOpenPass(true)}>Change Password</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={() => setOpenEdit(true)}>Edit Profile</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

   
      <Modal open={openPass} onClose={() => setOpenPass(false)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <form onSubmit={handleChangePassword}>
            <TextField label="Old Password" type="password" fullWidth margin="normal"
              value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
            <TextField label="New Password" type="password" fullWidth margin="normal"
              value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Save</Button>
          </form>
        </Box>
      </Modal>

     
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>Edit Profile</Typography>
          <form onSubmit={handleUpdateProfile}>
            <TextField label="Username" fullWidth margin="normal"
              value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
            <TextField label="Email" fullWidth margin="normal"
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <TextField label="Phone" fullWidth margin="normal"
              value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            <TextField label="Address" fullWidth margin="normal"
              value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
            <TextField label="Full Name" fullWidth margin="normal"
              value={formData.Fullname} onChange={e => setFormData({ ...formData, Fullname: e.target.value })} />
            <input type="file" onChange={e => setFormData({ ...formData, profileImage: e.target.files[0] })} style={{ marginTop: '16px' }} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Save</Button>
          </form>
        </Box>
      </Modal>
    </Box>
    </>
  );
}
