import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  price: { 
    type: Number, 
    required: true 
    },
  description: { 
    type: String 
    },
  image: { 
    type: String 
    },
  pharmacyId: { 
    type: String, 
    required: true 
    },
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

export default mongoose.model('Medicine', medicineSchema);
