import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Login() {
  return (
    <>
    <h1>Login Page</h1>
    <fieldset className="fieldset">
        <input type="text" className="input" placeholder="Username" />
        <input type="text" className="input" placeholder="Password" />
      </fieldset>
      <button class="btn btn-neutral w-[25vw]" >Login</button>
    <Nav.Link as={Link} to="/signup">
    Sign Up
    </Nav.Link>
    </>
  )
}

export default Login
// 208e482477d3ccaae4b44597ccc0f2834c6885f7