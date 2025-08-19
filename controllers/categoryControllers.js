const { default: mongoose } = require('mongoose');
const Category = require ('../models/Category');
const bcrypt = require('bcrypt');

exports.createCategory=async (req,res)=>{
    try {
        const {name} =req.body;
        const newCategory = new Category ({name});
        await newCategory.save();
        res.status(201).json({message:'Category created successfuly'});
        
    } catch (error) {
          res.status(500).json({message:'Error creating category '});
    }
}

exports.getAllCategories=async (req,res)=>{
    try{
           const category = await Category.find();  
           res.status(200).json(category) 
       } 
       catch(error){
           res.status(500).json({message:error.message}) 
       }
   }


   exports.getCategoriesById=async (req,res)=>{
    try{
           const category = await Category.findById(req.params.id);  
           if(!category) return res.status(400).json({message:'Category not found'})
           res.status(200).json(category) 
       } 
       catch(error){
           res.status(500).json({message:error.message}) 
       }
   }

   exports.updateCategory=async (req,res)=>{
    try {
           const {id} =req.params
           const category=req.body;
           if(!mongoose.Types.ObjectId.isValid(id)){
            return   res.status(404).send(' id not valid')
           }
   
           const updateCategory= await Category.findByIdAndUpdate(id,{...category,id})
           if(!updateCategory){
               res.status(404).json({message:'Category not found'})
           }
           else{
               res.status(200).json({updateCategory})
           }
       } catch (error) {
           console.log(error)
       }
   }

//    exports.deletedCategoryById = async (req, res) => {
//     try {
//         const deletedCategory = await Category.findByIdAndDelete(req.params.id);
//         if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
//         res.status(200).json({ message: 'Category deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting category', error: error.message });
//     }
//     }



exports.deletedCategoryById= async (req,res) => {
   try {
        const category = await Category.findById(req.params.id);
        if(category){
            await category.deleteOne();
        }
        if(!category) return res.status(404).json({message:'Category not found'})
            res.status(200).json({message:'Category deleted successfully'})
        console.log("Received ID:", req.params.id);

    } catch (error) {
        console.error("error deleting category",error);
        res.status(500).json({message:'error deleting category',error})
    }
    
}

