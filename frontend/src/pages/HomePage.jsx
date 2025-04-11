import React from "react";
import { Outlet, Link, useOutletContext } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Navbar from "../components/Navbar";



function HomePage() {

  const {userToken} = useOutletContext()

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