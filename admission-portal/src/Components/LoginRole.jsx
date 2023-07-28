import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/Session.css';

const LoginRole = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(true);

    navigate('/Session');
  };

  const handleRoleClick = () => {

    navigate('/AdminLogin');
  };

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog show={true} backdrop="static" keyboard={false} centered className="modeldio">
        <Modal.Header bg="dark" className="modelheader d-flex justify-content-center w-100">
          <Modal.Title className="logintitle">LOG IN AS</Modal.Title>
        </Modal.Header>

        <Modal.Body className="model-center">
          <div className="d-flex justify-content-center w-100">
            <Button onClick={handleLoginClick} active={showLogin} className="LoginRole-button">Student</Button>
            <Button onClick={handleRoleClick} active={!showLogin} className="LoginRole-button">Admin</Button>
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
export default LoginRole;
