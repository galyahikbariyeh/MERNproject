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
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Input } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function BasicTable() {
  const [rows, setRows] = React.useState([]);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [apiCategory, setApiCategory] = React.useState([]);

 
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [editId, setEditId] = React.useState(null);

 
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5050/api/products');
        
        setRows(response.data);
        const categoryRes = await axios.get('http://127.0.0.1:5050/api/category');
        setApiCategory(categoryRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleCreate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', image);
    data.append('name', name);
    data.append('description', description);
    data.append('price', price);
    data.append('brand', brand);
    data.append('category', category);

    try {
      const response = await axios.post('http://127.0.0.1:5050/api/create', data, {
        headers: { Auth: `${localStorage.getItem('token')}` }
      });
      setRows([...rows, response.data]);
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setBrand('');
      setImage(null);
    } catch (error) {
      console.error('Error sending data to server', error);
    }
  };

  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://127.0.0.1:5050/api/deleteProduct/${id}`, {
        headers: { "Content-Type": 'application/json', 
          Auth: `${localStorage.getItem('token')}` }
      });
      setRows(rows.filter(r => r._id !== id));
    }
  };

 
  const handleOpenUpdate = (product) => {
    setEditId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category._id);
    setBrand(product.brand);
    setImage(null);
    setOpenUpdate(true);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('category', category);

    try {
      const res = await axios.put(`http://127.0.0.1:5050/api/UpdateProduct/${editId}`, formData, {
        headers: { Auth: `${localStorage.getItem('token')}` }
      });
      setRows(rows.map(row => row._id === editId ? res.data : row));
      setOpenUpdate(false);
      setEditId(null);
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <TableContainer component={Paper}>
     
      <form onSubmit={handleCreate}>
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Description" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField label="Price" fullWidth margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} />
        <InputLabel>Category</InputLabel>
        <Select fullWidth value={category} onChange={(e) => setCategory(e.target.value)}>
          {apiCategory.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
          ))}
        </Select>
        <TextField label="Brand" fullWidth margin="normal" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <Button sx={{ borderRadius:6}}  variant="contained" color="primary" type="submit">Submit</Button>
      </form>

   
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              {/* <TableCell align="right">{row.category.name}</TableCell> */}
              <TableCell align="right">{row.category?.name || 'No category'}</TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">
                <img src={`http://127.0.0.1:5050/uploads/${row.image}`} style={{ width: '100px' }} alt={row.name} />
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => handleOpenUpdate(row)}>Update</Button>
                <Button onClick={() => handleDelete(row._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Description" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextField label="Price" fullWidth margin="normal" value={price} onChange={(e) => setPrice(e.target.value)} />
          <InputLabel>Category</InputLabel>
          <Select fullWidth value={category} onChange={(e) => setCategory(e.target.value)}>
            {apiCategory.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
            ))}
          </Select>
          <TextField label="Brand" fullWidth margin="normal" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdate(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}




