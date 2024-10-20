const mongoose = require("mongoose");

// Job Schema
const OtherjobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  jobOffer: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Freelance", "Internship"], 
  },
  location: { type: String, required: true },
  experience: {
    type: String,
    enum: ["Fresher", "1-3", "3+"], 
  },
  salaryRange: {
    min: { type: String }, 
    max: { type: String }, 
  },
  skills: [{ type: String }],
  
  officeType: {
    type: String,
    enum: ["In-office", "Remote", "Hybrid"], 
  },
});

const OtherJob = mongoose.model("OtherJob", OtherjobSchema);

module.exports = OtherJob;
