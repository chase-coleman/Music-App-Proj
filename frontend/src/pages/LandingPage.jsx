import React, { useState } from "react";
import { Outlet, Link, useOutletContext } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Login from "../components/Login";



const LandingPage = () => {
  const {userToken} = useOutletContext()
  const [loginBtn, setLoginBtn] = useState(false)


  const handleLogin = () => {
    setLoginBtn(true)
  }


  return (
    <>
    <Navbar />
    <h1>Rhythm Music</h1>
      <button className="login" onClick={handleLogin}>
        Login
      </button>
      {loginBtn ? <Login /> : null}
    </>
  )
}

export default LandingPage;