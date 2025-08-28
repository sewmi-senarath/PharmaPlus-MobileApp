import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import medicineRoutes from "./src/routes/medicineRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/users", (req, res) => {
  res.json({ message: "Get all users" });
});

// Cart routes
app.use("/api/cart", cartRoutes);

// Medicine routes
app.use("/api/medicine", medicineRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));