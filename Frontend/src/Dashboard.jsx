import { useState } from "react";

export default function Dashboard() {
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch(
      `http://localhost:5000/dashboard?month=${month}`
    );
    const json = await res.json();
    setData(json);
  };

  return (
    <>
      <h2>Admin Dashboard</h2>
      <input
        placeholder="YYYY-MM"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button onClick={fetchData}>Load</button>

      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  );
}
