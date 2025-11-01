import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import MoodGraph from "./MoodGraph";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const [journal, setJournal] = useState("");
  const [mood, setMood] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ Save journal
  const saveJournal = () => {
    localStorage.setItem("journal", journal);
    alert("Journal saved!");
  };

  // ✅ Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Load today's mood if already selected
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedMoodData = JSON.parse(localStorage.getItem("moodData")) || {};

    if (savedMoodData[today] !== undefined) {
      setMood(savedMoodData[today]);
    }
  }, []);

  // ✅ Save only one mood per day
  const handleMoodSelect = (index) => {
    const today = new Date().toISOString().split("T")[0];
    const savedMoodData = JSON.parse(localStorage.getItem("moodData")) || {};

    if (savedMoodData[today] !== undefined) {
      alert("You already selected your mood for today!");
      return;
    }

    savedMoodData[today] = index;
    localStorage.setItem("moodData", JSON.stringify(savedMoodData));

    setMood(index);
    alert("Mood saved for today!");
  };

  const emojis = ["😟", "🙁", "😐", "🙂", "😄"];

  return (
    <div style={{
      backgroundColor: "#7a7f8bff",
      minHeight: "100vh",
      display: "flex"
    }}>

      {/* Left Panel */}
      <div style={{
        flex: 4,
        background: "#6e737d",
        padding: "20px",
        color: "white"
      }}>
        
        <h3>Keep a diary</h3>

        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="How was your day?"
          style={{
            width: "90%",
            height: "120px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
            marginTop: "10px",
          }}
        ></textarea>

        <button
          onClick={saveJournal}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Journal
        </button>

        
      </div>

      {/* Right Panel */}
      <div style={{
        flex: 1.7,
        background: "#47494cff",
        padding: "20px",
        color: "white"
      }}>

        <Button variant="outline-danger" onClick={handleLogout} style={{ width: "30%" }}>
          Logout
        </Button>

        {/* Profile Card */}
        <div style={{
          background: "#fff",
          color: "#000",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "30px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#6e737d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            color: "white",
            marginBottom: "10px"
          }}>
            {user ? user.name.charAt(0).toUpperCase() : "?"}
          </div>

          <h4 style={{ margin: 0 }}>{user?.name || "User"}</h4>
          <small style={{ opacity: 0.8 }}>{user?.email}</small>
        </div>

        <h2>How are you feeling today?</h2>

        <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
          {emojis.map((emoji, index) => (
            <span
              key={index}
              onClick={() => handleMoodSelect(index)}
              style={{
                fontSize: "32px",
                cursor: mood !== null ? "not-allowed" : "pointer",
                padding: "10px",
                borderRadius: "10px",
                background: mood === index ? "#d0ebff" : "transparent",
                opacity: mood !== null && mood !== index ? 0.4 : 1,
                transition: "0.2s"
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        <p style={{ marginTop: "10px", fontSize: "18px" }}>
          {mood !== null ? `Selected mood: ${emojis[mood]}` : "No mood selected"}
        </p>
        <MoodGraph />
      </div>
    </div>
  );
};

export default Dashboard;
