// Import express framework to build the API server
const express = require('express');

// Import cors to allow requests from RapidAPI or frontend apps
const cors = require('cors');

// Create express app instance
const app = express();

// Use middleware to parse JSON body data
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define port (RapidAPI usually uses 3000 or env port)
const PORT = process.env.PORT || 3000;

/*
========================================
 BASIC RANDOM PREDICTION ENDPOINT
========================================
*/
app.post('/predict', (req, res) => {
    // Extract user input from request body
    const { input } = req.body;

    // Validate input
    if (!input) {
        return res.status(400).json({ error: "Input is required" });
    }

    // Create a list of possible predictions
    const predictions = [
        "Very Likely",
        "Likely",
        "Uncertain",
        "Unlikely",
        "Very Unlikely"
    ];

    // Pick random prediction
    const result = predictions[Math.floor(Math.random() * predictions.length)];

    // Send response
    res.json({
        input,
        prediction: result
    });
});

/*
========================================
 TREND SCORE PREDICTION
========================================
*/
app.post('/trend', (req, res) => {
    // Extract numeric value
    const { value } = req.body;

    // Check if value exists and is a number
    if (typeof value !== "number") {
        return res.status(400).json({ error: "Value must be a number" });
    }

    // Simple "AI-like" logic (can upgrade later)
    let trend;

    if (value > 80) trend = "High Growth";
    else if (value > 50) trend = "Moderate Growth";
    else if (value > 20) trend = "Stable";
    else trend = "Declining";

    // Respond with result
    res.json({
        value,
        trend
    });
});

/*
========================================
 HEALTH CHECK (IMPORTANT FOR RAPIDAPI)
========================================
*/
app.get('/', (req, res) => {
    // Basic message to confirm API is running
    res.send("Prediction API is running 🚀");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
