import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/StudentService";
import ApplicationService from "../services/ApplicationService";

const ListStudentComponent = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    StudentService.getStudents()
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (id) => {
    navigate("/update-student/" + id);
  };

  const handleDelete = (id) => {
    ApplicationService.deleteAdmissionById(id)
      .then(() => {
        fetchStudents(); // Refresh the list after deleting the student and associated admissions
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <h2 className="text-center my-3">List Of Students</h2>
      <div className="row mb-3">
        <div className="col-md-6 offset-md-6">
          <div className="input-group">
            <label
              className="mt-2 me-2 font-weight-bold"
              style={{ fontSize: "b" }}
              htmlFor="search"
            >
              Search :{" "}
            </label>
            <input
              id="search"
              type="text"
              className="form-control"
              placeholder="Name or ID"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <button
        className="btn btn-success btn-sm m-2"
        onClick={() => navigate("/addstudent")}
      >
        Add Student
      </button>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>StudentId</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email id</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <>
                {(!searchText ||
                  (student.id &&
                    student.id.toString().includes(searchText)) ||
                  (student.firstName &&
                    student.firstName
                      .toUpperCase()
                      .includes(searchText.toUpperCase())) ||
                  (student.lastName &&
                    student.lastName
                      .toUpperCase()
                      .includes(searchText.toUpperCase()))) && (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.dob}</td>
                    <td>{student.gender}</td>
                    <td>{student.phoneNumber}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleUpdate(student.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStudentComponent;
