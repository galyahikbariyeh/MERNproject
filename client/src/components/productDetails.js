import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Grid, Card, CardMedia, CardContent, Typography, Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import Navbar from './navBar';
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setNotFound(false);
      setProduct(null);
      setRelated([]);

      try {
       
        console.log('Requesting single product /api/products/:id ->', id);
        const singleRes = await axios.get(`http://127.0.0.1:5050/api/products/${id}`);
        console.log('singleRes:', singleRes.data);
     
        const maybeProduct = singleRes.data && (singleRes.data._id || singleRes.data.id ? singleRes.data : (singleRes.data.product || singleRes.data.data || null));
        if (maybeProduct) {
          setProduct(maybeProduct);
        } else {
          
          throw new Error('single product response not in expected shape');
        }

      } catch (errSingle) {
        console.warn('single product fetch failed or not in expected shape:', errSingle);
        
        try {
          const allRes = await axios.get('http://127.0.0.1:5050/api/products');
          console.log('all products fallback raw:', allRes.data);
          const arr = allRes.data && (Array.isArray(allRes.data) ? allRes.data : (allRes.data.products || allRes.data.data || []));
          const found = arr.find(p => (p._id || p.id) === id);
          if (found) {
            setProduct(found);
           
            const relatedList = arr.filter(p => (p.category && (p.category._id || p.category.id) === (found.category && (found.category._id || found.category.id)) ) && (p._id || p.id) !== (found._id || found.id));
            setRelated(relatedList);
          } else {
            setNotFound(true);
          }
        } catch (errAll) {
          console.error('fallback all-products fetch failed:', errAll);
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await axios.post('http://127.0.0.1:5050/api/add-to-cart', { productId: product._id || product.id, quantity: 1 }, {
        headers: { 'Auth': `${localStorage.getItem('token')}` }
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('  Error through add to cart ');
    }
  };

  if (loading) return <Typography align="center" sx={{ mt: 10 }}>Loading...</Typography>;
  if (notFound) return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h6" color="error" align="center">Product not available </Typography>
      <Button sx={{ mt: 2 }} onClick={() => navigate('/home')}>Back to Home</Button>
    </Container>
  );

  return (
    <>
    <Navbar/>
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card >
            <CardMedia
              component="img"
              image={`http://127.0.0.1:5050/uploads/${product.image}`}
              alt={product.name}
              sx={{ height: 420, objectFit: 'cover' }}
              
              //product
              onClick={() => navigate(`/details/${product._id || product.id}`)}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="body1" gutterBottom>{product.description}</Typography>
          <Typography variant="body2" color="text.secondary">Category: {product.category?.name}</Typography>
          <Typography variant="body2" color="text.secondary">Brand: {product.brand}</Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 2 }}>{product.price} JD</Typography>

          <Button
            variant="contained"
            color={added ? 'success' : 'primary'}
            startIcon={added ? <CheckIcon /> : <ShoppingCartIcon />}
            sx={{ mt: 3 }}
            onClick={handleAddToCart}
          >
            {added ? 'Added' : 'Add to Cart'}
          </Button>
        </Grid>
      </Grid>

      {related.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 5, mb: 2 }}> Similar products</Typography>
          <Grid container spacing={6} >
            {related.map(p => (
              // <Grid item xs={12} sm={6} md={4} key={p._id || p.id}>
               <Grid item xs={12} sm={6} md={4} key={p._id || p.id} sx={{ display: "flex" }}>
                <Card sx={{ cursor: 'pointer' ,width:250} }onClick={() => navigate(`/details/${p._id || p.id}`)}>
                  <CardMedia
                    component="img"
                    image={`http://127.0.0.1:5050/uploads/${p.image}`}
                    alt={p.name}
                    sx={{ height: 180, objectFit: 'cover'}}
                   
                  />
                  <CardContent  sx={{ flexGrow: 1,width:200 ,height:250}} >
                    <Typography variant="subtitle1">{p.name}</Typography>
                    <Typography variant="subtitle1">{p.description}</Typography>
                    <Typography variant="subtitle1">{p.category.name}</Typography>
                    <Typography variant="subtitle1">{p.brand}</Typography>
                    <Typography variant="body2" color="primary">{p.price} JD</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
    </>
  );
}




