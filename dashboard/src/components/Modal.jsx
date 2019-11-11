import React from "react";
import { Modal, Button } from "react-bootstrap";

export default ({ children, active = true, title, handleSubmit, toggleModal, size }) => {
  return (
    <Modal show={active} onHide={() => toggleModal(false)} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => toggleModal(false)}>Close</Button>
        {
          handleSubmit && <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
        }
      </Modal.Footer>
    </Modal>
  )
}