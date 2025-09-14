// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Paper,
//   InputAdornment
// } from '@mui/material';
// import {
//   AccountCircle,
//   Email,
//   Lock,
//   Home,
//   Phone
// } from '@mui/icons-material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     FullName: '',
//     address: '',
//     phone: ''
//   });

//   return (
//     <>
    
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
       
//           backgroundSize: 'cover',      
//     backgroundPosition: 'center', 
//     backgroundRepeat: 'no-repeat',
//     // backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSN0zjZJ-UU6HtvWni67jgMmCWT8yM6dORlXKZKyS5kcYmojPYaULfKxOwS5awuAI7cfM&usqp=CAU')`,
//         // bgcolor: '#94b6d9ff'
//          backgroundColor:'#1976d2',
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           p: 4,
//           maxWidth: 450,
//           width: '100%',
//           borderRadius: 3,
//           backgroundColor: '#ffffff'
//         }}
//       >
//         <Typography
//           variant="h4"
//           gutterBottom
//           align="center"
//           sx={{ fontWeight: 'bold', color: '#1976d2' }}
//         >
//           Register
//         </Typography>

//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();
//             try {
//               const res = await axios.post(
//                 'http://127.0.0.1:5050/api/createUser',
//                 userData
//               );
//               alert('Registration successful')
//               console.log('Registration successful:', res.data);
//               navigate('/');
//             } catch (error) {
//               console.error('Error during registration', error);
//             }
//           }}
//         >
//           <TextField
//             label="Username"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={userData.username}
//             onChange={(e) =>
//               setUserData({ ...userData, username: e.target.value })
//             }
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountCircle color="primary" />
//                 </InputAdornment>
//               )
//             }}
//           />

//           <TextField
//             label="Email"
//             type="email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={userData.email}
//             onChange={(e) =>
//               setUserData({ ...userData, email: e.target.value })
//             }
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Email color="primary" />
//                 </InputAdornment>
//               )
//             }}
//           />

//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={userData.password}
//             onChange={(e) =>
//               setUserData({ ...userData, password: e.target.value })
//             }
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Lock color="primary" />
//                 </InputAdornment>
//               )
//             }}
//           />

//           <TextField
//             label="Full Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={userData.Fullname}
//             onChange={(e) =>
//               setUserData({ ...userData, Fullname: e.target.value })
//             }
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountCircle color="primary" />
//                 </InputAdornment>
//               )
//             }}
//           />

//           <TextField
//             label="Address"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={userData.address}
//             onChange={(e) =>
//               setUserData({ ...userData, address: e.target.value })
//             }
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Home color="primary" />
//                 </InputAdornment>
//               )
//             }}
//           />

//           <TextField
//             label="Phone"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={userData.phone}
//             onChange={(e) =>
//               setUserData({ ...userData, phone: e.target.value })
//             }
//             required
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Phone color="primary" />
//                 </InputAdornment>
//               )
//             }}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 3,
//               py: 1.4,
//               fontSize: '16px',
//               textTransform: 'none',
//               borderRadius: 2,
//               backgroundColor: '#1976d2',
//               '&:hover': { backgroundColor: '#1565c0' }
//             }}
//           >
//             Register
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//     </>
//   );
// }



// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
//   CircularProgress,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import {
//   AccountCircle,
//   Email,
//   Lock,
//   Home,
//   Phone,
//   Visibility,
//   VisibilityOff
// } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// const AnimatedPaper = styled(Paper)(({ show }) => ({
//   transform: show ? 'translateY(0)' : 'translateY(60px)',
//   opacity: show ? 1 : 0,
//   transition: 'all 500ms cubic-bezier(.2,.8,.2,1)',
//   maxWidth: 480,
//   width: '100%',
//   borderRadius: 12,
//   padding: '2rem',
//   zIndex: 2000,
//   position: 'relative'
// }));

// export default function Register() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     Fullname: '',
//     address: '',
//     phone: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [showForm, setShowForm] = useState(false);

