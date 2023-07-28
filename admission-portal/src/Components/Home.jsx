import React from 'react';
import { NavLink } from 'react-router-dom';
import home from '../Image/home.png';
import '../CSS/HomeAbout.css';

const Home = () => {
  console.log(localStorage.getItem("userRole"));
  return (
    <div className="mainsection">
      <div className="contentContainer">
        <div className="contentbox">
          <h2 className="text-center">Start Your Journey :) </h2>
          <p className="contentbox">
            <h3 className="welcometxt text-center">' Welcome to Admission Portal '</h3>
            Start your journey with us! Explore Opportunities - Discover the wide
            range of programs and courses available to help you achieve your
            academic goals. Enhance your skills and knowledge with our diverse curriculum.
            Seamless Application Process - Our user-friendly admission portal makes
            the application process hassle-free and convenient.
          </p>
          <div className="btnbox">
            <NavLink to="/about" className="readMore">
              Readmore
            </NavLink>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src={home} alt="home" width="500px" height="500px" />
      </div>
    </div>
  );
};

export default Home;
