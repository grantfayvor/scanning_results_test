import React, { PureComponent } from "react";
import { Table, Button, ListGroup, Accordion, Card } from "react-bootstrap";
import Modal from "./Modal";
import Spinner from "./Spinner";
import '../App.css';

export default class ScanResults extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      modalInfo: {}
    };
  }

  componentDidMount() {
    this.props.getScans();
  }

  toggleModal = (modalInfo = {}) => {
    this.setState({
      modalActive: !this.state.modalActive,
      modalInfo
    });
  };

  showSpinner = () => !!this.props.scanResults.length;

  render() {

    return (
      <div className="App-header">
        <Table hidden={!this.showSpinner()} style={{ color: "white" }} striped bordered>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Repository Name</th>
              <th>Status</th>
              <th>Queued At</th>
              <th>Scanning At</th>
              <th>Finished At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.scanResults.map((sc, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{sc.repositoryName}</td>
                  <td>{sc.status}</td>
                  <td>{new Date(sc.queuedAt).toDateString()}</td>
                  <td>{new Date(sc.scanningAt).toDateString()}</td>
                  <td>{new Date(sc.finishedAt).toDateString()}</td>
                  <td>
                    <Button variant="outline-info" onClick={() => this.toggleModal(sc)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Modal title={this.state.modalInfo.repositoryName} toggleModal={this.toggleModal} active={this.state.modalActive} size="lg">
          <Table striped hover>
            <tbody>
              <tr>
                <td>Repository Name</td>
                <td>{this.state.modalInfo.repositoryName}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{this.state.modalInfo.status}</td>
              </tr>
              <tr>
                <td>Queued At</td>
                <td>{this.state.modalInfo.queuedAt}</td>
              </tr>
              <tr>
                <td>Scanning At</td>
                <td>{this.state.modalInfo.scanningAt}</td>
              </tr>
              <tr>
                <td>Finished At</td>
                <td>{this.state.modalInfo.finishedAt}</td>
              </tr>
              <tr>
                <td>Findings</td>
                <td>
                  {
                    (this.state.modalInfo.findings || []).map((f, i) => {
                      return (
                        <Accordion defaultActiveKey={0}>
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                                {`${f.type} - ${f.ruleId}`}
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={i}>
                              <Card.Body>
                                <Accordion defaultActiveKey={`location-${i}`}>
                                  <Card>
                                    <Card.Header>
                                      <Accordion.Toggle as={Button} variant="link" eventKey={`location-${i}`}>
                                        Location
                                      </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={`location-${i}`}>
                                      <Card.Body>
                                        <ListGroup>
                                          <ListGroup.Item>{JSON.stringify(f.location)}</ListGroup.Item>
                                        </ListGroup>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card>
                                  <Card>
                                    <Card.Header>
                                      <Accordion.Toggle as={Button} variant="link" eventKey={`metadata-${i}`}>
                                        Metadata
                                      </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={`metadata-${i}`}>
                                      <Card.Body>
                                        <ListGroup>
                                          <ListGroup.Item>{JSON.stringify(f.metadata)}</ListGroup.Item>
                                        </ListGroup>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                  </Card>
                                </Accordion>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        </Accordion>
                      )
                    })
                  }
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal>
        <Spinner hidden={this.showSpinner()} />
      </div>
    )
  }
}