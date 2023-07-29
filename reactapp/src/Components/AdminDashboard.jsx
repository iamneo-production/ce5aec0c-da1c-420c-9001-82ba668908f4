import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import DashboardService from '../services/DashboardService';
import '../CSS/Studentstatus.css';

const AdminDashboard = () => {
  const [count, setCount] = useState([]);

  useEffect(() => {
    DashboardService.getTotalCount()
      .then((resp) => {
        setCount(resp.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <Row className='admcontainer d-flex align-content-around flex-wrap'>
      <Col sm={6} md={4} lg={3}>
        <Card className='my-5' style={{ width: '17rem', height: '13rem',marginRight:'10px' }}>
          <Card.Body className='dashboard-cards'>
            <Card.Title>Number of Students</Card.Title>
            <Card.Text className='dashboard-cards-text'>{count.studentcount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
        <Card className='my-5' style={{ width: '17rem', height: '13rem',marginRight:'10px' }}>
          <Card.Body className='dashboard-cards'>
            <Card.Title>Number of Courses</Card.Title>
            <Card.Text className='dashboard-cards-text'>{count.coursecount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
        <Card className='my-5' style={{ width: '17rem', height: '13rem',marginRight:'10px' }}>
          <Card.Body className='dashboard-cards'>
            <Card.Title>Number of Enrollments</Card.Title>
            <Card.Text className='dashboard-cards-text'>{count.enrollmentcount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
        <Card className='my-5' style={{ width: '17rem', height: '13rem',marginRight:'10px' }}>
          <Card.Body className='dashboard-cards'>
            <Card.Title>Number of Admissions</Card.Title>
            <Card.Text className='dashboard-cards-text'>{count.admissioncount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
        <Card className='my-5' style={{ width: '17rem', height: '13rem',marginRight:'10px' }}>
          <Card.Body className='dashboard-cards'>
            <Card.Title>Pending Admissions</Card.Title>
            <Card.Text className='dashboard-cards-text'>{count.pendingcount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
        <Card className='my-5'style={{ width: '17rem', height: '13rem',marginRight:'10px' }}>
          <Card.Body className='dashboard-cards'>
            <Card.Title>Accepted Admissions</Card.Title>
            <Card.Text className='dashboard-cards-text'>{count.acceptedcount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
        <Card className='my-5' style={{ width: '17rem', height: '13rem',marginRight:'10px' }}>
          <Card.Body className='dashboard-cards'>
            <Card.Title>Rejected Admissions</Card.Title>
            <Card.Text className='dashboard-cards-text'>{count.rejectedcount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={4} lg={3}>
        <Card className='my-5' style={{ width: '17rem', height: '13rem',marginRight:'10px' }}>
          <Card.Body className='dashboard-cards'>
            <Card.Title>Number of Users</Card.Title>
            <Card.Text className='dashboard-cards-text'>{count.usercount}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
