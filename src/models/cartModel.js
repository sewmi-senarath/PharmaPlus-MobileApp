import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  }, // Link to customer
  price: {
    type: Number,
    required: true
  }, 
  quantity: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  pharmacyId: {
    type: String,
    required: true
  },
  productImage: {
    type: String
  }, // URL to image
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('CartItem', cartItemSchema);
