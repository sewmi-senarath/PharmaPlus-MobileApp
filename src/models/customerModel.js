import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
     type: String, required: true 
    },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'], unique: true
  },
  password: {
    type: String, 
    required: [true, 'Password is required']
},

avatar: {
    type: String,
    default: ""
  },
  refreshToken: {
    type: String,
    default: "" 
  },
  verify_email: {
    type: Boolean,
    default: false
  },
  last_login_date: {
    type: Date,
    default: ""
  },
 status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
address_details: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Address'
  }
],
shopping_cart: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'cartProduct'
  }
],
OrderHistory: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'Order'
  }
],
forgot_password_otp: {
  type: String,
  default: null
},

forgot_password_expiry: {
  type: Date,
  default: ""
},
preferred_language: {
  type: String,
  enum: ['en', 'ta', 'si'],
  default: 'en'
},
role: {
    type: String, 
    enum : ["customer", "driver", "pharmacist"],
    default: "customer"
}
}, {
    timestamps : true
})
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;