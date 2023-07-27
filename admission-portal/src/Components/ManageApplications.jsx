import React, { useEffect, useState } from "react";
import ApplicationService from "../services/ApplicationService";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';



const ManageApplications = () => {

  const [applications, setApplications] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);
  const [showid, setShowid] = useState();

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  useEffect(() => {
    ApplicationService.getAllAdmissions()
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [applications]);

  const Acceptapp = (appid) => {
    setStatus("Accepted");
    setShow(false);
    setShowid(appid);
  };

  const Rejectapp = (appid) => {
    setStatus("Rejected");
    setShow(false);
    setShowid(appid);
  };

  const Submit = (id) => {
    let data = { feedback, status };
    ApplicationService.updatestatus(id, data)
      .then((response) => {
        console.log("Accepted");
      })
      .catch((error) => {
        console.log(error);
      });
    setShow(true);
    setFeedback("");
  };

  const cancel = () => {
    setShow(true);
    setFeedback("");
    console.log(applications)
  };

  return (
    <div className="container">
      <h2 className="text-center my-3">Applications</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>adm_Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Documents</th>
            <th>Accept / Reject</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => {
            if (app.status === "Pending") {
              return (
                <tr key={app.admId}>
                  <td>{app.admId}</td>
                  <td>{app.student.firstName}</td>
                  <td>{app.student.lastName}</td>
                  <td>{app.student.email}</td>
                  <td>
                    <Button variant="primary">
                      <Link to={`/view-docs/${app.admId}`} style={{ color: "white", textDecoration: "none" }}>
                        View Documents
                      </Link>
                    </Button>
                  </td>

                  <td>
                    {show ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => Acceptapp(app.admId)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => Rejectapp(app.admId)}
                          style={{ marginLeft: "10px" }}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      showid === app.admId && (
                        <>
                          <textarea
                            type="text"
                            placeholder="Enter Feedback"
                            name="feedback"
                            className="form-control"
                            value={feedback}
                            onChange={handleChange}
                          ></textarea>
                          <button
                            className="btn btn-primary"
                            onClick={() => Submit(app.admId)}
                          >
                            Submit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => cancel()}
                            style={{ marginLeft: "10px" }}
                          >
                            Cancel
                          </button>
                        </>
                      )
                    )}
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageApplications;
