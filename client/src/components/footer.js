import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1976d2",
        color: "#fff",
        mt: 5,
        py: 5,
        px: { xs: 2, sm: 5 },
        
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} textAlign="center">
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body2">Email: ghaliah@gmail.com</Typography>
          <Typography variant="body2">Phone: 07788996654</Typography>
          <Box sx={{ mt: 1 }}>
            <IconButton color="inherit" href="https://facebook.com" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton color="inherit" href="https://twitter.com" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton color="inherit" href="https://instagram.com" target="_blank">
              <Instagram />
            </IconButton>
            <IconButton color="inherit" href="https://linkedin.com" target="_blank">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()}  ElectroShop. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
