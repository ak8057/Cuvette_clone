const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jobRoutes = require("./routes/jobRoutes");
require("dotenv").config();
const unsplashRoute = require("./routes/unsplash");


//!middleware
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;


//!database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
  });

  
//!apis
app.use("/api/unsplash", unsplashRoute);
app.use("/api/jobs",  jobRoutes);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
