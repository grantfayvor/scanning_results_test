import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CodeEditor from "./CodeEditor";
import Modal from "./Modal";

export default ({ modalFinding, handleModalChanges, handleModalInputChange, codeEditorOnload }) => {
  let [locationModalState, setLocationModalState] = useState(false);
  let [metadataModalState, setMetadataModalState] = useState(false);

  return (
    <div>
      <Form>
        <Form.Group controlId="type">
          <Form.Control defaultValue={modalFinding.type} onChange={handleModalInputChange("type")} type="text" placeholder="Finding Type" required />
        </Form.Group>
        <Form.Group controlId="ruleId">
          <Form.Control defaultValue={modalFinding.ruleId} onChange={handleModalInputChange("ruleId")} type="text" placeholder="Rule Id" required />
        </Form.Group>
        <Form.Group controlId="location">
          <Button variant="outline-info" onClick={() => setLocationModalState(true)}>
            Enter Location Information
        </Button>
        </Form.Group>
        <Form.Group controlId="metadata">
          <Button variant="outline-info" onClick={() => setMetadataModalState(true)}>
            Enter Metadata Information
        </Button>
        </Form.Group>
      </Form>
      <Modal toggleModal={setLocationModalState} active={locationModalState} title={"Location Details"}>
        <CodeEditor
          placeholder="Enter Location Details"
          name="location"
          value={modalFinding.location}
          onLoad={codeEditorOnload}
          onChange={v => {
            handleModalChanges("location")(v);
          }} />
      </Modal>
      <Modal toggleModal={setMetadataModalState} active={metadataModalState} title={"Metadata"}>
        <CodeEditor
          placeholder="Enter Metadata"
          name="metadata"
          value={modalFinding.metadata}
          onLoad={codeEditorOnload}
          onChange={v => {
            handleModalChanges("metadata")(v);
          }} />
      </Modal>
    </div>
  );
}