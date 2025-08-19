import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Navbar from './navBar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>{error}</p>;
  if (!favorites.length) return <p>No favorite items </p>;

  return (
    <>
    <Navbar/>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color='#1976d2'>My Favorites</Typography>
      <Grid container spacing={4}>
        {favorites.map((item) => {
          const product = item.product || item; 
          return (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Card 
              sx={{
                        height: 450,
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s',
                        width: 204,
                        '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' },
                      }}onClick={() => navigate(`/details/${product._id}`)}

              
              
              >
                <CardMedia
                  component="img"
                  image={`http://127.0.0.1:5050/uploads/${product.image}`}
                  alt={product.name}
                  sx={{ height: 200 }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="h6">{product.description}</Typography>
                  <Typography variant="h6">{product.category.name}</Typography>
                  <Typography variant="h6">{product.brand}</Typography>
                  <Typography>{product.price} JD</Typography>
                </CardContent>
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

