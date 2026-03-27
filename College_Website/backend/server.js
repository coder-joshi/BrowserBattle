import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 2. Create a Schema and Model for the Enquiries
const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

// 3. POST Route to handle incoming contact form submissions
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save the new enquiry to the database
    const newEnquiry = new Enquiry({ name, email, message });
    await newEnquiry.save();

    console.log("New Enquiry Saved to Database:", newEnquiry);

    // Send success response to frontend
    res.status(201).json({ success: true, message: "Enquiry sent successfully!" });

  } catch (error) {
    console.error("Server error saving enquiry:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});