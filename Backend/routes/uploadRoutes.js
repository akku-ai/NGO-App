const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const Job = require("../models/Job");
const { processCSV } = require("../workers/csvWorker");


const upload = multer({ dest: "uploads/" });
const router = express.Router();


router.post("/upload", upload.single("file"), async (req, res) => {
const jobId = uuid();
const job = await Job.create({ jobId, total: 0, processed: 0, failed: 0, status: "PENDING" });


processCSV(req.file.path, jobId);


res.json({ jobId });
});


module.exports = router;