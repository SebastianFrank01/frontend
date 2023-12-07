// https://react-bootstrap.netlify.app/docs/components/navbar/
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

function NavBar({ isAuthenticated, username, onLogout }) {
    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="border-bottom border-danger mb-3">
            <Container>
                <Navbar.Brand as={LinkContainer} to="/"><Navbar.Brand><b className="redText">OC</b>casional Transit</Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Rate</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/lookup">
                            <Nav.Link>Lookup</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/ViewStats">
                            <Nav.Link>View Stats</Nav.Link>
                        </LinkContainer>


                    </Nav>
                    {isAuthenticated ? (
                        <Nav>
                            <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
                        </Nav>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default NavBar;