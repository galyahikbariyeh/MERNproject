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
 exports.updateUser = async (req , res) => {
        const id=req.user
        const {username,email,phone,address}=req.body
    
        try {
            const user = await  User.findByIdAndUpdate(id,{ username,email,phone,address})
           //save
            savedU = new User(user)
        savedU.save()
            res.status(200).json({message:'User update successfully'})
          

        } catch (error) {
            res.status(500).json({message:error.message})
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
    
    //login
    exports.login = async (req, res) => {
        const {email, password}= req.body
        try {
            const user = await User.findOne({email:email})
            if (!user){
                return res.status(400).json({message:'User not found'})
            }
            const isMatch = await bcrypt.compare(password,user.password)
            if (!isMatch){
                return res.status(400).json({message:'Invalid password'})
            }
           const token = jwt.sign({userId:user._id,role:user.role},SECRET_KEY,{expiresIn:'24h'})
            return res.status(200).json({message:'User logged in successfully'/*,user:user*/,token:token})
        } catch (error) {
           res.status(500).json({message:error.message}) 
        }
        
    }
   
  // change password
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
