const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/faveControllers');
const auth = require('../middleware/authMiddleware');

router.post("/add", auth, favoriteController.addFavorite);
router.delete("/remove/:productId", auth, favoriteController.removeFavorite);
router.get("/fav", auth, favoriteController.getFavorites);

module.exports = router;