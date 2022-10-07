import React, { useState } from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom"
import ProductSidebar from './productSidebar';
const MyNavBar = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem("token", "")
    navigate("/login")
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Navbar bg="primary" variant="dark" >
        <Container>
          <Navbar.Brand to="/" as={Link}>Amazon Killer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/login" as={Link}>Login</Nav.Link>
            <Nav.Link to="/purchases" as={Link}>Purchases</Nav.Link>
            <Nav.Link onClick={handleShow}>carrito</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <ProductSidebar handleClose={handleClose} show={show}/>
    </>
  );
};

export default MyNavBar;