import React, { useState, useEffect } from "react";
import { Modal, Nav, Container } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';
import '../CSS/Session.css';

function Session() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  const handleRegistrationSuccess = () => {
    setShowRegisterSuccess(true);
  };

  useEffect(() => {
    if (showRegisterSuccess) {
      const timer = setTimeout(() => {
        setShowLogin(true);
        setShowRegisterSuccess(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [showRegisterSuccess]);

  return (
    <div className="divmodel modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog show={true} backdrop="static" keyboard={false} centered className="modeldio">
        <Modal.Header bg="dark" className="modelheader">
          <div className="d-flex justify-content-center w-100"> {/* Added container with flexbox properties */}
            <Nav variant="pills" className="navpills">
              <Nav.Item>
                <Nav.Link onClick={handleLoginClick} active={showLogin} className="session-link">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleRegisterClick} active={!showLogin} className="session-link">Register</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Modal.Header>

        <Modal.Body className="model-center">
          {showLogin ? (
            <Login onSignUpClick={handleRegisterClick} />
          ) : (
            <>
              {showRegisterSuccess ? (
                <Container>
                  <div className="text-center">
                    <h4>Thanks for registering. Now you will be redirected to the Login page!</h4>
                  </div>
                </Container>
              ) : (
                <Register onRegistrationSuccess={handleRegistrationSuccess} onSignInClick={handleLoginClick} />
              )}
            </>
          )}
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default Session;
