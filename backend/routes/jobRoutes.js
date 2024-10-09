// routes/jobRoutes.js
const express = require("express");
const Job = require("../models/jobModel"); // Import Job model

const router = express.Router();

// GET All Jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// POST a New Job
router.post("/", async (req, res) => {
  const {
    title,
    jobOffer,
    location,
    experience,
    salaryRange,
    skills,
    openings,
    startDate,
    lastDateToApply,
    probationPeriod,
  } = req.body;

  // Check if all required fields are provided
  if (!title || !jobOffer || !location) {
    return res.status(400).json({
      msg: "Please provide all required fields (title, jobOffer, location)",
    });
  }

  try {
    // Create a new job using the data provided
    const newJob = new Job({
      title,
      jobOffer,
      location,
      experience,
      salaryRange,
      skills,
      openings,
      startDate,
      lastDateToApply,
      probationPeriod,
    });

    // Save the new job to the database
    const savedJob = await newJob.save();

    // Return the saved job as a response
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("Error saving job:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
