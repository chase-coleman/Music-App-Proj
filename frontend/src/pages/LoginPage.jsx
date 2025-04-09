import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios";
import Navbar from "../components/Navbar";

// TO DO : error handling for incorrect user login info 

function Login() {
  // creating state variables for user's username and password that they enter
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async () => {
    const loginUrl = 'http://127.0.0.1:8000/api/v1/users/login/'
    try{
      // call backend login view and send user-input data to authenticate
    const response = await axios.post(loginUrl, {
      username: username,
      password: password
    })
    console.log(response.data)
    } catch (error){
      console.error("Error:", error)
    }
  }

  return (
    <>
    <Navbar />
    <h1>Login Page</h1>
    <fieldset className="fieldset">
        <input className="input" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
        <input className="input" onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Password" />
      </fieldset>
      <button className="btn btn-neutral w-[25vw]" onClick={handleLogin} >Login</button>
    <Nav.Link as={Link} to="/signup">
    Sign Up
    </Nav.Link>
    </>
  )
}

export default Login
// a17946f2225e496c88fa7ea8419d965d5a4f4bf3