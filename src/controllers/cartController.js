import CartItem from '../models/cartModel.js';
import Medicine from '../models/medicineModel.js';

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { customer, medicineId, quantity, discount, pharmacyId } = req.body;
    // Fetch medicine details
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    // Copy price and image from Medicine
    const cartItem = new CartItem({
      customer,
      medicine: medicine._id,
      price: medicine.price,
      productImage: medicine.image,
      quantity,
      discount,
      pharmacyId
    });
    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increase quantity
const increaseQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findByIdAndUpdate(id, { $inc: { quantity: 1 } }, { new: true });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Quantity increased', cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decrease quantity
const decreaseQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findById(id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    if (cartItem.quantity <= 1) return res.status(400).json({ message: 'Quantity cannot be less than 1' });
    cartItem.quantity -= 1;
    await cartItem.save();
    res.json({ message: 'Quantity decreased', cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findByIdAndDelete(id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Cart item deleted', cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get cart for checkout and call payment API (mocked)
const getCartForCheckout = async (req, res) => {
  try {
    const { customerId } = req.params;
    // Find cart items for the customer and populate customer details
    const cartItems = await CartItem.find({ customer: customerId }).populate('customer');

    // --- Payment API integration section ---
    // Example: Send cartItems to payment API
    // Uncomment and implement when payment API is available
    // import fetch from 'node-fetch'; // or use axios
    // const paymentResponse = await fetch('https://payment-api-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ cartItems })
    // });
    // const paymentResult = await paymentResponse.json();
    // if (paymentResult.success) {
    //   // Payment successful, create order here
    //   // ...order creation logic...
    //   // Remove all cart items for this customer
    //   await CartItem.deleteMany({ customer: customerId });
    //   return res.json({ message: 'Payment successful, order created and cart cleared', order: /*order data*/ });
    // } else {
    //   // Payment failed
    //   return res.status(400).json({ message: 'Payment failed' });
    // }
    // --- End Payment API integration section ---

    // For now, just return cart items (simulate sending to payment)
    res.json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addToCart, increaseQuantity, decreaseQuantity, deleteCartItem, getCartForCheckout };
