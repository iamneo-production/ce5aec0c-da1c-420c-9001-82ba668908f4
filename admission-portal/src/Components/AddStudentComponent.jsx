import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentService from "../services/StudentService.js";
import '../CSS/Studentstatus.css';

const AddStudentComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    StudentService.getStudentById(id)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform update request using StudentService
    // ...
    // After successful update, navigate back to the student list page
    StudentService.addStudent(student).then((response) => {
      navigate("/students");
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: "80%" }}>
        <h3 className="text-center">Add Student</h3>
        <form onSubmit={handleSubmit} autoComplete="no">
          <div className="row mb-3">
            <div className="col">
              <label>First Name:</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={student.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col">
              <label>Last Name:</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={student.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={student.email}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                onChange={handleInputChange}
                required
              />
               <p className="small-text">(Enter a valid email address, e.g., sample@gmail.com)</p>
            </div>
            <div className="col">
              <label>Password:</label>
              <input
                type="text"
                className="form-control"
                name="password"
                value={student.password}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                onChange={handleInputChange}
                required
              />
              <p className="small-text">(Password should be at least 8 characters, one lowercase letter, one uppercase letter & one digit.)</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label>Phone Number:</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={student.phoneNumber}
                pattern="[0-9]{10}"
                onChange={handleInputChange}
                required
              />
              <p className="small-text">(Phone number should be a 10 digit number)</p>
            </div>
            <div className="col">
              <label>Gender:</label>
              <select
                className="form-select"
                name="gender"
                value={student.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label>DoB:</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                value={student.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <label>Address:</label>
              <textarea
                type="text"
                className="form-control"
                name="address"
                value={student.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col text-center">
              <button
                type="button"
                className="btn btn-danger me-3"
                onClick={() => navigate("/students")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentComponent;
