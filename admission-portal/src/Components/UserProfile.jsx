import React, { useState, useEffect ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/UserProfile.css';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../services/UserProvider';


const UserProfile = () => {
  const navigate = useNavigate();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordPatternError, setPasswordPatternError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dob: '',
    gender: '',
    password: '',
  });
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      getSingleUserData(storedId);
    }
  }, []);

  const getSingleUserData = (storedId) => {
    axios
      .get(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${storedId}`)
      .then((response) => {
        setValue(response.data);
        setForm(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChanges = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setShowPasswordModal(false);
    setShowNewPasswordModal(false);
    setPasswordError(false);
    setPhoneNumberError(false);
    setForm(value);
  };

  const handleChangeModelOpen = () => {
    setShowPasswordModal(true);
  }

  const handlechangeModalClose = () => {
    setShowPasswordModal(false);
    setShowModal(true);
    setPasswordError(false);
  }

  const handleNext = () => {
    if (currentPassword === form.password) {
      setShowNewPasswordModal(true);
      setShowPasswordModal(false);
      setShowModal(true);
      setCurrentPassword('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  const handleChangePassClose = () => {
    setShowNewPasswordModal(false);
    setPasswordPatternError(false);
    setShowPasswordModal(false);
    setShowModal(true);
  }

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      password: newPassword,
    }));
  }, [newPassword]);

  const handleNewPassSave = () => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(newPassword)) {
      setPasswordPatternError(true);
      return;
    }

    const storedId = localStorage.getItem('userId');
    axios
      .put(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${storedId}`, { ...form, password: newPassword })
      .then((response) => {
        setValue(response.data);
        setShowNewPasswordModal(false);
        setShowModal(false);
        setPasswordPatternError(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const validateFields = () => {
    const requiredFields = ["firstName", "lastName", "email", "phoneNumber", "address", "dob", "gender"];
    let hasError = false;

    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        setForm((prevForm) => ({
          ...prevForm,
          [`${field}Error`]: true,
        }));
        hasError = true;
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          [`${field}Error`]: false,
        }));
      }
    });

    return hasError;
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const hasError = validateFields();

    if (hasError) {
      alert("Please fill in all required fields.");
      return;
    }

    if (form.phoneNumber.length !== 10 || isNaN(form.phoneNumber)) {
      setPhoneNumberError(true);
      return;
    }

    const storedId = localStorage.getItem('userId');
    axios
      .put(`https://8080-dcccabdbdfdbddcbdccfebbdadbedabeaeaadbdbabf.project.examly.io/ap/students/${storedId}`, form)
      .then((response) => {
        setValue(response.data);
        setShowModal(false);
        setPhoneNumberError(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { clearUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    clearUser();
  }

  const handleLogoutclick = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to logout?')) {
      handleLogout();
      navigate('/Home');
    }
  };

  return (
    <>

      <div className="container">
        <div className="main">
          <div className="row">
            <div className="col-md-4 mt-1">
              <div className="card text-center sidebar">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <div className="text-center">
                    <p>Welcome ,</p>
                    <h2 className="stuentname">{value.firstName + ' ' + value.lastName}</h2>
                    <Link to={'/StudentDashboard'} className="mt-5 ">Home</Link>
                    <span className="Add" onClick={handleModalOpen}>Edit</span>
                  </div>
                  <div className="mt-5 text-center">
                    <span className="logouttext" onClick={handleLogoutclick}>Log Out</span>
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
                      {value.firstName + ' ' + value.lastName}
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
                    <div className="col-md-9 text-secondary">{value.gender}</div>
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

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
          <div>
            <button className="btn btn-primary" style={{ marginLeft: '30px' }} onClick={handleChangeModelOpen}>Change Password</button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <input className="form-control mb-3" type="text" placeholder="enter firstName" value={form.firstName} name="firstName"
                onChange={handleChanges}
                required
              />
            </div>
            <div className="form-group">
              <input className="form-control mb-3" type="text" placeholder="enter lastName" value={form.lastName} name="lastName" onChange={handleChanges} />
            </div>
            <div className="form-group">
              <input className="form-control mb-3" type="text" placeholder="enter email" value={form.email} name="email" onChange={handleChanges} disabled
              />
            </div>
            <div className="form-group">
              <input className="form-control mb-3" type="text" placeholder="enter phone" value={form.phoneNumber} name="phoneNumber" onChange={handleChanges} required />
              {phoneNumberError && (
                <div className="alert alert-danger mt-3" role="alert">
                  Phone number should be a 10 digit number.
                </div>
              )}
            </div>
            <div className="form-group">
              <input className="form-control mb-3" type="text" placeholder="enter address" value={form.address} name="address" onChange={handleChanges} required />
            </div>
            <div className="form-group">
              <input className="form-control mb-3" type="date" placeholder="Date of Birth (DD/MM/YY)" value={form.dob} name="dob" onChange={handleChanges} required />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                value={form.gender}
                name="gender"
                onChange={handleChanges}
                required
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
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
      <Modal show={showPasswordModal} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Change Your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="password"
                placeholder="Enter your Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            {/* Render the password error message */}
            {passwordError && (
              <div className="alert alert-danger mt-3" role="alert">
                Password Mismatch! Please enter the correct current password.
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handlechangeModalClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        </Modal.Footer>
      </Modal>



      <Modal show={showNewPasswordModal} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Enter New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <input
                className="form-control mb-3"
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Update the new password state when the user types
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              />
            </div>
            {/* Render the password pattern error message */}
            {passwordPatternError && (
              <div className="alert alert-danger mt-3" role="alert">
                Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleChangePassClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleNewPassSave}>
            Update Password
          </button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default UserProfile;