//   const heroRef = useRef(null);
//   const [heroHeight, setHeroHeight] = useState('70vh'); 

  
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerHeight < 600) setHeroHeight('50vh');
//       else if (window.innerHeight < 800) setHeroHeight('60vh');
//       else setHeroHeight('70vh');
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post('http://127.0.0.1:5050/api/createUser', userData);
//       alert('User register successfuly')
//       setTimeout(() => navigate('/'), 1300);
//     } catch (error) {
//       console.error(error);
//       setSnackbar({ open: true, message: 'Registration failed!', severity: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
     
//       <Box
//         ref={heroRef}
//         sx={{
//           //   height: '100vh',
//           // width: '100%',
//           // backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,office')",
//           // backgroundSize: 'cover',
//           // backgroundPosition: 'center',
//           // display: 'flex',
//           // justifyContent: 'center',
//           // alignItems: 'center',
//           // position: 'relative',
//           // transition: 'height 0.3s ease'
//           height: '100vh', 
//     width: '100%',
   
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center', 
//     alignItems: 'center',
//      backgroundRepeat: 'no-repeat',
//     backgroundImage: "url('')",
//     position: 'relative',
//     backgroundColor:'#79b6f3ff',
   
//     objectFit: 'cover',   
//     objectPosition: 'center'
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             inset: 0,
//             // background:
//             //   'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)'
//           }}
//         />
//         {!showForm && (
//           <Box sx={{ zIndex: 2, textAlign: 'center', px: 2}}>
//             {/* <Typography
//               variant="h3"
//               sx={{ fontWeight: '700', textShadow: '0 6px 20px rgba(0,0,0,0.6)' }}
//             >
//               Welcome to ElectroShop💡
//             </Typography>
//             <Typography sx={{ mt: 1, mb: 3, textShadow: '0 4px 14px rgba(0,0,0,0.5)' }}>
//               Click below to register
//             </Typography> */}
//             <Button
//               variant="contained"
//               onClick={() => setShowForm(true)}
//               sx={{
//                 backgroundColor: '#1976d2',
//                 color: '#fff',
//                 px: 4,
//                 py: 1.2,
//                 borderRadius: 2,
//                 textTransform: 'none',
//                 '&:hover': { backgroundColor: '#1565c0', transform: 'translateY(-3px)' }
//               }}
//             >
//               Register Now
//             </Button>
//           </Box>
//         )}
//       </Box>

     
//       {showForm && (
//         <Box
//           sx={{
//             position: 'fixed',
//             inset: 0,
//             zIndex: 1500,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: 'rgba(0,0,0,0.45)',
//             backdropFilter: 'blur(4px)',
//             transition: 'opacity 300ms ease'
//           }}
//           onClick={() => setShowForm(false)} 
//         >
//           <AnimatedPaper
//             show={showForm}
//             onClick={(e) => e.stopPropagation()} 
//           >
//             <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1976d2' }}>
//               Register
//             </Typography>

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 label="Username"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={userData.username}
//                 onChange={(e) => setUserData({ ...userData, username: e.target.value })}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <AccountCircle color="primary" />
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               <TextField
//                 label="Email"
//                 type="email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={userData.email}
//                 onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Email color="primary" />
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               <TextField
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={userData.password}
//                 onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Lock color="primary" />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               <TextField
//                 label="Full Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={userData.Fullname}
//                 onChange={(e) => setUserData({ ...userData, Fullname: e.target.value })}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <AccountCircle color="primary" />
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               <TextField
//                 label="Address"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={userData.address}
//                 onChange={(e) => setUserData({ ...userData, address: e.target.value })}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Home color="primary" />
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               <TextField
//                 label="Phone"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={userData.phone}
//                 onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
//                 required
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Phone color="primary" />
//                     </InputAdornment>
//                   )
//                 }}
//               />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   mt: 3,
//                   py: 1.4,
//                   fontSize: '16px',
//                   textTransform: 'none',
//                   borderRadius: 2,
//                   backgroundColor: '#1976d2',
//                   transition: '0.25s',
//                   '&:hover': { backgroundColor: '#1565c0', transform: 'scale(1.02)' }
//                 }}
//                 disabled={loading}
//               >
//                 {loading ? <CircularProgress size={24} /> : 'Register'}
//               </Button>
//             </form>
//           </AnimatedPaper>
//         </Box>
//       )}

     
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  AccountCircle,
  Email,
  Lock,
  Home,
  Phone,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AnimatedPaper = styled(Paper)(({ show }) => ({
  transform: show ? 'translateY(0)' : 'translateY(60px)',
  opacity: show ? 1 : 0,
  transition: 'all 500ms cubic-bezier(.2,.8,.2,1)',
  maxWidth: 520,
  width: '100%',
  borderRadius: 12,
  padding: '2rem',
  zIndex: 2000,
  position: 'relative'
}));

