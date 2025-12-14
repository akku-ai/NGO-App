const express = require("express");
const Report = require("../models/Report");
const router = express.Router();


router.post("/", async (req, res) => {
try {
await Report.updateOne(
{ ngoId: req.body.ngoId, month: req.body.month },
req.body,
{ upsert: true }
);
res.json({ message: "Report submitted" });
} catch (err) {
res.status(400).json({ error: err.message });
}
});


module.exports = router;