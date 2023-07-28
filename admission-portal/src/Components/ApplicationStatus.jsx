import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import '../CSS/Studentstatus.css';

const ApplicationStatus = ({ admissionId }) => {
  const [student, setStudent] = useState(null);
  const [cStatus, setcStatus] = useState('No application is applied');
  const [cFeedBack, setFeedBack] = useState('No application is applied');
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  useEffect(() => {
    // Fetch the admission data by ID
    const fetchAdmission = async () => {
      const studentId = Number(localStorage.getItem('userId'));
      const response = await axios.get('https://8080-aadabecdedafebbdadbedabeaeaadbdbabf.project.examly.io//admissions');
      const allAdmissions = response.data;
      const foundAdmission = allAdmissions.find(admission => admission.student.id === studentId);
      
      if (foundAdmission) {
        const admissionIds = foundAdmission.admId;
        console.log("status is", foundAdmission.status);

        try {
          const response3 = await axios.get(`https://8080-aadabecdedafebbdadbedabeaeaadbdbabf.project.examly.io//admissions/${admissionIds}`);
          setStudent(response3.data.student);
          setcStatus(foundAdmission.status);
          setFeedBack(foundAdmission.feedback);

          // Fetch enrolled course data
          const response1 = await axios.get('https://8080-aadabecdedafebbdadbedabeaeaadbdbabf.project.examly.io//admin/enrollments');
          const allenrollments = response1.data;
          console.log("allenrollmets :",allenrollments);
          const foundenrollment = allenrollments.find(enrollment => enrollment.student.id === studentId);
          console.log("enrollmets :",foundenrollment);
          
          if (foundenrollment) {
            const enrollmentId = foundenrollment.enrollId;
            console.log("Enrolled Course ID:", enrollmentId);

            // Fetch enrolled course details by enrollment ID
            const response2 = await axios.get(`https://8080-aadabecdedafebbdadbedabeaeaadbdbabf.project.examly.io//admin/enrollments/${enrollmentId}`);
            const enrolledCourseData = response2.data;
            console.log("enrolledCourseData :", enrolledCourseData);
            setEnrolledCourse(enrolledCourseData);
          }
        } catch (error) {
          console.error('Error fetching admission:', error);
        }
      }
    };

    fetchAdmission();
  }, [admissionId]);

  if (!student || cStatus === 'No application is applied') {
    return <div className='text-center'><h2>"{cStatus}"</h2></div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card style={{ width: '25rem', height: '15rem',marginRight:'10px' }} className="text-center">
        <Card.Header className='card-header'><h3>Application Status</h3></Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Name:</strong> {student.firstName} {student.lastName}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {student.email}
          </Card.Text>
          <Card.Text>
            <strong>FeedBack:</strong> {cFeedBack}
          </Card.Text>
        </Card.Body>
        <Card.Footer className='card-footer'>
          <strong>Status:</strong> {cStatus}
        </Card.Footer>
      </Card>

      {enrolledCourse && (
        <Card style={{ width: '25rem', height: '15rem',marginLeft:'10px' }} className="text-center">
          <Card.Header><h3>Course Schedule</h3></Card.Header>
          <Card.Body className='course-card-body'>
            <Card.Text>
              <strong>Name:</strong> {student.firstName} {student.lastName}
            </Card.Text>
            <Card.Text>
              <strong>Enrolled Course:</strong> {enrolledCourse.course.name}
            </Card.Text>
            <Card.Text>
              <strong>Grade :</strong> {enrolledCourse.grade}
            </Card.Text>
            {/* Add other enrolled course details here if available */}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ApplicationStatus;
