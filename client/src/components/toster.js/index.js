import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function CutomALert() {
  const [show, setShow] = useState(true);

  return (
 
      <ToastContainer  position="bottom-center" className="p-2">
        <Toast bg='success' onClose={() => setShow(true)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Bootstrap</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body  >Product Is Created Successfully.</Toast.Body>
        </Toast>
      </ToastContainer>
  );
}

export default CutomALert;