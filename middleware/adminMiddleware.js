const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY
require('dotenv').config();


const adminAuth = (req,res,next)=>{
    const token=  req.header('Auth')
    if(!token) return res.status(401).json({msg:'No token,acces denied'});

    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        console.log("Decoded token",decoded);
        req.user=decoded.userId;
        req.role=decoded.role;
        if(req.role !== 'admin'){
            return res.status(403).json({ message: 'you are not admin'})
        }
        next();

    } catch (error) {
        res.status(400).json({msg:'Invalid token'})
    }
}
module.exports= adminAuth;