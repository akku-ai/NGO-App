import { useState } from "react";

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState("");

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/reports/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setJobId(data.jobId);
  };

  return (
    <>
      <h2>Bulk CSV Upload</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>

      {jobId && <p>Job ID: {jobId}</p>}
    </>
  );
}
