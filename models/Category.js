const mongoose = require ('mongoose');
const Product = require ('./Products');
const categorySchema = new mongoose.Schema({
    
    name:{type:String,required: true, unique: true},
  
  
    
    
},{timestamps:true})
 categorySchema.pre('deleteOne',{document:true,query:false},async function (next) {
    try {
        await Product.deleteMany({category:this._id});
        next();
    } catch (error) {
        next(error);
    }

    
 },{timestamps:true})
module.exports =mongoose.model('Category',categorySchema);