const { default: mongoose } = require('mongoose');
const User = require ('../models/User');
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY

exports.getAllUsers= async(req,res)=>{
    try{
        const users = await User.find();  
        res.status(200).json(users) 
      
    } 
    catch(error){
        res.status(500).json({message:error.message}) 
    }
}
exports.getProfile = async (req,res)=>{
    console.log(req.user)
    const user=await User.findById(req.user).select('-password');
    res.json(user);
}
exports.createUser = async (req,res)=>{
    const {username,email,phone,password,profileImage,address,Fullname} = req.body;
    try {
       
        user ={username,email,phone,password,profileImage,address,Fullname}
        savedUser = new User(user)
        savedUser.save()
        res.status(200).json({message:'User register in successfully',savedUser})
         
       
    }
    
    catch (error){
        res.status(500).json({message:error.message})
    }

 }


exports.updateUser= async (req,res)=>{
    try {
        const profileImage= req.file ? req.file.path : null;
        const {username,email,phone,address,Fullname}=req.body;
        const user = await User.findByIdAndUpdate(req.user,{username,email,profileImage,phone,address,Fullname}, {new:true});
        if(!user)  res.status(404).json({msg:'User not Found'})
            await user.save();
         res.json({message:'User update successfully',user})

    } catch (error) {
        console.error('Error updating User',error.message)
        res.status(500).json({msg:'Server error',error:error.message})
    }
}
 exports.deleteUser = async (req , res) => {
        const {id}=req.params
       
        try {
            const user = await  User.findByIdAndDelete(id)
            res.status(200).json({message:'User delete successfully',user:user})
        } catch (error) {
            res.status(500).json({message:error.message})
        }
        
    }
    
    


  exports.changePassword = async (req,res) =>{
    try {
        const {oldPassword ,newPassword}=req.body;
        const user = await User.findById(req.user);
        console.log(user)
        if(!user) return res.status(404).json({msg:'User not found'});
        const isMatch= await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) return res.status(400).json({msg:'Old password is incorrect'})
            const hashedNewPass= await bcrypt.hash(newPassword,10);
        const matchAfterChange= await bcrypt.compare(newPassword, hashedNewPass);
        console.log("New password match status after hashing",matchAfterChange);
        console.log("Hashed new password:",hashedNewPass);
       
        user.password= newPassword;
        await user.save();
        res.json({msg:'Password changed successfully'});
    } catch (error) {
        console.error(" Error changing password:", error.message);
        res.status(500).json({msg:'Server error', error:error.message})
    }
  }





exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    
    

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
     const payload = {
      userId: user._id,
      role: user.role 
    };

    const token = jwt.sign(
      { userId: user._id, role: user.role,payload },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    return res.status(200).json({
      message: 'User logged in successfully',
      token: token,
      user: {
        _id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
        
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




