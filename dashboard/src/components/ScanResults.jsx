import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import '../App.css';
import Axios from "axios";
import Conf from "../config";

const config = Conf[process.env.NODE_ENV];

export default class ScanResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scanResults: []
    };
  }

  componentDidMount() {
    Axios.get(`${config.webserver.uri}/api/results`)
      .then(res => res.data && res.data.data)
      .then(data => data && data.items ? data.items : data)
      .then(results => {
        console.log(results);
        this.setState({ scanResults: results });
      });

  }

  render() {

    return (
      <div className="App-header">
        <Table style={{ color: "white" }} striped bordered>
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
              this.state.scanResults.map((sc, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{sc.repositoryName}</td>
                  <td>{sc.status}</td>
                  <td>{new Date(sc.queuedAt).toDateString()}</td>
                  <td>{new Date(sc.scanningAt).toDateString()}</td>
                  <td>{new Date(sc.finishedAt).toDateString()}</td>
                  <td>
                    <Button variant="outline-info">
                      View
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    )
  }
}