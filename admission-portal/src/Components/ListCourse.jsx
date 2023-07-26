import React, { useEffect, useState } from "react";
import CourseService from "../services/MCourseService";
import { Link } from "react-router-dom";

const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    CourseService.getAllCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deletecourse = (id) => {
    CourseService.deletecourse(id)
      .then(() => {
        // Course deleted successfully, update the courses state
        CourseService.getAllCourses()
          .then((response) => {
            setCourses(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div>
      <div className="container">
        <h2 className="text-center my-3">MANAGE COURSES</h2>
        <div className="row mx-5">
            <div className="col">
        <Link className="btn btn-primary" to={"/add-course"}>
          Add-Course
        </Link>
        </div>
        <div className="col mx-5">
        <form >
          <input
            className="form-control"
            type="search"
            placeholder="Search for course name..."
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </form>
        </div>
        </div>
        <div className="row">
          <div className="d-flex align-content-start flex-wrap m-2 ">
            {courses
              .filter((cor) => {
                return search.toLowerCase() === ""
                  ? cor
                  : cor.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((cor) => (
                <div key={cor.id}>
                <div>
                  <br></br>
                  <div
                    className="card"
                    style={{
                      marginLeft: "10px",
                      width: "30rem",
                      height: "30rem",
                    }}
                  >
                    <div className="card card-body">
                      <h3 className="text-center">{cor.name}</h3>
                      <p className="my-2">
                        <b>Description</b>
                      </p>
                      <p>{cor.description}</p>
                      <p>
                        <b>Prerequisites</b>
                      </p>
                      <p>{cor.prerequisites}</p>
                      <p>
                        <b>Credits</b>
                      </p>
                      <p>{cor.credits}</p>
                      <div className="col">
                        <Link
                          className="btn btn-secondary "
                          to={`/add-course/${cor.id}`}
                        >
                          Update
                        </Link>
                        <button
                          className="btn btn-danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => deletecourse(cor.id)}
                        >
                          Delete
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCourses;
