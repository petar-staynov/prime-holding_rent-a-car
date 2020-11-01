import React from 'react';
import {
    Navbar,
    NavDropdown,
    Nav,
    Form,
    FormControl,
    Button
} from "react-bootstrap";
import {Link} from "react-router-dom";

const Navigationbar = (props) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">RaC</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/vehicles">Vehicles</Nav.Link>
                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                    <Nav.Link as={Link} to="/rent">Rent a car</Nav.Link>
                    <Nav.Link as={Link} to="/rents">Rental events</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Navigationbar;