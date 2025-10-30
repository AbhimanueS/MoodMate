import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
;


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '80%',
      maxWidth: '300px',
      margin: 'auto',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    checkboxLabel: {
      fontSize: '0.9rem',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
    },
    loginBtn: {
      padding: '10px',
      border: 'none',
      backgroundColor: '#0d6efd',
      color: 'white',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    registerBtn: {
      padding: '10px',
      border: '1px solid #0d6efd',
      backgroundColor: 'white',
      color: '#0d6efd',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <>
      <Card
        style={{
          width: '55rem',
          height: '38rem',
          margin: '5rem auto',
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          borderRadius: '15px',
          backgroundColor: '#383838',
          color: 'white',
          overflow: 'hidden',
        }}
      >
        <Row className="g-0 h-100">
          {/* Left side - Form */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center text-center"
            style={{ backgroundColor: '#383838' }}
          >
            
            <form method="post" action="/api/login" style={styles.form}>
            <h2>MOODMATE</h2>
            <h6>Please login to your account</h6>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                required
                style={styles.input}
              />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                id="password"
                required
                style={styles.input}
              />

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  onClick={togglePasswordVisibility}
                  style={{ marginRight: '5px' }}
                />
                Show Password
              </label>

              <Button variant="outline-light">
                Login
              </Button>

              <Button variant="outline-light">
                Register
              </Button>
              
            </form>
          </Col>

          {/* Right side */}
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
            style={{ backgroundColor: '#f7a0be', color: '#000' }}
          >
            <div>
                
              <h2 style={{marginLeft: '20px', marginBottom:'30px'}}>Understand Your Emotions Transform Your Day</h2>
            <p style={{marginLeft:'15px', marginRight:'15px', textAlign:'justify'}}>
               Welcome to MoodMate, the personal journal designed for clarity. Effortlessly log your feelings, reflect on the events that shape your day, and visualize your emotional trends. Start building a stronger foundation of self-awareness and nurture a healthier mind
            </p>
              <Button style={{marginLeft:'20px'}} variant="dark">Learn More</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Login;
