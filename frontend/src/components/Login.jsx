import React, { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios";
import Navbar from "../components/Navbar";


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {setUserToken} = useOutletContext()
  const navigate = useNavigate()


  const handleLogin = async () => {
    const loginEndpoint = 'http://127.0.0.1:8000/api/v1/users/login/'
    
    try{
      // call backend login view and send user-input data to authenticate
    const response = await axios.post(loginEndpoint, {
      username: username,
      password: password
    })
    
    if (response.status === 200){
      // grab the returned token from the db
      const current_user_token = response.data.token
  
      // set userToken in App.jsx state variable
      setUserToken(current_user_token)
      navigate('/home');
    };


    } catch (error){
      console.error("Error:", error)
    }
  }

  return (
  <>
  <div className="container flex flex-col border-2 justify-center items-center w-50" >
        <fieldset className="fieldset">
            <input className="input" onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
            <input className="input" onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Password" />
          </fieldset>
          <button className="btn btn-neutral w-[25vw]" onClick={handleLogin} >Login</button>
        <Nav.Link as={Link} to="/signup">
        Sign Up
        </Nav.Link>
    </div>
  </>

  )


}

export default Login;