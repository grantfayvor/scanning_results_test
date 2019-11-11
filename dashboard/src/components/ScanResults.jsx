import React, { PureComponent } from "react";
import { Table, Button, ListGroup, Accordion, Card, Badge } from "react-bootstrap";
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
                  <td>{sc.repositoryName} <Badge variant="light">{sc.findings.length}</Badge></td>
                  <td>{sc.status}</td>
                  <td className="small-font">{sc.queuedAt}</td>
                  <td className="small-font">{sc.scanningAt}</td>
                  <td className="small-font">{sc.finishedAt}</td>
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
                    !(this.state.modalInfo.findings || []).length ? 'N/A' :
                      this.state.modalInfo.findings.map((f, i) => {
                        return (
                          <Accordion defaultActiveKey={0}>
                            <Card>
                              <Card.Header>
                                <Accordion.Toggle className="margin-center" as={Button} variant="link" eventKey={i}>
                                  {`${f.ruleId} - ${f.metadata.description}`}
                                </Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse eventKey={i}>
                                <Card.Body>
                                  <ListGroup>
                                    <ListGroup.Item>{`Severity - ${f.metadata.severity}`}</ListGroup.Item>
                                    <ListGroup.Item>{`Path name - "${f.location.path}"`}</ListGroup.Item>
                                    <ListGroup.Item>{`Line of code - ${(f.location.positions.begin.line)}`}</ListGroup.Item>
                                  </ListGroup>
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