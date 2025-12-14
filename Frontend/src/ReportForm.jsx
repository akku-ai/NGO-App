import { useState } from "react";

export default function ReportForm() {
  const [form, setForm] = useState({
    ngoId: "",
    month: "",
    peopleHelped: "",
    eventsConducted: "",
    fundsUtilized: ""
  });

  const submit = async () => {
    await fetch("http://localhost:5000/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Report submitted");
  };

  return (
    <>
      <h2>Submit Monthly Report</h2>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          value={form[key]}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
          style={{ display: "block", margin: "5px 0" }}
        />
      ))}
      <button onClick={submit}>Submit</button>
    </>
  );
}
