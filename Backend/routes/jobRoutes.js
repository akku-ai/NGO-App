const express = require("express");
const Job = require("../models/Job");
const router = express.Router();


router.get("/:jobId", async (req, res) => {
const job = await Job.findOne({ jobId: req.params.jobId });
res.json(job);
});


module.exports = router;