import { useState } from 'react';
import { Button, Form, Container, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../CSS/Session.css';
import { Link } from 'react-router-dom';

function RegisterForm({ onRegistrationSuccess, onSignInClick }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    phoneError: '',
    emailError: '',
    passwordError: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'phoneNumber') {
      const phoneRegex = /^\d{10}$/;
       if (!phoneRegex.test(value)) {
        setValidationErrors({
          ...validationErrors,
          phoneError: 'Phone number should be a 10-digit number.',
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          phoneError: '',
        });
      }
    }
  
    // Validate email format
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setValidationErrors({
          ...validationErrors,
          emailError: 'Invalid email address.',
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          emailError: '',
        });
      }
    }
  
    // Validate password strength
    if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(value)) {
        setValidationErrors({
          ...validationErrors,
          passwordError:
            'Password should be at least 8 characters, one lowercase letter, one uppercase letter & one digit.',
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          passwordError: '',
        });
      }
    }
  
    setFormData({ ...formData, [name]: value });
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://8080-bcdddaaecbdcafebbdadbedabeaeaadbdbabf.project.examly.io/ap/students', formData);
      // Handle successful response
      console.log(response.data);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onRegistrationSuccess(); // Trigger the registration success callback
      }, 1500); // Wait for 1.5 seconds and change to login
    } catch (error) {
      // Handle error
      console.error('AxiosError:', error);

      if (error.response) {
        console.error('Response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const handleSignInClick = () => {
    onSignInClick(); // Trigger the sign in click callback
  };

  return (
    <Container className='session-bg'>
      {showAlert && (
        <Alert variant="success">
          User Registration successful.
        </Alert>
      )}
       <Form onSubmit={handleSubmit}>
        <h3 className='logheading'>Create a New Account !</h3>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                isInvalid={!!validationErrors.passwordError}
                autoComplete="current-password"
              />
              <Form.Control.Feedback type="invalid">{validationErrors.passwordError}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                isInvalid={!!validationErrors.phoneError}
              />
              <Form.Control.Feedback type="invalid">{validationErrors.phoneError}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            required
            isInvalid={!!validationErrors.emailError}
          />
          <Form.Control.Feedback type="invalid">{validationErrors.emailError}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submitbutton">
          SIGN UP
        </Button>

        <h6 className="logsignup_head">
          Already have an account?{' '}
          <Link className="navsignup_text" onClick={handleSignInClick}>
            Sign In!
          </Link>
        </h6>
      </Form>
    </Container>
  );
}

export default RegisterForm;
