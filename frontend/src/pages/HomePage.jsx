import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const login = () => {

}

function HomePage() {
  return (
    <>
    <h1>Home Page</h1>
    <Nav.Link as={Link} to="/login">
    Login
    </Nav.Link>
    </>
  )
}

export default HomePage