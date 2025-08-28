import express from 'express';
import { addToCart, increaseQuantity, decreaseQuantity, deleteCartItem, getCartForCheckout } from '../controllers/cartController.js';

const router = express.Router();

// Route to add item to cart
router.post('/add', addToCart);

// Route to increase quantity
router.patch('/increase/:id', increaseQuantity);

// Route to decrease quantity
router.patch('/decrease/:id', decreaseQuantity);

// Route to delete cart item
router.delete('/delete/:id', deleteCartItem);

// Route to get cart for checkout
router.get('/checkout/:userId', getCartForCheckout);

export default router;
