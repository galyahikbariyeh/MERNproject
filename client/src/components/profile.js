import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  Modal,
  Avatar,
  Stack
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function Profile({ profileData }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openUP, setOpenup] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updateOpen = () => setOpenup(true);
  const handleCloseUpdate = () => setOpenup(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [Fullname, setFullName] = useState("");
  const [profileImage, setProfileimage] = useState(null);

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
    
      <Avatar
        src={`http://127.0.0.1:5050/${profileData.profileImage}`}
        alt="Profile"
        sx={{ width: 150, height: 150, margin: "0 auto", mb: 2 }}
      />

     
      <Typography variant="h5" fontWeight="bold">{profileData.username}</Typography>
      <Typography color="text.secondary">{profileData.email}</Typography>
      <Typography color="text.secondary"><PhoneIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} /> {profileData.phone}</Typography>
      <Typography color="text.secondary"> <HomeIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} /> {profileData.address}</Typography>
      <Typography color="text.secondary"> <PersonIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} /> {profileData.Fullname}</Typography>

    
      <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
        <Button variant="contained" onClick={handleOpen}>
          Change password
        </Button>
        <Button variant="outlined" onClick={updateOpen}>
          Edit Profile 
        </Button>
      </Stack>

     
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Update Password
          </Typography>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const response = await axios.post(
                  "http://127.0.0.1:5050/api/changePassword",
                  { oldPassword, newPassword },
                  {
                    headers: {
                      Auth: `${localStorage.getItem("token")}`,
                    },
                  }
                );
                alert("Password change successfully");
                handleClose();
              } catch (error) {
                console.error("Error changing password:", error.message);
              }
            }}
          >
            <TextField
              fullWidth
              type="password"
              label="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" fullWidth type="submit">
              Save
            </Button>
          </form>
        </Box>
      </Modal>

    
      <Modal open={openUP} onClose={handleCloseUpdate}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Edit Profile
          </Typography>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const formData = new FormData();
                formData.append("username", username);
                formData.append("email", email);
                formData.append("phone", phone);
                formData.append("address", address);
                formData.append("Fullname", Fullname);
                formData.append("profileImage", profileImage);

                await axios.put("http://127.0.0.1:5050/api/updateUser", formData, {
                  headers: {
                    Auth: `${localStorage.getItem("token")}`,
                  },
                });

                alert("Profile Update Successfully");
                handleCloseUpdate();
              } catch (error) {
                console.error("Error updating profile:", error);
                alert("Error updating profile: ");
              }
            }}
          >
            <TextField
              fullWidth
              label="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label=" Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="FullName "
              value={Fullname}
              onChange={(e) => setFullName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
             Select Imge
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setProfileimage(e.target.files[0])}
              />
            </Button>
            <Button variant="contained" fullWidth type="submit">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
