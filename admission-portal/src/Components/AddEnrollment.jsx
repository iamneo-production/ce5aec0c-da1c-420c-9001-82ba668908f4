import React, { useEffect, useState } from "react";
import CourseService from "../services/MCourseService";
import { Link, useNavigate } from "react-router-dom";
import EnrollmentService from '../services/EnrollmentService';

function AddEnrollment() {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

//  let courses = []
  const [enroldetails, setEnroldetails] = useState({
    studentId: "",
    name: "",
  });

  const history= useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
 // Allow only digits (0-9) in the Student-Id field
 if (name === "studentId") {
  // Check if the value contains non-digits
  if (!/^\d*$/.test(value)) {
    setErrorMessage("Student Id must be a Digit");
  } else {
    setErrorMessage(""); // Clear the error message if the value is valid
  }

  // Replace non-digits with an empty string
  value = value.replace(/\D/g, "");
}

    setEnroldetails({ ...enroldetails, [name]: value });
  };

  useEffect(() => {
    CourseService.getAllCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [courses]);


  const saveEnrollment =(e) =>{
    e.preventDefault();
     // Check if the Student-Id contains only digits
  if (!/^\d+$/.test(enroldetails.studentId)) {
    setErrorMessage("Enter Valid Student Id");
    return;
  }
   // Clear the error message if the Student-Id is valid
   setErrorMessage("");
    EnrollmentService.createEnrollment(enroldetails).then((response) =>{

      console.log(response.data);

      history('/ListEnrollment');

  }).catch(error =>{
      console.log(error);
  })
  }

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Enrollment</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-lable">Student-Id :</label>
                  <input
                    type="text"
                    placeholder="Enter StudentId"
                    name="studentId"
                    className="form-control"
                    value={enroldetails.studentId}
                    onChange={handleChange}
                 
                    required // Add the required attribute to make it a mandatory field
                  ></input>
                  {errorMessage && (
  <div className="alert alert-danger" role="alert">
    {errorMessage}
  </div>
)}
                </div>

                <div className="form-group mb-2">
                  <label className="form-lable">Course Name :</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="coursename"
                    onChange={handleChange}
                  >
                      <option value="">select Course</option>
                  {courses.map((cor)=>(
                    <option key={cor.id} value={cor.name}>{cor.name}</option>
                  ))}
                  </select>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveEnrollment(e)}
                >
                  Submit
                </button>
                <Link
                  to="/ListEnrollment"
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEnrollment;
