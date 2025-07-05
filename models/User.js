const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username:{type:String,required: true},
    email:{type:String,required: true},
     phone:{type:Number,required: true},
    password:{type:String,required: true},
    role:{type:String,default:'user'},
    profileImage:{type:String,required: false},
    address:{type:String,required: true},
    Fullname:{type:String,required: true}
    
    
})
UserSchema.pre('save',async function (next)  {
    if(!this.isModified('password')) return next();
    try {
        
        this.password = await bcrypt.hash(this.password,10);
        next();
        
    } catch (error) {
        next(error)
    }
    
})





module.exports =mongoose.model('User',UserSchema);