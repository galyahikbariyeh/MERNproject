const { default: mongoose } = require('mongoose');
const Product = require('../models/Products');
const User = require ('../models/User');
const admin=require('../middleware/authMiddleware')
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.getAllProducts= async(req,res)=>{
    try{
        const products = await Product.find().populate('category','name');  
        res.status(200).json(products) 
    } 
    catch(error){
        res.status(500).json({message:error.message}) 
    }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

//create pro

// exports.createNewProduct= async (req,res) => {
//    console.log('this is api for create product');
//    try {
    
//     const product = req.body
//     console.log(product)
//     const newProduct = new Product(product)
//     await newProduct.save()
//     res.status(201).json(newProduct)
//    } catch (error) {
//     console.log(error)
//     res.status(500).json({message:error})
//    }
    
// }
// exports.createNewProduct= async (req,res) => {
// try {
//      const Prodimage=req.file ? req.file.filename : null;
//     console.log(Prodimage)
//     const{name,description,price,category}=req.body;
//     const newProduct= new Product({
//         Prodimage,
//         name,
//         description,
//         price,
//         category

//     });
//     await newProduct.save();
//     res.status(201).json({message:'Product created successfully',product: newProduct})
// } catch (error) {
//     res.status(500).json({ message: 'Error creating product', error: error.message });
// }
   
// }

// last one--
exports.createNewProduct = async (req, res) => {
  try {
    const Prodimage = req.file ? req.file.filename : null;
    const { name, description, price, category,brand } = req.body;

    const newProduct = new Product({
      image: Prodimage, 
      name,
      description,
      price,
      brand,
      category,
     
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};




exports.deleteProductById= async (req,res) => {
    try {
        const {id} =req.params
        console.log('this is id',id)
        if(!mongoose.Types.ObjectId.isValid(id)){
            return   res.status(404).send(' id not valid')
           }
           const deleteProduct= await Product.findByIdAndDelete(id);
           console.log(mongoose.Types.ObjectId.isValid(id))
           if(!deleteProduct){
            res.status(404).json({message:'product not found'})
        }
        else{
            res.status(200).json({message:'product delete succesfully'})
        }
    } catch (error) {
        console.log(error)
    }
    
}

exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

   
    if (req.file) {
      console.log('Uploaded file info:', req.file);
      productData.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...productData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
