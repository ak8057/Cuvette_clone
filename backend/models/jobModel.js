const mongoose = require("mongoose");

// Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  jobOffer: { type: String, required: true }, // Changed from 'type' to 'jobOffer'
  location: { type: String, required: true },
  experience: { type: String }, // Optional field, based on your code
  salaryRange: {
    min: { type: String }, // Optional, for salary range minimum
    max: { type: String }, // Optional, for salary range maximum
  },
  skills: [{ type: String }], // Optional, to store array of skills
  openings: { type: Number }, // Optional, number of available job openings
  startDate: { type: String }, // Optional, job start date
  lastDateToApply: { type: String }, // Optional, last date to apply
  probationPeriod: { type: String }, // Optional, probation period duration
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
