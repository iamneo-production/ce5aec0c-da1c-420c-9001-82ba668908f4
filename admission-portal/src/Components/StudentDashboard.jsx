import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../CSS/ListStyle.css';
import { Button, Container } from 'react-bootstrap';
import studentimg1 from '../Image/studentimg1.jpg';
import studentimg2 from '../Image/studentimg2.jpg';
import studentimg3 from '../Image/studentimg3jpg.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleApply = async () => {
    

    const getAdmissionDetails = async () => {
      const studentId = Number(localStorage.getItem('userId'));
      try {

        const response = await axios.get('https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/admissions');
    const allAdmissions = response.data;
    console.log(studentId);

    const foundAdmission = allAdmissions.find(admission => admission.student.id === studentId);
    console.log(foundAdmission);
        if(!foundAdmission)
        {
          navigate('/ApplicationForm');
          console.log("not workinh");
          window.scrollTo(0, 0);
        }
        else{
          const admissionId = foundAdmission.admId; // Assuming admission object has an 'id' property
          console.log(admissionId);

          const response3 = await axios.get(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabbffaabaebdcec.project.examly.io/admissions/${admissionId}`);
          console.log(response3.data);
          const currentstatus = response3.data.status;
          console.log(currentstatus);
          if(currentstatus==='Pending')
          {
            alert('Application already applied. Waiting for approval');
        navigate('/ApplicationStatus');
          }
          else if(currentstatus==='Accepted')
          {
            alert('Your application is already submitted. Check your status in View Status');
        navigate('/ApplicationStatus');
          }
          else if(currentstatus==='Rejected')
          {
            alert('Your application got rejected. See the FeedBack in the Status');
            navigate('/ApplicationStatus');
          }
        }

      } catch (error) {
        console.error(error);
      }
    };

    getAdmissionDetails();
  };

  return (
    <Container style={{ marginBottom: '30px' }}>
      <h3 className="paraheading text-center">Welcome Buddy!</h3>
      <p className="studentpara">
        We're delighted to have you here. Our admission process is designed to be seamless and efficient, ensuring a
        hassle-free experience for you. If you haven't applied for admission yet, we encourage you to take the next step
        and submit your application.
      </p>
      <Carousel className="carousel">
        <Carousel.Item>
          <img className="d-block w-100" src={studentimg2} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={studentimg3} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={studentimg1} alt="Third slide" />
        </Carousel.Item>
      </Carousel>

      <p className="studentpara">
        Once admitted, this dashboard will be your hub for staying updated on your admission status and managing your
        course enrollment. We're excited to help you embark on this educational adventure. Apply now and let's start
        shaping your future together!
      </p>
      <Button variant="primary" className="applybutton text-center" onClick={handleApply}>
        Apply for an Admission
      </Button>
    </Container>
  );
};

export default StudentDashboard;
