import React, { useEffect, useState } from "react";
import ApplicationService from "../services/ApplicationService";

const ApplicationReport = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState("");

  useEffect(() => {
    ApplicationService.getAllAdmissions()
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlechange = (e) => {
    setSelectedReports(e.target.value);
  };

  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="container">
      <h2 className="text-center my-3">REPORT</h2>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handlechange}
      >
        <option defaultValue>Choose one for the Report</option>
        <option value="Total">Total Applications</option>
        <option value="Pending">Pending</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>
      <br />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
          <th>Adm_Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Status</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((rep) => {
            if (selectedReports === "Total") {
              if (
                rep.status === "Pending" ||
                rep.status === "Accepted" ||
                rep.status === "Rejected"
              ) {
                return (
                  <tr key={rep.admId}>
                    <td>{rep.admId}</td>
                    <td>{rep.student.firstName}</td>
                    <td>{rep.student.lastName}</td>
                    <td>{rep.student.email}</td>
                    <td>{rep.status}</td>
                    <td>{rep.feedback}</td>
                  </tr>
                );
              }
            }
            if (selectedReports === "Accepted") {
              if (rep.status === "Accepted") {
                return (
                  <tr key={rep.admId}>
                    <td>{rep.admId}</td>
                    <td>{rep.student.firstName}</td>
                    <td>{rep.student.lastName}</td>
                    <td>{rep.student.email}</td>
                    <td>{rep.status}</td>
                    <td>{rep.feedback}</td>
                  </tr>
                );
              }
            }
            if (selectedReports === "Rejected") {
              if (rep.status === "Rejected") {
                return (
                  <tr key={rep.admId}>
                  <td>{rep.admId}</td>
                  <td>{rep.student.firstName}</td>
                  <td>{rep.student.lastName}</td>
                  <td>{rep.student.email}</td>
                  <td>{rep.status}</td>
                  <td>{rep.feedback}</td>
                </tr>
                );
              }
            }
            if (selectedReports === "Pending") {
              if (rep.status === "Pending") {
                return (
                  <tr key={rep.admId}>
                  <td>{rep.admId}</td>
                  <td>{rep.student.firstName}</td>
                  <td>{rep.student.lastName}</td>
                  <td>{rep.student.email}</td>
                  <td>{rep.status}</td>
                  <td>{rep.feedback}</td>
                </tr>
                );
              }
            }
            return null;
          })}
        </tbody>
      </table>
      <br />
      <button className="btn btn-primary" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
};

export default ApplicationReport;
