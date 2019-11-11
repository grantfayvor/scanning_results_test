import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavBar = props => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">GuardsRails.io</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/CreateScanResult">Create Scan Result</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" defaultValue={props.searchText} onChange={e => props.setSearchText(e.target.value)} className="mr-sm-2" />
          <Button variant="outline-success" onClick={props.search}>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;