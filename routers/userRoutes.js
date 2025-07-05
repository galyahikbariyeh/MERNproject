const express = require('express');
const {getAllUsers,createUser,updateUser,deleteUser,login,getProfile,changePassword} = require('../controllers/userController')
const auth =require('../middleware/authMiddleware')

const router  = express.Router()

router.get('/users',auth,getAllUsers)
router.put('/updateUser',updateUser)
router.post('/createUser',createUser)
router.post('/login',login)
router.delete('/deleteUser',deleteUser)
router.get('/getProfile',auth,getProfile)
router.post('/changePassword',auth,changePassword)







module.exports=router;
  