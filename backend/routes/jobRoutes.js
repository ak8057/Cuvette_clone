// routes/jobRoutes.js
const express = require("express");
const Job = require("../models/jobModel"); 
const OtherJob =require("../models/OtherJob");
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
    officeType,
  } = req.body;


  if (!title || !jobOffer || !location) {
    return res.status(400).json({
      msg: "Please provide all required fields (title, jobOffer, location)",
    });
  }

  try {
    
    const newJob = new Job({
      title,
      jobOffer,
      location,
      experience: experience || null, 
      salaryRange: salaryRange || null, 
      skills: skills || [], 
      openings: openings || 0, 
      startDate: startDate || null, 
      lastDateToApply: lastDateToApply || null, 
      probationPeriod: probationPeriod || null,
      officeType: officeType || null, 
    });

  
    const savedJob = await newJob.save();

  
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("Error saving job:", err);
    res.status(500).send("Server Error");
  }
});


router.get("/other-jobs", async (req, res) => {
  try {
    const ojobs = await OtherJob.find();
    res.json(ojobs);
  } catch (err) {
    console.error("Error fetching other jobs:", err);
    res.status(500).json({ message: err.message });
  }
});


router.post("/other-jobs", async (req, res) => {
  const {
    title,
    jobOffer,
    location,
    experience,
    salaryRange,
    skills,
    officeType,
  } = req.body;

 
  if (!title || !jobOffer || !location) {
    return res.status(400).json({
      msg: "Please provide all required fields (title, jobOffer, location)",
    });
  }

  try {
   
    const newJob = new OtherJob({
      title,
      jobOffer,
      location,
      experience: experience || null, 
      salaryRange: salaryRange || null, 
      skills: skills || [], 
      officeType: officeType || null,
    });

    
    const savedJob = await newJob.save();

   
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("Error saving other job:", err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
