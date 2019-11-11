import React, { Component } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import Modal from "./Modal";
import FindingsForm from "./FindingsForm";
import '../App.css';

export default class CreateScanResult extends Component {

  constructor(props) {
    super(props);
    let now = new Date();
    this.state = {
      modalFinding: {
        type: "",
        ruleId: "",
        location: "",
        metadata: ""
      },
      findingsModal: false,
      findings: [],
      repositoryName: "",
      status: -1,
      queuedAt: now,
      scanningAt: now,
      finishedAt: now
    };

    this.handleModalInputChange = this.handleModalInputChange.bind(this);
    this.handleModalChanges = this.handleModalChanges.bind(this);
    this.addFindingsData = this.addFindingsData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleChange = (prop, value) => {
    this.setState({ [prop]: value });
  };

  handleInputChange = prop => ({ target: { value } }) => {
    this.handleChange(prop, value);
  };

  handleModalChanges(prop) {
    return value => {
      let modalFinding = Object.assign({}, this.state.modalFinding, {
        [prop]: value
      });
      this.setState({ modalFinding });
    };
  };

  handleModalInputChange(prop) {
    return ({ target: { value } }) => {
      this.handleModalChanges(prop)(value);
    };
  };

  addFindingsData() {
    let modalFinding = Object.assign({}, this.state.modalFinding);
    if (typeof modalFinding.location === "string") modalFinding.location = JSON.parse(modalFinding.location);
    if (typeof modalFinding.metadata === "string") modalFinding.metadata = JSON.parse(modalFinding.metadata);
    this.setState({
      findings: this.state.findings.concat(modalFinding),
      modalFinding: {
        type: "",
        ruleId: "",
        location: "",
        metadata: ""
      }
    }, () => {
      this.toggleModal("findingsModal")(false);
    });
  };

  submitScanResult = async () => {
    await axios.post(`${this.props.config.webserver.uri}/api/results`, { result: this.state }).then(res => res.data);
    window.location.href = "/";
  };

  toggleModal(title) {
    return active => {
      this.setState({ [title]: active });
    }
  }

  render() {

    return (
      <div className="App-header">
        <Form style={{ width: "30%" }}>
          <Form.Group controlId="repositoryName">
            <Form.Control value={this.state.repositoryName} onChange={this.handleInputChange("repositoryName")} type="text" placeholder="Enter Repository Name" required />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Control value={this.state.status} onChange={this.handleInputChange("status")} as="select" required>
              <option value={-1} disabled>Select Status</option>
              <option value="Queued">Queued</option>
              <option value="In Progress">In Progress</option>
              <option value="Success">Success</option>
              <option value="Failure">Failure</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="queuedAt">
            <Form.Control value={this.state.queuedAt} onChange={this.handleInputChange("queuedAt")} type="date" placeholder="Queued Date" required />
          </Form.Group>
          <Form.Group controlId="scanningAt">
            <Form.Control value={this.state.scanningAt} onChange={this.handleInputChange("scanningAt")} type="date" placeholder="Scanning Date" required />
          </Form.Group>
          <Form.Group controlId="finishedAt">
            <Form.Control value={this.state.finishedAt} onChange={this.handleInputChange("finishedAt")} type="date" placeholder="Finished Date" required />
          </Form.Group>
          <Form.Group>
            <ListGroup>
              {
                this.state.findings.map((f, i) => <ListGroup.Item style={{ color: "black" }} key={i}>{`${f.type} - ${f.ruleId}`}</ListGroup.Item>)
              }
            </ListGroup>
          </Form.Group>
          <Form.Group controlId="addFindings">
            <Button variant="outline-info" onClick={() => this.toggleModal("findingsModal")(true)}>
              Add Finding
            </Button>
          </Form.Group>

          <Button variant="primary" onClick={this.submitScanResult}>
            Submit
          </Button>
        </Form>
        <Modal toggleModal={this.toggleModal("findingsModal")} active={this.state["findingsModal"]} title={"Enter Findings"} handleSubmit={this.addFindingsData}>
          <FindingsForm
            modalFinding={this.state.modalFinding}
            handleModalChanges={this.handleModalChanges}
            handleModalInputChange={this.handleModalInputChange}
          />
        </Modal>

      </div>
    )
  }
}