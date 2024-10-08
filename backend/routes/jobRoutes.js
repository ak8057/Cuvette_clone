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
  const { title, type, location } = req.body;
  const newJob = new Job({ title, type, location });
  try {
    await newJob.save();
    res.json(newJob);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
