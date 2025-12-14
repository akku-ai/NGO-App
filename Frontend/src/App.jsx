import { useEffect, useState } from "react";
import { api } from "./api";


export default function App() {
const [form, setForm] = useState({ ngoId: "", month: "", peopleHelped: 0, eventsConducted: 0, fundsUtilized: 0 });
const [jobId, setJobId] = useState(null);
const [jobStatus, setJobStatus] = useState(null);
const [month, setMonth] = useState("");
const [dashboard, setDashboard] = useState(null);


const submitReport = async () => {
await api.post("/report", form);
alert("Report submitted");
};


const uploadCSV = async (e) => {
const fd = new FormData();
fd.append("file", e.target.files[0]);
const res = await api.post("/reports/upload", fd);
setJobId(res.data.jobId);
};


useEffect(() => {
if (!jobId) return;
const timer = setInterval(async () => {
const res = await api.get(`/job-status/${jobId}`);
setJobStatus(res.data);
if (res.data.status === "DONE") clearInterval(timer);
}, 2000);
return () => clearInterval(timer);
}, [jobId]);


const loadDashboard = async () => {
const res = await api.get(`/dashboard?month=${month}`);
setDashboard(res.data);
};


return (
<div style={{ padding: 20 }}>
<h2>NGO Monthly Reporting</h2>


<h3>Submit Report</h3>
{Object.keys(form).map((k) => (
<input key={k} placeholder={k} onChange={e => setForm({ ...form, [k]: e.target.value })} />
))}
<button onClick={submitReport}>Submit</button>


<h3>Bulk CSV Upload</h3>
<input type="file" accept=".csv" onChange={uploadCSV} />
{jobStatus && (
<div>
<p>Status: {jobStatus.status}</p>
<p>Processed: {jobStatus.processed}/{jobStatus.total}</p>
<p>Failed: {jobStatus.failed}</p>
</div>
)}


<h3>Admin Dashboard</h3>
<input placeholder="YYYY-MM" onChange={e => setMonth(e.target.value)} />
<button onClick={loadDashboard}>Load</button>


{dashboard && (
<ul>
<li>Total NGOs: {dashboard.ngos}</li>
<li>People Helped: {dashboard.people}</li>
<li>Events: {dashboard.events}</li>
<li>Funds: {dashboard.funds}</li>
</ul>
)}
</div>
);
}