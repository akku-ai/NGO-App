const fs = require("fs");
const csv = require("csv-parser");
const Job = require("../models/Job");
const Report = require("../models/Report");


async function processCSV(path, jobId) {
const job = await Job.findOne({ jobId });
job.status = "IN_PROGRESS";
await job.save();


const rows = [];
fs.createReadStream(path)
.pipe(csv())
.on("data", (row) => rows.push(row))
.on("end", async () => {
job.total = rows.length;
await job.save();


for (const row of rows) {
try {
await Report.updateOne(
{ ngoId: row.ngoId, month: row.month },
row,
{ upsert: true }
);
job.processed++;
} catch {
job.failed++;
}
await job.save();
}


job.status = "DONE";
await job.save();
});
}


module.exports = { processCSV };