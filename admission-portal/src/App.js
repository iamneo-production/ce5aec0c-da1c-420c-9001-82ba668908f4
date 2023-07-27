import React, { useContext } from 'react';
import Session from './Components/Session';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginRole from './Components/LoginRole';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import StudentDashboard from './Components/StudentDashboard';
import Home from './Components/Home';
import About from './Components/About';
import { Container } from 'react-bootstrap';
import ContactUs from './Components/ContactUs';
import Error from './Components/Error';
import ListtoGrid from './Components/ListtoGrid';
import CourseDetails from './Components/CourseDetails';
import StudentNavbar from './Components/Header';
import AdminNavbar from './Components/Header';
import Header from './Components/Header';
import AddStudentComponent from './Components/AddStudentComponent';
import AddCourses from "./Components/AddCourses";
import ListCourses from "./Components/ListCourses";
import ManageApplications from "./Components/ManageApplications";
import ApplicationReport from "./Components/ApplicationReport";
import ListStudentComponent from './Components/ListStudentComponent';
import UpdateStudentComponent from './Components/UpdateStudentComponent';
import UserProfile from './Components/UserProfile';
import ApplicationForm from './Components/ApplicationForm';
import { UserContext } from './services/UserProvider';
import Document from './Components/Document';
import ApplicationStatus from './Components/ApplicationStatus';
import AddEnrollment from './Components/AddEnrollment';
import ListEnrollment from './Components/ListEnrollment';

function App() {
  const { userRole } = useContext(UserContext);

  return (
    <HashRouter>
      <Header />
      <Container style={{ marginBottom: '20px', minHeight: '550px' }}>
        {userRole !== 'admin' && (
          <Routes>
            {(userRole === '' || userRole === 'student') && (
              <>
              
                <Route path="/about" Component={About} />
                <Route path="/contactus" Component={ContactUs} />
                <Route path="/ListtoGrid" element={<ListtoGrid />} />
                <Route path="/course/:Id" element={<CourseDetails />} />
              </>
            )}


            {userRole === '' && (
              <>        
              <Route exact path="/" Component={Home} />        
                <Route path="/Session" element={<Session />} />
                <Route path="/LoginRole" element={<LoginRole />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />
              </>)}

            {userRole === 'student' && (
              <>
              <Route path="/" element={<StudentDashboard />} />
                <Route path="/StudentDashboard" element={<StudentDashboard />} />
                <Route path="/StudentNavbar" element={<StudentNavbar />} />
                <Route path="/UserProfile" Component={UserProfile} />
                <Route path="/ApplicationForm" Component={ApplicationForm} />
                <Route path="/ApplicationStatus" Component={ApplicationStatus} />
              </>)}

            <Route path="*" Component={Error} />
            <Route exact path="/Home" Component={Home} /></Routes>

        )}
        {userRole === 'admin' && (

          <Routes>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/AdminNavbar" element={<AdminNavbar />} />
            <Route path="/listcourses" Component={ListCourses} />
            <Route path="/add-course" Component={AddCourses} />
            <Route path="/add-course/:id" Component={AddCourses} />
            <Route path="/application" Component={ManageApplications} />
            <Route path="/report" Component={ApplicationReport} />
            <Route path="/students" Component={ListStudentComponent} />
            <Route path="/update-student/:id" element={<UpdateStudentComponent />} />
            <Route path="/addstudent" element={<AddStudentComponent />} />
            <Route path="/view-docs/:admId" element={<Document/>} />
            <Route path="/add-enrollment" Component={AddEnrollment} />
            <Route path="/add-enrollment/:id" Component={AddEnrollment} />
            <Route path="/ListEnrollment" Component={ListEnrollment} />
            <Route path="/ListEnrollment/:id" Component={ListEnrollment} />
          </Routes>
        )}
      </Container>
      {/* <Footer/> */}
    </HashRouter>
  );
}

export default App;
