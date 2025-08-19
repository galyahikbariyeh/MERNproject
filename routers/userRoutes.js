const express = require('express');
const {getAllUsers,createUser,updateUser,deleteUser,login,getProfile,changePassword} = require('../controllers/userController')
const auth =require('../middleware/authMiddleware')
const adminAuth=require('../middleware/adminMiddleware')

const router  = express.Router()
const multer=require('multer');
const storage= multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});
const upload=multer({storage});

router.get('/users',auth,getAllUsers)
// router.put('/updateUser',updateUser)
router.post('/createUser',createUser)
// router.post('/createUser',upload.single('profileImage'),createUser)
router.put('/updateUser',auth,upload.single('profileImage'),updateUser)
router.post('/login',login)
router.delete('/deleteUser/:id',deleteUser)
router.get('/getProfile',auth,getProfile)
router.post('/changePassword',auth,changePassword)
// router.put('/blockUser/:id',adminAuth,blockUser)
// router.put('/unblockUser/:id',adminAuth,unblockUser)







module.exports=router;
  