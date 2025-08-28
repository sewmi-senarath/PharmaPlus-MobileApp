import Medicine from '../models/medicineModel.js';

// Add a new medicine
const addMedicine = async (req, res) => {
  try {
    const { name, price, description, image, pharmacyId } = req.body;
    const medicine = new Medicine({
      name,
      price,
      description,
      image,
      pharmacyId
    });
    await medicine.save();
    res.status(201).json({ message: 'Medicine added', medicine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addMedicine };
