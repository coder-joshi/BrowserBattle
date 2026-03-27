import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
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
    phone: { type: String },    // <-- ADD THIS
    subject: { type: String },  // <-- ADD THIS
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

// 3. POST Route to handle incoming contact form submissions
// INSIDE YOUR BACKEND server.js

app.post('/api/contact', async (req, res) => {
    try {
        // Extract all 5 fields from the request body
        const { name, email, phone, subject, message } = req.body;

        // Create a new database entry with all 5 fields
        const newContact = new Contact({
            name,
            email,
            phone,      // <-- Make sure this is here
            subject,    // <-- Make sure this is here
            message
        });

        await newContact.save();
        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message." });
    }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});