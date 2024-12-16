const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();  // This is for loading environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 8081;  // Default to port 8081 if not specified

// Middleware
app.use(express.json());  // Parses incoming JSON requests
app.use(cors());  // Enables Cross-Origin Resource Sharing (CORS) for requests from different domains

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)  // Connect to MongoDB using URI stored in .env file
  .then(() => console.log("Database connected"))  // Log success message on successful connection
  .catch((err) => console.error("Database connection failed", err));  // Log error if the connection fails

// Routes
const foodRouter = require("./routes/foodRouter");  // Import the router for handling food-related API routes
app.use("/api", foodRouter);  // Use the foodRouter for all API routes that start with "/api"

// Root route
app.get("/", (req, res) => res.send("Welcome to the Food API!"));  // Sends a basic welcome message when the root URL is accessed
// Mock database for orders
let orders = [];

// Fetch all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Create a new order
app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});


// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));  // Start the server and log the port it's running on
