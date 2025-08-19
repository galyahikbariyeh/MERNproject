const {getAllProducts,createNewProduct,updateProductById,deleteProductById}= require('../controllers/productController')
const adminAuth=require('../middleware/adminMiddleware')
const express = require('express');
const router  = express.Router()
const multer=require('multer');
const storage= multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});
const upload=multer({storage});
router.post('/create',adminAuth,upload.single('image'),createNewProduct)

router.put('/UpdateProduct/:id',adminAuth,upload.single('image'),updateProductById)

router.get('/products',getAllProducts)
// router.post('/create',adminAuth,createNewProduct)


// router.put('/UpdateProduct/:id',adminAuth,updateProductById)
router.delete('/deleteProduct/:id',adminAuth,deleteProductById)
module.exports=router;