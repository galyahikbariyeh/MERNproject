import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { Account } from '@toolpad/core/Account';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile from './profile';
import PeopleIcon from '@mui/icons-material/People';
import RedeemIcon  from '@mui/icons-material/Redeem';
import ProductCrud from './product';
import Category from './category';
import CategoryIcon from '@mui/icons-material/Category';
import User from './userUpdate';
import PersonIcon from '@mui/icons-material/Person';
import Order from './orderArchive';
import MainDash from './mainDash';
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});


function CustomAppTitle({ profileData }) {
  const roleLabel = profileData?.role
    ? profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)
    : null;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <CloudCircleIcon fontSize="large" color="primary" />

      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        ElectroShop💡
      </Typography>

      {roleLabel && (
        <Chip
          label={` Welcome, ${roleLabel}`}
          color="success"
          size="small"
          sx={{
            fontWeight: 'medium',
            bgcolor: '#5e99d4ff',
            ml: 1,
          }}
        />
      )}

      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}
CustomAppTitle.propTypes = {
  profileData: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
};


function DemoPageContent({ pathname , profileData}) {
  return (
   <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
       {pathname === "/Profile" && (
        <Profile profileData={profileData}/>
      )}
      {pathname === "/Product" && (
        <ProductCrud/>
      
      
      )}
      {pathname === "/User" && (
        <User/>
      )}
      {pathname === "/Category" && (
       <Category/>
         
      )}
      {pathname === "/Order" && (
       <Order/>
         
      )}
      {pathname === "/dashboard" && (
       <MainDash/>
      )
        
      }
    </Box>
    
  );
}
DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};


function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton type="button" aria-label="search" sx={{ display: { xs: 'inline', md: 'none' } }}>
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
      <ThemeSwitcher />
      <Account />
    </Stack>
  );
}


function SidebarFooter({ mini }) {
  return (
    <Typography variant="caption" sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
      {mini
        ? '© ElectroShop'
        : `© ${new Date().getFullYear()} ElectroShop - All rights reserved`}
    </Typography>
  );
}
SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};


function DashboardLayoutSlots(props) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
   const[isAdmin, setIsAdmin]=useState(false);
  //pro
 


  
  const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  // {
  //   segment: 'orders',
  //   title: 'Orders',
  //   icon: <ShoppingCartIcon />,
  // },
   {
    segment: 'Profile',
    title: 'Profile',
    icon: <PersonIcon />,
  },
   ...(isAdmin ?[{
 segment: 'Product',
    title: 'Product',
    icon: <RedeemIcon/>,
   },
   {
 segment: 'User',
    title: 'User',
    icon: <PeopleIcon/>,
   },
   {
 segment: 'Category',
    title: 'Category',
    icon: <CategoryIcon/>,
   },
   {
    segment: 'Order',
    title: 'Order',
    icon: <ShoppingCartIcon />,
  },
 ]:[]),
   
];

  useEffect(()=>{

const token=localStorage.getItem('token')
if(token){
  async function fetchData () {
    try {
          const res =  await axios.get("http://127.0.0.1:5050/api/getProfile",{
      headers:{
        Auth: `${token}`
      }
      
    })
    console.log("Profile data:",res.data);
    setIsAdmin(res.data.role === 'admin');
    setProfileData(res.data);
    } catch (error) {
      console.log("Error fetching profile data:",error)
      navigate('/');
      return;
    }
   
  }
  fetchData();


}else{
navigate('/');
}


 

 },[])

  const router = useDemoRouter('/dashboard');
  const demoWindow = props.window ? props.window() : undefined;

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
        <DashboardLayout
          slots={{
            appTitle: () => <CustomAppTitle profileData={profileData} />,
            // toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooter,
          }}
        >
          <DemoPageContent profileData={profileData} pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}
DashboardLayoutSlots.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSlots;

