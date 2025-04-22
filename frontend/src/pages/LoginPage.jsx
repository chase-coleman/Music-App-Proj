import React, { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios";
import Navbar from "../components/Navbar";

// TO DO : error handling for incorrect user login info 

function Login() {
  // creating state variables for user's username and password that they enter
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {setUserToken} = useOutletContext()
  const navigate = useNavigate()

  const handleLogin = async () => {
    const loginUrl = 'http://127.0.0.1:8000/api/v1/users/login/'
    try{
      // call backend login view and send user-input data to authenticate
    const response = await axios.post(loginUrl, {
      username: username,
      password: password
    })
    const current_user_token = response.data.token
    if (current_user_token){
      setUserToken(current_user_token)
      navigate('/home')
  }
    } catch (error){
      console.error("Error:", error)
    }
  }

  return (
    <>
    <Navbar />
    <div className="info-container h-screen w-screen mt-[5em] flex flex-col justify-start items-center">
    <div className="field-container h-[50%] flex flex-col justify-start">
    <fieldset className="fieldset">
        <input className="input placeholder-gray text-black" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
        <input className="input placeholder-gray text-black" onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Password" />
      </fieldset>
      <div className="button-container m-[1em] gap-2 z-10 flex flex-col items-center">
      <button className="login-btn btn-neutral text-white !text-[1em] w-[100%]" onClick={handleLogin} >Login</button>
    <Nav.Link as={Link} to="/signup" className="signup-btn !text-[.5em]">
    Sign Up
    </Nav.Link>
    </div>
    </div>
    </div>
    </>
  )
}

export default Login
// a17946f2225e496c88fa7ea8419d965d5a4f4bf3