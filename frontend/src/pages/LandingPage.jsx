import React, { useEffect, useState } from "react";
import { Outlet, Link, useOutletContext, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Login from "../components/Login";



const LandingPage = () => {
  const {userToken} = useOutletContext()
  const [loginBtn, setLoginBtn] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    setLoginBtn(true)
    navigate("/login")
  }

  useEffect(() => {
    console.log(loginBtn)
  }, [loginBtn])

  return (
    <>
    <Navbar />
    <div className="h-screen flex flex-col justify-start items-center">
      <div className="landingpage-container h-[9em] w-[20em] mt-[7em] flex flex-col justify-center items-center">
      <h1 className="brand">Rhythm</h1>    
      </div>
      <div className="login-container h-[2em] mt-[1em] w-[5em] flex flex-col justify-center items-center">
      <button className="login-btn text-[clamp(0.5em,2vw,3em)]" onClick={handleLogin}>
        Login
      </button>
      </div>
      </div>
      {/* {loginBtn && <Login /> } */}
    </>
  )
}

export default LandingPage;