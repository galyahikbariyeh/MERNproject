import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Box,
  Button,
  IconButton,
  Stack
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navbar from './navBar';
import Footer from './footer';


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [apiCategory, setApiCategory] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [page, setPage] = useState(1);    
  const itemsPerPage = 25;                
  const navigate = useNavigate();

  
  const carouselImages = [
   
    "https://png.pngtree.com/background/20230520/original/pngtree-pc-and-some-computers-sitting-on-a-desktop-picture-image_2673509.jpg",
     "https://cdn.al-ain.com/lg/images/2024/1/28/195-211132-date-stability-price-electrical-appliances-egypt_700x400.jpg",
    "https://media.elbalad.news/ArticleUpload/2024/11/30/iphone__kqge21l9n26q_611_080001.jpg",
    "https://m.arabic.corrimacoffeemachine.com/photo/pt33453423-cafe_shop_corrima_coffee_machine_double_group_multi_boiler_550ml_3_in_1_coffee_maker.jpg"
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5050/api/products');
        setProducts(response.data);
        const categoryRes = await axios.get('http://127.0.0.1:5050/api/category');
        setApiCategory(categoryRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/fav", {
          headers: { Auth: localStorage.getItem("token") },
        });
        const favItems = res.data.items || res.data;
        setFavoriteProducts(
          favItems.map((item) => (item.product ? item.product._id : item._id))
        );
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, []);

  const handleChangePage = (event, value) => setPage(value);

  const filteredProducts = products.filter(
    (product) => !category || product.category._id === category
  );

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const displayedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const addToCart = (productId) => {
    axios.post("http://localhost:5050/api/add-to-cart", { productId, quantity: 1 }, {
      headers: {
        'Content-Type': 'application/json',
        'Auth': `${localStorage.getItem('token')}`
      }
    }).then(() => {
      alert("Added to cart");
    }).catch(err => {
      alert(err);
    });
  };

  const handleAddToCartClick = (productId) => {
    addToCart(productId);
    setAddedProducts(prev => [...prev, productId]);
    setTimeout(() => setAddedProducts(prev => prev.filter(id => id !== productId)), 2000);
  };

  const handleFavoriteClick = async (productId) => {
    try {
      if (favoriteProducts.includes(productId)) {
        setFavoriteProducts(prev => prev.filter(id => id !== productId));
        await axios.delete(`http://localhost:5050/api/remove/${productId}`, {
          headers: { Auth: localStorage.getItem("token") },
        });
      } else {
        setFavoriteProducts(prev => [...prev, productId]);
        await axios.post(
          "http://localhost:5050/api/add",
          { productId },
          { headers: { Auth: localStorage.getItem("token") } }
        );
        alert('Add to favorites')
      }
    } catch (err) {
      console.error("Error toggling favorite:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <Navbar />

      
      {page === 1 && (
        <Container sx={{ mt: 2 }}>
          <Slider {...sliderSettings}>
            {carouselImages.map((img, index) => (
              <Box key={index} sx={{ height: 300, overflow: "hidden" }}>
                <img
                  src={img}
                  alt={`slide-${index}`}
                  style={{ width: "100%", height: "300px", objectFit: "contain", borderRadius: 8 }}
                />
              </Box>
            ))}
          </Slider>
        </Container>
      )}

      <Box>
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom align="center" color='#1976d2'>
            {/* All Products */}
          </Typography>

          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            sx={{ mb: 4, minWidth: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            {apiCategory.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
            ))}
          </Select>

          <Grid container spacing={4}>
            {displayedProducts.map((product) => {
              const isAdded = addedProducts.includes(product._id);
              const isFavorite = favoriteProducts.includes(product._id);

              return (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                  <Card
                    sx={{
                      height: 470,
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      justifyContent: "space-between",
                      width: 204,
                      '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`http://127.0.0.1:5050/uploads/${product.image}`}
                      alt={product.name}
                      sx={{ height: 180, objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => navigate(`/details/${product._id}`)}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" gutterBottom>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>{product.description}</Typography>
                      <Typography variant="body2" color="text.secondary">{product.category.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{product.brand}</Typography>
                      <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>{product.price} JD</Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: "auto" }}>
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

                        <IconButton
                          color={isFavorite ? 'error' : 'default'}
                          onClick={() => handleFavoriteClick(product._id)}
                        >
                          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {pageCount > 1 && (
            <Stack spacing={2} sx={{ mt: 4 }} alignItems="center">
              <Pagination
                count={pageCount}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  );
}
