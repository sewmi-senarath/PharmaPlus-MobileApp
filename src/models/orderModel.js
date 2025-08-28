import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true 
    },

  customer: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Customer',
     required: true 
    },
  items: [
    {
      medicine: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Medicine', 
        required: true 
        },
      quantity: {
         type: Number, 
         required: true 
        },
      price: { 
        type: Number, 
        required: true 
        },
      discount: { 
        type: Number, 
        default: 0 
        }
    }
  ],
  deliveryAddress: {
     type: String, 
     required: true 
    },
  status: {
    type: String,
    enum: [
      'pending',
      'processing',
      'packed',
      'on_the_way',
      'delivered',
      'cancelled',
      'returned'
    ],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
