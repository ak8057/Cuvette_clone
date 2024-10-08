// routes/unsplash.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Route to fetch images from Unsplash
router.get("/", async (req, res) => {
  const { query } = req.query; // e.g., frontend, backend, etc.
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        client_id: process.env.UNSPLASH_API_KEY, // Access the API key from the environment variables
      },
      timeout: 10000,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Unsplash:", error); 
    res.status(500).json({ error: "Error fetching data from Unsplash" });
  }
});

module.exports = router;
