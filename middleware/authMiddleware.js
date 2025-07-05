
const jwt = require('jsonwebtoken')
const auth = (req,res,next)=>{
    const token=  req.header('Auth')
    if(!token) return res.status(401).json({msg:'No token,acces denied'});

    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        console.log("Decoded token",decoded);
        req.user=decoded.userId;
        req.role=decoded.role;
        next();

    } catch (error) {
        res.status(400).json({msg:'Invalid token'})
    }
}
module.exports= auth;


