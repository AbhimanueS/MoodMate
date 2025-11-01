import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MoodGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodData")) || [];
    // Convert numeric mood to scale (1–5)
    const formatted = stored.map((entry) => ({
      date: entry.date,
      mood: entry.mood + 1, 
    }));
    setData(formatted);
  }, []);

  return (
    <div style={{ background: "#fff", padding: "15px", borderRadius: "10px", marginTop: "20px" }}>
      <h5 style={{ color: "#000", marginBottom: "10px" }}>Mood Trend</h5>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} />
          <Tooltip />
          <Line type="monotone" dataKey="mood" stroke="#000" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodGraph;
