import { useState, useContext } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Session.css';
import { UserContext } from '../services/UserProvider';
import { FaBackward } from 'react-icons/fa';

function Loginform({ onSignUpClick }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    emailError: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://8080-ccffaadabacdefcffebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/login', formData);
      const userId = response.data.id;

      // Store the token in localStorage
      localStorage.setItem('userId', userId);
      console.log(userId);
      console.log('printing');
      // Handle successful login
      console.log(response.data);
      setUser('student');
      console.log(localStorage.getItem('userRole'));
      navigate('/StudentDashboard'); // Redirect to the desired route after successful login
    } catch (error) {
      // Handle login error
      console.error(error);
      setErrorMessage('Invalid email or password'); // Set the error message for authentication failure
    }
  };

  const handleSignUpClick = () => {
    onSignUpClick(); // Invoke the callback function from Session component
  };

  const handleGoBack = () => {
    navigate('/LoginRole');
    window.scrollTo(0, 0);
  };

  return (
    <Container className="session-bg">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h3 className="logheading">Welcome Back!</h3>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            required // Added required attribute
            isInvalid={!!validationErrors.emailError}
          />
          <Form.Control.Feedback type="invalid">{validationErrors.emailError}</Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Button variant="primary" type="submit" className="submitbutton">
          LOGIN
        </Button>
        <h6 className="logsignup_head">
          Don't have an account?{' '}
          <Link className="navsignup_text" onClick={handleSignUpClick}>
            Sign Up!
          </Link>
        </h6>
        <p onClick={handleGoBack} className="goback_text">
          {' '}
          <FaBackward />
          Go Back
        </p>
      </Form>
    </Container>
  );
}

export default Loginform;
