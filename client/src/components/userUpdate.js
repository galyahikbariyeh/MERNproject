import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Modal } from '@mui/material';
import Box from '@mui/material';
import Typography from '@mui/material';
import { Input } from '@mui/material';

/*const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];*/

export default function BasicTable() {
  const[rows , setRows] = React.useState([]);
  const[username, setUsername]=React.useState('');
  const[email,setEmail]=React.useState('');
  const[phone , setPhone]=React.useState('');
 const[password , setPassword]=React.useState('');
 const[role , setRole]=React.useState('');
 const [profileImage , setProfileimage]=React.useState(null);
  const[address,setAddress]=React.useState('');
  const [Fullname , setFullName]=React.useState('');
 
  

 
  React.useEffect(()=>{
    const fetchData= async()=>{
      try {
         const token = localStorage.getItem('token');
        const response=await axios.get('http://127.0.0.1:5050/api/users',{
             headers: {
          Auth: ` ${token}`,
        }
        });
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:',error);
      }
    };
    fetchData();
  }, []);
  return (
    <TableContainer component={Paper}>
      

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            {/* <TableCell align="right">Password</TableCell> */}
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Address</TableCell>
             {/* <TableCell align="right">profileImage</TableCell> */}
              <TableCell align="right">Fullname</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="user">
                {user.username}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              {/* <TableCell align="right">{user.password}</TableCell> */}
              <TableCell align="right">{user.role}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.Fullname}</TableCell>

              {/* <TableCell align="right"><img src={`http://127.0.0.1:5050/uploads/${user.profileImage}`} style={{width:'100px'}}/></TableCell> */}
               <TableCell align="right">
               

                <Button onClick={async()=>{
                  if(window.confirm("Are you sure you want to delete this user profile?")){  
                  await  axios.delete(`http://127.0.0.1:5050/api/deleteUser/${user._id}`,{
                    headers:{
                       "Content-Type":'application/json',
                       Auth: `${localStorage.getItem('token')}` 
                    }
                  })
                  console.log('User deleted', user._id);
                  setRows(rows.filter(r => r._id !== user._id))
                
                }
                  
                }}>Delete</Button>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
  

}





