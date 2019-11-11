import React from "react";
import { Spinner } from "react-bootstrap";

export default function AltSpinner(props) {
  return (
    <Spinner animation="grow" role="status" hidden={props.hidden}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}