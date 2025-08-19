import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box
} from "@mui/material";
import {
  ShoppingCart,
  Home,
  Store,
  Login,
  PersonAdd,
  Assignment,
  AccountCircle,
  Favorite,
  Logout
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
 
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
       
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            letterSpacing: 1
          }}
        >
          ElectroShop💡
        </Typography>

       
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/home" startIcon={<Home />}>
           Home
          </Button>
          

          {/* <Button
            color="inherit"
            component={Link}
            to="/products"
            startIcon={<Store />}
          >
            Products
          </Button> */}

          <IconButton color="inherit" component={Link} to="/cart">
            <ShoppingCart />
          </IconButton>

          <IconButton color="inherit" component={Link} to="/fave">
            <Favorite />
          </IconButton>
         


          {isLoggedIn && (
            <>

            <IconButton color="inherit" component={Link} to="/order">
            < Assignment/>
          </IconButton>
         
              {/* <Button
                color="inherit"
                component={Link}
                to="/order"
                startIcon={<Assignment />}
              >
                Orders
              </Button> */}

              {/* <Button
                color="inherit"
                component={Link}
                to="/userpro"
                startIcon={<AccountCircle />}
              >
                My Profile
              </Button> */}

              <IconButton color="inherit" component={Link} to="/userpro">
            < AccountCircle/>
          </IconButton>

              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<Logout />}
              >
                Logout
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<Login />}
              >
                Login
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/createUser"
                startIcon={<PersonAdd />}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
