import express from 'express';
import { getOrdersByCustomer, getAllOrders, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// Get all orders for a specific customer
router.get('/customer/:customerId', getOrdersByCustomer);

// Get all orders (admin view)
router.get('/all', getAllOrders);

// Update order status
router.patch('/update/:id', updateOrderStatus);

// Delete order
router.delete('/delete/:id', deleteOrder);

export default router;
