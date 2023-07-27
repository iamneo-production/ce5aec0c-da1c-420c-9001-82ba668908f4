import React, { useEffect, useState } from 'react';
import EnrollmentService from '../services/EnrollmentService';
import CourseService from '../services/MCourseService';
import { Link, useNavigate } from 'react-router-dom';

// Create separate components for the parts that vary based on the condition

const UpdateCourseComponent = ({ courses, setUpdatedetails }) => (
  <td className='col-sm-2'>
    <select
      className="form-select"
      aria-label="Default select example"
      name="coursename"
      onChange={(e) => setUpdatedetails(e.target.value)}
    >
      <option value="">Select Course</option>
      {courses.map((cor) => (
        <option key={cor.id} value={cor.id}>
          {cor.name}
        </option>
      ))}
    </select>
  </td>
);

const UpdateGradeComponent = ({ Grade, setUpdatedetails }) => (
  <td>
    <select
      className="form-select"
      aria-label="Default select example"
      name="grade"
      onChange={(e) => setUpdatedetails(e.target.value)}
    >
      <option value="">Select Grade</option>
      {Grade.map((grad, index) => (
        <option key={index} value={grad}>
          {grad}
        </option>
      ))}
    </select>
  </td>
);

const DefaultComponent = ({ enrol, updatefunction, DeleteEnrollment }) => (
  <>
    <button
      className="btn btn-secondary mx-2"
      onClick={() => updatefunction(enrol.enrollId)}
    >
      Update
    </button>
    <button
      className="btn btn-danger"
      onClick={() => DeleteEnrollment(enrol.enrollId)}
    >
      Delete
    </button>
  </>
);

function ListEnrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(true);
  const [updatedetails, setUpdatedetails] = useState('');
  const [enid, setEnid] = useState('');
  const [whichupdate, setWhichupdate] = useState('null');

  const updatelist = ['Course', 'Grade'];

  const Grade = ['A', 'B', 'C', 'D', 'E', 'F'];
  const history = useNavigate();

  useEffect(() => {
    EnrollmentService.getAllEnrollments()
      .then((response) => {
        setEnrollments(response.data);
      })
      .catch((error) => {
        console.log('Error', error);
      });

    CourseService.getAllCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }, [enrollments]);

  const updatefunction = (id) => {
    setEnid(id);
    setUpdate(false);
    history(`/ListEnrollment/${id}`);
  };

  const submit = (e, enrolid) => {
    e.preventDefault();
    if (whichupdate === 'Course') {
      EnrollmentService.updateEnrollment(enrolid, updatedetails)
        .then((res) => {
          setUpdate(true);
          history('/ListEnrollment');
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (whichupdate === 'Grade') {
      EnrollmentService.updateGrade(enrolid, updatedetails)
        .then((rep) => {
          setUpdate(true);
          history('/ListEnrollment');
        })
        .catch((error) => {
          console.log("Error while updating grade", error);
        });
    }

    setWhichupdate('null');
  };

  const DeleteEnrollment = (id) => {
    EnrollmentService.deleteEnrollment(id)
      .then((res) => {
        EnrollmentService.getAllEnrollments()
          .then((resp) => {
            setEnrollments(resp.data);
          })
          .catch((error) => {
            console.log('Error fetching all courses', error);
          });
      })
      .catch((error) => {
        console.log('Error deleting the data', error);
      });
  };

  const cancel = () => {
    setUpdate(true);
    setWhichupdate('null');
  };

  const renderCourseContent = (enrol) => {
    if (update) {
      return enrol.course.name;
    } else {
      if (enid === enrol.enrollId) {
        if (whichupdate === 'Course') {
          return (
            <UpdateCourseComponent
              courses={courses}
              setUpdatedetails={setUpdatedetails}
            />
          );
        } else {
          return enrol.course.name;
        }
      } else {
        return enrol.course.name;
      }
    }
  };

  const renderGradeContent = (enrol) => {
    if (update) {
      return <td className='text-center'><b>{enrol.grade}</b></td>;
    } else {
      if (enid === enrol.enrollId) {
        if (whichupdate === 'Grade') {
          return (
            <UpdateGradeComponent
              Grade={Grade}
              setUpdatedetails={setUpdatedetails}
            />
          );
        } else {
          return <td className='text-center'><b>{enrol.grade}</b></td>;
        }
      } else {
        return <td className='text-center'><b>{enrol.grade}</b></td>;
      }
    }
  };

  const renderActionContent = (enrol) => {
    if (update) {
      return (
        <DefaultComponent
          enrol={enrol}
          updatefunction={updatefunction}
          DeleteEnrollment={DeleteEnrollment}
        />
      );
    } else {
      if (whichupdate === 'null' && enid === enrol.enrollId) {
        return (
          <>
            <select
              className="form-select"
              aria-label="Default select example"
              name="whichupdate"
              onChange={(e) => setWhichupdate(e.target.value)}
            >
              <option value="">Select Update</option>
              {updatelist.map((list, index) => (
                <option key={index} value={list}>
                  {list}
                </option>
              ))}
            </select>
            <button className='btn btn-danger' onClick={cancel}>
              Cancel
            </button>
          </>
        );
      } else if (enid === enrol.enrollId) {
        return (
          <>
            <button
              className="btn btn-success mx-1"
              onClick={(e) => submit(e, enrol.enrollId)}
            >
              Submit
            </button>
            <button className="btn btn-danger" onClick={cancel}>
              Cancel
            </button>
          </>
        );
      } else {
        return null;
      }
    }
  };

  return (
    <div>
      <div className="container">
        <h2 className="text-center my-3">MANAGE ENROLLMENTS</h2>
        <div className="row mx-5 my-3">
          <div className="col">
            <Link className="btn btn-primary" to={'/add-enrollment'}>
              Add-Enrollment
            </Link>
          </div>
          <div className="col mx-5">
            <form>
              <input
                className="form-control"
                type="search"
                placeholder="Search for course name..."
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </form>
          </div>
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Enrol_Id</th>
              <th>Student Name</th>
              <th>Course Name</th>
              <th>Email</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrollments
              .filter((enrol) => {
                return search.toLowerCase() === ''
                  ? enrol
                  : enrol.course.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((enrol) => {
                return (
                  <tr key={enrol.enrollId}>
                    <td>{enrol.enrollId}</td>
                    <td>
                      {enrol.student.firstName} {enrol.student.lastName}
                    </td>
                    <td>{renderCourseContent(enrol)}</td>
                    <td>{enrol.student.email}</td>
                    {renderGradeContent(enrol)}
                    <td>
                      {renderActionContent(enrol)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListEnrollment