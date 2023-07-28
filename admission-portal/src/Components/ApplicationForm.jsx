import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Button,Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    phoneNumber: '',
    gender: '',
    address: '',
  });

  const [admissionData, setAdmissionData] = useState({
    status: 'Pending',
    documents: [], // Array to store uploaded documents
  });

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      getSingleUserData(storedId);
    }
  }, []);

  const getSingleUserData = (storedId) => {
    axios
      .get(`https://8080-deeefebadfbfcffebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${storedId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    // Check if any files are selected
    if (files.length === 0) {
      return; // Do not update state if no files are selected
    }
    setAdmissionData((prevData) => ({
      ...prevData,
      documents: [...prevData.documents, ...files],
    }));
  };
  const userId = localStorage.getItem('userId');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('status', admissionData.status);
    formData.append('studentId', userId);
    console.log(userId);
    console.log(userId);
    
    // Append each image file to the formData using a for-of loop
    for (const document of admissionData.documents) {
      formData.append('documents', document);
    }
    try {
      await axios.post('https://8080-deeefebadfbfcffebbdadbedabeaeaadbdbabf.project.examly.io/admissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Application submitted successfully');
      handleReset();
      navigate('/StudentDashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/StudentDashboard');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setAdmissionData({
      status: 'Accepted',
      documents: [],
    });
  };

  return (
    <Container style={{ marginTop: '20px', minHeight: '550px', width: '1000px', marginBottom: '80px' }}>
      <div className="justify-content-center align-items-center">
        <h2 style={{ textAlign: 'center' }}>Application Form</h2>
        <h3>Personal Details</h3><p>(To edit your Details, Go to your Profile*)</p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  disabled
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  disabled
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <h3 style={{ marginTop: '20px' }}>Required Documents</h3>
          <p>(upload only JPEG, PNG formats)</p>

          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Passport Size Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="documents"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  multiple // Allow multiple file selection
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>ID Proof (Aadhar card)</Form.Label>
                <Form.Control
                  type="file"
                  name="documents"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  multiple // Allow multiple file selection
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>10th Marksheet</Form.Label>
                <Form.Control
                  type="file"
                  name="documents"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  multiple // Allow multiple file selection
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>12th Marksheet</Form.Label>
                <Form.Control
                  type="file"
                  name="documents"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  multiple // Allow multiple file selection
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="d-flex justify-content-center p-4">
              <Button type="submit" variant="primary">
                Apply
              </Button>
              <Button variant="secondary" onClick={handleCancel} className="ml-2">
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default ApplicationForm;
