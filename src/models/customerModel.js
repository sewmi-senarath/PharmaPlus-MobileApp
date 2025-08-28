import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
     type: String, required: true 
    },
  customerId: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

export default mongoose.model('Customer', customerSchema);
