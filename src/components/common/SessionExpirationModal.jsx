import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { Modal, Button } from 'react-bootstrap';

const SessionExpirationModal = () => {
  const { alertVisible, setAlertVisible, handleLogout } = useContext(AuthContext);

  const handleClose = () => setAlertVisible(false);
  const handleReLogin = () => {
    handleLogout(); 
    window.location.href = '/login'; 
  };

  return (
    <Modal show={alertVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Session Expiration Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your session is about to expire. Please re-login to continue your work.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Dismiss
        </Button>
        <Button variant="primary" onClick={handleReLogin}>
          Re-login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionExpirationModal;
