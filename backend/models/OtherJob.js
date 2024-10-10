const mongoose = require("mongoose");

// Job Schema
const OtherjobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  jobOffer: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Freelance", "Internship"], // Restricted to the specified types
  },
  location: { type: String, required: true },
  experience: {
    type: String,
    enum: ["Fresher", "1-3", "3+"], // Experience is restricted to "Fresher", "1-3" or "3+"
  },
  salaryRange: {
    min: { type: String }, // Optional, for salary range minimum
    max: { type: String }, // Optional, for salary range maximum
  },
  skills: [{ type: String }], // Optional, to store array of skills
  
  officeType: {
    type: String,
    enum: ["In-office", "Remote", "Hybrid"], // Office type is restricted to "In-office", "Remote", or "Hybrid"
  },
});

const OtherJob = mongoose.model("OtherJob", OtherjobSchema);

module.exports = OtherJob;
