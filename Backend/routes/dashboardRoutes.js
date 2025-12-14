const express = require("express");
const Report = require("../models/Report");
const router = express.Router();


router.get("/", async (req, res) => {
const month = req.query.month;
const reports = await Report.find({ month });


const summary = {
ngos: new Set(reports.map(r => r.ngoId)).size,
people: reports.reduce((a, b) => a + b.peopleHelped, 0),
events: reports.reduce((a, b) => a + b.eventsConducted, 0),
funds: reports.reduce((a, b) => a + b.fundsUtilized, 0)
};


res.json(summary);
});


module.exports = router;