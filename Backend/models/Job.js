const mongoose = require("mongoose");


const JobSchema = new mongoose.Schema({
jobId: String,
total: Number,
processed: Number,
failed: Number,
status: String
});


module.exports = mongoose.model("Job", JobSchema);