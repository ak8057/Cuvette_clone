const mongoose = require("mongoose");

// Job Schema
const jobSchema = new mongoose.Schema({
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
  openings: { type: Number }, 
  startDate: { type: String }, 
  lastDateToApply: { type: String }, 
  probationPeriod: { type: String }, 
  officeType: {
    type: String,
    enum: ["In-office", "Remote", "Hybrid"], 
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
