import React, { useEffect, useState,useContext } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import CourseService from '../services/CourseService';
import { Card} from 'react-bootstrap';
import '../CSS/CourseStyle.css';
import axios from 'axios';
import { UserContext } from '../services/UserProvider';


const CourseDetails = () => {

  const { Id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext);
  useEffect(() => {
    fetchCourseDetails(); // Assuming this is the function you want to call
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleGoBack = () => {
    navigate('/ListtoGrid');
  }

  const handleEnrollNow = async () => {
        const studentId = Number(localStorage.getItem('userId'));
        if (userRole !== 'student') {
          alert('Login to enroll for a course');
          navigate('/Session');
          return;
        }
      try {
        const response = await axios.get('https://8080-eabffbfafccbfebbdadbedabeaeaadbdbabf.project.examly.io/admissions');
    const allAdmissions = response.data;
    console.log(studentId);
    const foundAdmission = allAdmissions.find(admission => admission.student.id === studentId);
    console.log(foundAdmission);
        if(!foundAdmission)
        {
          alert("You didn't apply for an application. Apply now!");
        navigate('/ApplicationForm');
        }
        else{
          const admissionId = foundAdmission.admId; // Assuming admission object has an 'id' property
          console.log(admissionId);
          const response3 = await axios.get(`https://8080-eabffbfafccbfebbdadbedabeaeaadbdbabf.project.examly.io/admissions/${admissionId}`);
          console.log(response3.data);
          const currentstatus = response3.data.status;
          console.log(currentstatus);
          if(currentstatus==='Pending')
          {
            alert('Your application process is not yet finished');
            navigate('/ApplicationStatus');
          }
          else if(currentstatus==='Accepted')
          {
            const response1 = await axios.get('https://8080-eabffbfafccbfebbdadbedabeaeaadbdbabf.project.examly.io/admin/enrollments');
    const allenrollments = response1.data;
    const foundenrollment = allenrollments.find(enrollment => enrollment.student.id === studentId);
    if(!foundenrollment){
      enrollCourse();
    }
            else{
              alert('You Already Enrolled for a Course');
              navigate('/ApplicationStatus');
            }
          }
          else if(currentstatus==='Rejected')
          {
            alert('Your application is Rejected. See the feedback in status');
            navigate('/ApplicationStatus');
          }
        }

      } catch (error) {
        console.error(error);
      }
  };

  const fetchCourseDetails = () => {
    CourseService.getCourseById(Id)
      .then((response) => {
        setCourse(response.data);
        console.log('Course details:', response.data);
      })
      .catch((error) => {
        console.log('Error fetching course details:', error);
      });
  };
  const enrollCourse = async () => {
    try {
      // Assuming you have access to the studentId and course name here
      const studentId = Number(localStorage.getItem('userId'));
      const courseName = course.name; // Assuming you have access to the course name

      // Create the enrollment object to send in the request
      const enrollmentData = {
        studentId: studentId.toString(),
        coursename: courseName,
      };

      // Make the API call to enroll the student in the course
      const response = await axios.post('https://8080-eabffbfafccbfebbdadbedabeaeaadbdbabf.project.examly.io/admin/enrollments', enrollmentData);

      // Handle the response, show success message or perform other actions
      console.log('Enrollment successful:', response.data);
      alert('Enrollment successful!');
      navigate('/ApplicationStatus');

    } catch (error) {
      console.error('Error enrolling course:', error);
      alert('Enrollment failed. Please try again.');
    }
  };


  return (
    <div className="main-container">
      <h2 className='header'>Course Details</h2>
      
      {course && (
        <Card className="card-item">
          <Card.Body>
            <Card.Text>Course Name: {course.name}</Card.Text>
            <Card.Text>Course Description: {course.description}</Card.Text>
            <Card.Text>Course prerequisites: {course.prerequisites}</Card.Text>
            <Card.Text>Course credits: {course.credits}</Card.Text>
            <button variant="primary" className='enroll_btn' onClick={handleEnrollNow}>ENROLL NOW</button>
          </Card.Body>
        </Card>
      )}
      <p onClick={handleGoBack} className='goback_text'>Go Back</p>
    </div>
    

  );
};

export default CourseDetails;
