import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CodeEditor from "./CodeEditor";
import Modal from "./Modal";

export default ({ finding, handleModalChanges, handleModalInputChange, codeEditorOnload }) => {
  let [showLocationModal, setShowLocationModal] = useState(false);
  let [showMetadataModal, setShowMetadataModal] = useState(false);

  return (
    <div>
      <Form>
        <Form.Group controlId="type">
          <Form.Control defaultValue={finding.type} onChange={handleModalInputChange("type")} type="text" placeholder="Finding Type" required />
        </Form.Group>
        <Form.Group controlId="ruleId">
          <Form.Control defaultValue={finding.ruleId} onChange={handleModalInputChange("ruleId")} type="text" placeholder="Rule Id" required />
        </Form.Group>
        <Form.Group controlId="location">
          <Button variant="outline-info" onClick={() => setShowLocationModal(true)}>
            Enter Location Information
        </Button>
        </Form.Group>
        <Form.Group controlId="metadata">
          <Button variant="outline-info" onClick={() => setShowMetadataModal(true)}>
            Enter Metadata Information
        </Button>
        </Form.Group>
      </Form>
      <Modal toggleModal={setShowLocationModal} active={showLocationModal} title={"Location Details"}>
        <CodeEditor
          placeholder="Enter Location Details"
          name="location"
          value={finding.location}
          onLoad={codeEditorOnload}
          onChange={v => {
            handleModalChanges("location")(v);
          }} />
      </Modal>
      <Modal toggleModal={setShowMetadataModal} active={showMetadataModal} title={"Metadata"}>
        <CodeEditor
          placeholder="Enter Metadata"
          name="metadata"
          value={finding.metadata}
          onLoad={codeEditorOnload}
          onChange={v => {
            handleModalChanges("metadata")(v);
          }} />
      </Modal>
    </div>
  );
}