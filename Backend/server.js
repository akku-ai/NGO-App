const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const reportRoutes = require("./routes/reportRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const jobRoutes = require("./routes/jobRoutes");


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/ngo-reporting");


app.use("/report", reportRoutes);
app.use("/reports", uploadRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/job-status", jobRoutes);


app.listen(5000, () => console.log("Backend running on http://localhost:5000"));