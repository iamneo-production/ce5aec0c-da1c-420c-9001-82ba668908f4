import React from "react";
// import { CssBaseline, Container } from "@mui/material";
import '../CSS/UserProfile.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import {  Modal } from 'react-bootstrap';
const UserProfile = () => {
    const location=useLocation();
    const history=useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [value,setValue]= useState([]);
    const [form,setForm] = useState([]);
    const recieved = location.state?.data;
    
    useEffect(()=>{
        getSingleUserData(recieved);
    },[recieved]);



    const handleChanges =(event)=>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
        });
    }


    const handleFileChange =(event)=>{
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend=()=>{
          setForm({
              ...form,
              [event.target.name]: reader.result
            });
      }

    if (file) {
      reader.readAsDataURL(file);
      }
   }


    function getSingleUserData(received){
              axios.get("http://localhost:9093/profile/"+received)
              .then((response)=>{
                     setValue(response.data);
              })
              .catch(error=>{
                console.log(error);
              })
    }

      const handleModalOpen =()=>{
          setForm(value);
          setShowModal(true);
        };
    
        const handleModalClose = () => {
            setShowModal(false);
          };

          const handleUpdate =(event)=>{
            event.preventDefault();
            axios.put("http://localhost:9093/profile",form).then(response=>{
                console.log(response);
            }).catch(error=>{
              console.log(error)
            })
  
            setValue(form);
            setShowModal(false);
        }
  
        const onLogout =()=>{
            history('/login');
        }

        

  return (
    <>
      {/* <CssBaseline /> */}
      {/* <Container> */}
        <div className="container">
          <div className="main">
            <div className="row">
              <div className="col-md-4 mt-1">
                <div className="card text-center sidebar">
                  <div className="card-body">
                    <img
                      src={value.imageurl}
                      className="rounded-circle"
                      width="150"
                      alt="profile"
                    />
                    <div className="mt-3">
                      <h3>{value.firstName+' '+value.lastName}</h3>
                      <Link to={'/'}>Home</Link>
                      <span className="Add" onClick={handleModalOpen}>Edit</span><br />
                      <span className="Add" onClick={onLogout}>Log Out</span>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 mt-1">
                <div className="card mb-3 content">
                  <h1 className="m-3 pt-3">About</h1>
                  <div className="card-body">
                    <div className="row">
                      <div class="col-md-3">
                        <h5>Full name</h5>
                      </div>
                      <div className="col-md-9 text-secondary">
                        {value.firstName+' '+value.lastName}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-3">
                        <h5>DOB</h5>
                      </div>
                      <div className="col-md-9 text-secondary">{value.dob}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-3">
                        <h5>Gender</h5>
                      </div>
                      <div className="col-md-9 text-secondry">{value.gender}</div>
                    </div>
                  </div>
                </div>
                <div className="card mb-3 content">
                  <h1 className="m-3">Contact information</h1>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-3">
                        <h5>Email</h5>
                      </div>
                      <div className="col-md-9 text-secondary">{value.email}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <h5>Phone</h5>
                      </div>
                      <div className="col-md-9 text-secondary">{value.phoneNumber}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <h5>Address</h5>
                      </div>
                      <div className="col-md-9 text-secondary">{value.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </Container> */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <form> 

             <div>
              <img src={form.imageurl} alt="upload" style={{width:'100px',height:'100px',borderRadius:'5rem'}} />
              <input type="file" name="imageurl" onChange={handleFileChange}/>
             </div>
             <div className="form-group">
                <input className="form-control mb-3" type="text" placeholder="enter firstName" value={form.firstName} name="firstName" onChange={handleChanges}/>
             </div>
             <div className="form-group">
                <input className="form-control mb-3" type="text" placeholder="enter lastName" value={form.lastName} name="lastName" onChange={handleChanges}/>
             </div>
             <div className="form-group">
                <input className="form-control mb-3" type="text" placeholder="enter email" value={form.email} name="email" onChange={handleChanges} />
             </div>
             <div className="form-group">
                <input className="form-control mb-3" type="text" placeholder="enter phone" value={form.phoneNumber} name="phoneNumber" onChange={handleChanges} />
             </div>
             <div className="form-group">
                <input className="form-control mb-3" type="text" placeholder="enter address" value={form.address} name="address" onChange={handleChanges} />
             </div>
             <div className="form-group">
                <input className="form-control mb-3" type="text" placeholder="enter dob" value={form.dob} name="dob" onChange={handleChanges} />
             </div >
             <div className="form-group">
                <input className="form-control" type="text" placeholder="enter gender" value={form.gender} name="gender" onChange={handleChanges} />
             </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleModalClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleUpdate}>
             Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfile;