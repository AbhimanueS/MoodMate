import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./Login";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const name = e.target.user.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmpassword.value;

  
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);
  const hasNumber = /\d/.test(password);

  if (password.length < minLength) {
    alert("Password must contain at least 8 characters");
    return;
  } else if (!hasUpperCase) {
    alert("Password must contain an uppercase letter");
    return;
  } else if (!hasLowerCase) {
    alert("Password must contain a lowercase letter");
    return;
  } else if (!hasNumber) {
    alert("Password must include at least one number");
    return;
  } else if (!hasSpecialChar) {
    alert("Password must include at least one special character (e.g., @, #, $)");
    return;
  }

  try {
    // send data to backend
    const response = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! Now login with your credentials.");
      navigate("/");
    } else {
      alert(data.error || "Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Server error. Please try again later.");
  }
};


  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      
      gap: "1rem",
      width: "80%",
      maxWidth: "300px",
      margin: "auto",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    checkboxLabel: {
      fontSize: "0.9rem",
      color: "#fff",
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <div style={{ backgroundColor: "#7a7f8bff", minHeight: "100vh" }}>
      <Card
        style={{
          width: "55rem",
          height: "38rem",
          margin: "5rem auto",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "15px",
          backgroundColor: "#383838",
          color: "white",
          overflow: "hidden",
        }}
      >
        <Row className="g-0 h-100">
          {/* Left side - Form */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center text-center"
            style={{ backgroundColor: "#383838" }}
          >
            <form onSubmit={handleSubmit} style={styles.form}>
              <h2>MOODMATE</h2>
              <h6>Enter your details to register</h6>

              <input
                type="text"
                placeholder="UserName"
                name="user"
                id="user"
                required
                style={styles.input}
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                required
                style={styles.input}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                required
                style={styles.input}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmpassword"
                id="confirmpassword"
                required
                style={styles.input}
              />

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  onClick={togglePasswordVisibility}
                  style={{ marginRight: "5px" }}
                />
                Show Password
              </label>

              <Button variant="outline-light" type="submit">
                Register
              </Button>
            </form>
          </Col>

          {/* Right side */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#f7a0be", color: "#000" }}
          >
            <div>
              <h2 style={{ marginLeft: "20px", marginBottom: "30px" }}>
                Understand Your Emotions Transform Your Day
              </h2>
              <p
                style={{
                  marginLeft: "15px",
                  marginRight: "15px",
                  textAlign: "justify",
                }}
              >
                Welcome to MoodMate, the personal journal designed for clarity.
                Effortlessly log your feelings, reflect on the events that shape
                your day, and visualize your emotional trends. Start building a
                stronger foundation of self-awareness and nurture a healthier
                mind.
              </p>
              <Button style={{ marginLeft: "20px" }} variant="dark">
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Register;
