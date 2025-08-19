const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

const ProductSchema = new mongoose.Schema({
    image:{type:String,required: true},
    name:{type:String,required: true},
   description: { type: String, required: true },
    price:{type:Number,required: true},
//    quantity:{type:Number,required: true},
//    category:{type:String,required: true},
   brand:{type:String,required: true},

   category:{type:mongoose.Schema.Types.ObjectId , ref:'Category'}
   
    
    
},{timestamps:true});
module.exports =mongoose.model('Product',ProductSchema);