export default function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    Fullname: '', 
    address: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  
  const IMAGE_ASPECT = 2.036;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5050/api/createUser', userData);
      alert('Registration successful')
       navigate('/');
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Registration failed!', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  
  const handleBackdropClick = () => {
    setShowForm(false);
  };

  return (
    <>
      
<Box
  sx={{
    position: 'relative',
    width: '100%',
    height: 'min(80vh, calc(100vw / ' + IMAGE_ASPECT + '))',
    

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden',
    flexDirection: 'column'  
  }}
>

  <img
    src="https://scontent.famm3-2.fna.fbcdn.net/v/t39.30808-6/305656526_402576811988097_5197428316835922918_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=By96vg5-JjwQ7kNvwENxdXo&_nc_oc=Admw9Pl_FincxYMgiOZunKgPi29i2f6V_DXi0_EsGQCpN-ci8UnfCNctYTlzwu-1Z4A&_nc_zt=23&_nc_ht=scontent.famm3-2.fna&_nc_gid=1yHl-aEq1PB7_hWD9Uzisg&oh=00_AfZvvxGZVMlV_TmRhz4vbqPCDMtIaIV9gWZKJR0DwIaphA&oe=68C8AB9F"
    alt="Hero"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
      display: 'block'
    }}
  />


  <Box sx={{}}>
    <Button
      variant="contained"
      onClick={() => setShowForm(true)}
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        px: 4,
        py: 1.2,
        mt:-20,
        borderRadius: 10,
        textTransform: 'none',
        '&:hover': { backgroundColor: '#1565c0', transform: 'translateY(-3px)' }
      }}
    >
      Register Now
    </Button>
  </Box>
</Box>


     
      <Box sx={{ py: 6, px: 2, backgroundColor: '#f5f7fb' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            About our store
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            At ElectroShop, we believe that electrical appliances are an essential part of our daily lives, which is why we strive to create high-quality products. We are an electronics store specializing in the sale of household electrical appliances and electronics, focusing on providing a reliable, safe, and secure shopping experience.
             We always strive to:
             <br/>

Provide a wide range of appliances to suit all needs. <br/>

Ensure quality by working with the best brands. <br/>

Excellent customer service to answer your inquiries and assist you at any time. <br/>

Fast and guaranteed delivery to all areas. <br/>

Our goal is to make ElectroShop your first destination for purchasing all your electrical appliances, with a modern touch and reliable service.
          </Typography>
        </Box>
      </Box>

     
      {showForm && (
        <Box
          onClick={handleBackdropClick}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            transition: 'opacity 300ms ease'
          }}
        >
          <AnimatedPaper show={showForm} ref={formRef} onClick={(e) => e.stopPropagation()}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1976d2' }}>
              Register
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
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
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  )
                }}
              />

              {/* <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              /> */}
              <TextField
  label="Password"
  type={showPassword ? 'text' : 'password'}
  variant="outlined"
  fullWidth
  margin="normal"
  value={userData.password}
  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
  required
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
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
                onChange={(e) => setUserData({ ...userData, Fullname: e.target.value })}
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
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
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
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
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
                  transition: '0.25s',
                  '&:hover': { backgroundColor: '#1565c0', transform: 'scale(1.02)' }
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </form>
          </AnimatedPaper>
        </Box>
      )}

      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}







