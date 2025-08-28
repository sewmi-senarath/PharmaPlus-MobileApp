import Order from '../models/orderModel.js';
import Medicine from '../models/medicineModel.js';
import Customer from '../models/customerModel.js';

// Get all orders for a specific customer
const getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customer: customerId })
      .populate('customer')
      .populate('items.medicine');
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin view)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer')
      .populate('items.medicine');
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate('customer')
      .populate('items.medicine');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getOrdersByCustomer, getAllOrders, updateOrderStatus, deleteOrder };
