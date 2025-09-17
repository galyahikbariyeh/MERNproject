const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const adminAuth=require('../middleware/adminMiddleware')
const orderController = require('../controllers/orderController');
const Orders = require('../models/Orders');

router.post('/place-order', auth, orderController.placeOrder);
router.get('/get-all-orders', auth, orderController.getAllOrders);
router.put('/archiveOrder/:id', adminAuth, orderController.archiveOrder);
router.get("/get-archived-orders", adminAuth, orderController.getArchivedOrders);



module.exports = router;