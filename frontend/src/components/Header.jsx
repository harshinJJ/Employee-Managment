import React from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  const logoUrl =
    "https://play-lh.googleusercontent.com/Im3CE-kmZJmZMC8pkhpCj7tGznPI6LC1EjhaTJ3E6Cdh_mgW5VxF_joZK31XWwZPmkT5=w480-h960-rw";
  const role = sessionStorage.getItem("role");
  const handleonclick = () => {
    sessionStorage.clear("username");
    sessionStorage.clear("role");
  };
  return (
    <div>
      {role == 1 ? (
        <Navbar collapseOnSelect expand="lg" className="navstyle navtextstyle">
          <Container className="">
            <Navbar.Brand href="#home">
              {" "}
              <img src={logoUrl} width="50" height="50" alt="Logo" />{" "}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/addemp">Create Employee</Nav.Link>
                <Nav.Link href="/empdetails">EmployeeList</Nav.Link>
                <Nav.Link href="/" onClick={handleonclick}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar collapseOnSelect expand="lg" className="navstyle navtextstyle">
          <Container className="">
            <Navbar.Brand href="/">
              {" "}
              <img src={logoUrl} width="50" height="50" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default Header;
