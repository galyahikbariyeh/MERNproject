const Favorite = require("../models/Favorite");


exports.addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;

    
    const exists = await Favorite.findOne({ user: req.user, product: productId });
    if (exists) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    const favorite = new Favorite({ user: req.user, product: productId });
    await favorite.save();

    res.status(201).json({ message: "Added to favorites", favorite });
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error });
  }
};


exports.removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    await Favorite.findOneAndDelete({ user: req.user, product: productId });
    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite", error });
  }
};


exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user })
      .populate("product");
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
};
