import React,{useContext  } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../Image/logo.png';
import '../CSS/ListStyle.css';
import {UserContext } from '../services/UserProvider';
import axios from 'axios';



function DefaultHeader() {

  const navigate = useNavigate();
  const handleOnLogoClick = () => {
    navigate('/Home');
    window.scrollTo(0, 0);
  };

  return(
    <header>
          <Navbar expand="md" variant="dark" className="navbar-container">
            <div className="logocontainer" style={{ marginLeft: '30px' }}>
              <img src={logo} alt="logo" width="100" height="100" className="logo" onClick={handleOnLogoClick} />
              <span className="logoText">ADMISSION PORTAL</span>
            </div>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-center">
              <Nav className="mr-auto">
                <NavLink  to="/Home" className="listItem nav-link" activeClassName="activeItem">
                  Home
                </NavLink>
                <NavLink to="/about" className="listItem nav-link" activeClassName="activeItem">
                  About
                </NavLink>
                <NavLink to="/ListtoGrid" className="listItem nav-link" activeClassName="activeItem">
                  Courses
                </NavLink>
                <NavLink to="/contactus" className="listItem nav-link" activeClassName="activeItem">
                  ContactUs
                </NavLink>
              </Nav>
            </Navbar.Collapse>
            
    
            <Nav className="ml-auto" style={{ marginRight: '30px' }}>
              <NavLink to="/LoginRole" className="listItem nav-link" activeClassName="activeItem">
                Login/Register
              </NavLink>
            </Nav>
          </Navbar>
        </header>
      );
  }


  function StudentNavbar(){
    const navigate = useNavigate();
    const handleOnLogoClick = () => {
      navigate('/StudentDashboard');
      window.scrollTo(0, 0);
    };
    const { clearUser } = useContext(UserContext);
    const handleLogout = () =>
    {
      localStorage.removeItem('userRole');
        clearUser();
    }
    const handleLogoutClick = (e) => {
      e.preventDefault(); // Prevent the default NavLink behavior
      if (window.confirm('Are you sure you want to logout?')) {
        handleLogout();
        navigate('/Home');
        window.scrollTo(0, 0);
      }
    };
    
    const handleApply = async () => {
    

      const getAdmissionDetails = async () => {
        const studentId = Number(localStorage.getItem('userId'));
        try {
          const response = await axios.get('https://8080-eabffbfafccbfebbdadbedabbffaabaebdcec.project.examly.io/admissions');
      const allAdmissions = response.data;
  
      const foundAdmission = allAdmissions.find(admission => admission.student.id === studentId);
          if(!foundAdmission)
          {
            navigate('/ApplicationForm');
            console.log("not workinh");
            window.scrollTo(0, 0);
          }
          else{
            const admissionId = foundAdmission.admId;
            const response1 = await axios.get(`https://8080-eabffbfafccbfebbdadbedabbffaabaebdcec.project.examly.io/admissions/${admissionId}`);
            const currentstatus = response1.data.status;
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
      <header>
        <Navbar expand="md" variant="dark" className="navbar-container">
          <div className="logocontainer" style={{ marginLeft: '30px' }} onClick={handleOnLogoClick}>
            <img src={logo} alt="logo" width="100" height="100" className="logo"  />
            <span className="logoText">STUDENT DASHBOARD</span>
          </div>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="mr-auto">
              <NavLink to="/UserProfile" className="listItem nav-link" activeClassName="activeItem">
                My Profile
              </NavLink>
              <NavLink to="/ListtoGrid" className="listItem nav-link" activeClassName="activeItem">
                Courses
              </NavLink>
              <NavLink to="/ApplicationForm" className="listItem nav-link" activeClassName="activeItem" onClick={handleApply}>
                Admission
              </NavLink>
              <NavLink to="/ApplicationStatus" className="listItem nav-link" activeClassName="activeItem">
                View Status
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ml-auto" style={{ marginRight: '30px' }}>
            <NavLink onClick={handleLogoutClick} className="listItem nav-link" activeClassName="activeItem">
              Logout
            </NavLink>
          </Nav>
        </Navbar>
      </header>
    );
  };
  
  function AdminNavbar(){
    const navigate = useNavigate();
    const handleOnLogoClick = () => {
      navigate('/AdminDashboard');
      window.scrollTo(0, 0);
    };
    const { clearUser } = useContext(UserContext);
    const handleLogout = () =>
    {
      localStorage.removeItem('userRole');
        clearUser();

    }
    const handleLogoutClick = (e) => {
      e.preventDefault(); // Prevent the default NavLink behavior
      if (window.confirm('Are you sure you want to logout ?')) {
        handleLogout();
        navigate('/Home');
        window.scrollTo(0, 0);
      }
    };
    
    
    return (
      <header>
        <Navbar expand="md" variant="dark" className="navbar-container">
          <div className="logocontainer" style={{ marginLeft: '30px' }}  onClick={handleOnLogoClick}>
            <img src={logo} alt="logo" width="100" height="100" className="logo" />
            <span className="logoText">ADMIN DASHBOARD</span>
          </div>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="mr-auto">
            <NavLink to="/listcourses" className="listItem nav-link" activeClassName="activeItem">
                Manage Courses
              </NavLink>
              <NavLink to="/application" className="listItem nav-link" activeClassName="activeItem">
                Manage Applications
              </NavLink>
              <NavLink  to="/students" className="listItem nav-link" activeClassName="activeItem">
                Manage Students
              </NavLink>
              <NavLink to="/ListEnrollment" className="listItem nav-link" activeClassName="activeItem">
                Manage Enrollments
              </NavLink>
              <NavLink to="/report" className="listItem nav-link" activeClassName="activeItem">
                Generate Report
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ml-auto" style={{ marginRight: '30px' }}>
            <NavLink onClick={handleLogoutClick} className="listItem nav-link" activeClassName="activeItem">
              Logout
            </NavLink>
          </Nav>
        </Navbar>
      </header>
    );
  }
  
  function Header() {
    const { userRole } = useContext(UserContext);
  
    if (userRole === 'student'){
    return <StudentNavbar />;
    }
    else if(userRole === 'admin'){
    return <AdminNavbar />;
    }
    else {
      return <DefaultHeader />;
    }
    
  }
  
  export default Header;