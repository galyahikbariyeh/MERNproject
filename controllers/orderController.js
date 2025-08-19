const Orders = require('../models/Orders');
const Cart = require('../models/Cart');


exports.placeOrder = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user }).populate('items.product');
    if (!cart){
        return res.status(400).json({ message: 'Cart not found' });
    }
    const total =cart.items.reduce((sum,item)=>sum +  parseInt(item.product.price) * item.quantity,0);
    const order = new Orders({
        user:req.user,
        items:cart.items.map(item=>({
            product: item.product._id,
            quantity: item.quantity
        })),
        total,
        status: 'completed'
    })
    await order.save();
   
    await Cart.findOneAndDelete({ user: req.user });
    res.status(201).json({ message: 'Order placed successfully', order });
}

// exports.getAllOrders = async (req, res) => {
//     const orders = await Orders.find({ user: req.user }).populate(['items.product', 'user']);
//     res.status(200).json(orders);
// }

exports.getAllOrders = async (req, res) => {
  try {
    let orders;
    if (req.role === 'admin') {
      
      orders = await Orders.find()
        .populate(['items.product', 'user']);
    } else {
      orders = await Orders.find({ user: req.user })
        .populate(['items.product', 'user']);
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};



exports.archiveOrder = async (req, res) => {
  try {
    const order = await Orders.findByIdAndUpdate(
      req.params.id,
      { archived: true },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order archived successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error archiving order', error });
  }
};

exports.getArchivedOrders = async (req, res) => {
  try {
    const orders = await Orders.find({ archived: true })
      .populate("user") 
      .populate("items.product"); 

    res.json(orders);
  } catch (error) {
    console.error("getArchivedOrders error:", error.message);
    res.status(500).json({ message: "Error fetching archived orders", error });
  }
};

