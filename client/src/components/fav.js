import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box 
} from '@mui/material';
import Navbar from './navBar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/fav", {
          headers: { "Auth": localStorage.getItem("token") }
        });
        setFavorites(res.data.items || res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleAddToCartClick = async (productId) => {
    try {
      await axios.post("http://localhost:5050/api/add-to-cart", 
        { productId, quantity: 1 }, 
        { headers: { "Auth": localStorage.getItem("token") } }
      );

      
      setAddedItems((prev) => [...prev, productId]);

     
      setTimeout(() => {
        setAddedItems((prev) => prev.filter((id) => id !== productId));
      }, 3000);

    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>{error}</p>;
  if (!favorites.length) return <p>No favorite items </p>;

  return (
    <>
      <Navbar/>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom color='#1976d2'>Favorites</Typography>
        <Grid container spacing={4}>
          {favorites.map((item) => {
            const product = item.product || item; 
            const isAdded = addedItems.includes(product._id);

            return (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <Card 
                  sx={{
                    height: 470,
                    display: 'flex',
                    flexDirection: 'column',
                     justifyContent: 'space-between',
                    transition: 'transform 0.3s',
                    width: 230,
                    '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' },
                  }}
                >
                  <Box sx={{ cursor: "pointer" }} onClick={() => navigate(`/details/${product._id}`)}>
                    <CardMedia
                      component="img"
                      image={`http://127.0.0.1:5050/uploads/${product.image}`}
                      alt={product.name}
                      sx={{ height: 200 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2">{product.description}</Typography>
                      <Typography variant="body2">{product.category?.name}</Typography>
                      <Typography variant="body2">{product.brand}</Typography>
                      <Typography color="primary" fontWeight="bold">{product.price} JD</Typography>
                    </CardContent>
                  </Box>

                 
                  <Box sx={{   p: 2 }}>
                    <Button
                      variant="contained"
                      color={isAdded ? 'success' : 'primary'}
                      fullWidth
                      startIcon={isAdded ? <CheckIcon /> : <ShoppingCartIcon />}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap', 
                        fontSize: '14px',
                        '&:hover': { backgroundColor: isAdded ? '#2e7d32' : '#1565c0', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' },
                      }}
                      onClick={() => handleAddToCartClick(product._id)}
                    >
                      {isAdded ? 'Added' : 'Add to Cart'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Footer/>
    </>
  );
}
