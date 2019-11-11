import React from "react";
import { Toast } from "react-bootstrap";

export default ({ title, message, active = true, toggle }) => {
  return (
    <Toast show={active} onClose={toggle}>
      <Toast.Header>
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body className="toast-body">{message}</Toast.Body>
    </Toast>
  );
}