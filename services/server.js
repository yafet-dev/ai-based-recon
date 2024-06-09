// Import required modules
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js"; // Ensure the file extension is included for local modules

// Load environment variables from .env file
dotenv.config();

const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    // Set up connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Connect to MongoDB
    await mongoose.connect(DB, options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();

// Set up the server to listen on the specified port
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
