import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Navbar from "../components/Navbar";

const login = () => {

}

function HomePage() {
  return (
    <>
    <Navbar />
    <h1>Home Page</h1>
    <Nav.Link as={Link} to="/login">
    Login
    </Nav.Link>
    </>
  )
}

export default HomePage