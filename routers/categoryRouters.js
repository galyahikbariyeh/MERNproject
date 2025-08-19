
const {createCategory,getAllCategories,updateCategory,deletedCategoryById}= require('../controllers/categoryControllers')
const adminAuth=require('../middleware/adminMiddleware')
const express = require('express');
const router  = express.Router()

router.get('/category',getAllCategories)
router.post('/createcat',adminAuth,createCategory)


router.put('/UpdateCategory/:id',adminAuth,updateCategory)
router.delete('/deleteCategory/:id',adminAuth,deletedCategoryById)



module.exports=router;