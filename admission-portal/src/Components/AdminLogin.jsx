import React, { useState, useContext } from 'react';
import { Button, Form, Modal, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Session.css';
import { UserContext } from '../services/UserProvider';
import { FaBackward } from 'react-icons/fa';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    emailId: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    emailError: ''
  });
  const [errorMessage, setErrorMessage] = useState(''); // Changed 'error' state to 'errorMessage'

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'emailId') { // Corrected the name to 'emailId'
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = {
        emailId: formData.emailId,
        password: formData.password
      };

      const response = await axios.post('https://8080-ccffaadabacdefcffebbdadbedabeaeaadbdbabf.project.examly.io/user/login', user); // Send the user object
      // Handle successful login
      console.log(response.data);
      setUser('admin');
      console.log(localStorage.getItem("userRole"));
      navigate('/AdminDashboard'); // Redirect to the desired route after successful login
    } catch (error) {
      // Handle login error
      console.error(error);
      setErrorMessage('Invalid email or password'); // Set the error message for authentication failure
    }
  };

  const handleGoBack = () => {
    navigate('/LoginRole');
  };

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog show={true} backdrop="static" keyboard={false} centered className="modeldio">
        <Modal.Header bg="dark" className="modelheader">
          <Modal.Title className="d-flex justify-content-center w-100">Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="model-center">
          <Container className="session-bg">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="emailId"
                  placeholder="Enter email"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  required // Added required attribute
                  isInvalid={!!validationErrors.emailError}
                />
                <Form.Control.Feedback type="invalid">{validationErrors.emailError}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required // Added required attribute
                />
              </Form.Group>

              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Updated to show 'errorMessage' */}

              <Button variant="primary" type="submit" className="submitbutton">
                LOGIN
              </Button>
              <p onClick={handleGoBack} className="goback_text"><FaBackward />Go Back</p>
            </Form>
          </Container>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default AdminLogin;
