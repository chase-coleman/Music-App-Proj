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

  return (
    <>
    <Navbar />
    <div className="h-screen flex flex-col justify-start items-center">
      <div className="landingpage-container blurbg h-1/3 w-6/10 mt-[7em] flex justify-center items-center">
      {/* fix the pt issue where rhythm isnt centered verticall */}
      <span className="brand pt-3 !text-[7.5em]">Rhythm</span>    
      </div>
      <div className="login-container blurbg h-[2em] mt-[1em] w-1/10 flex flex-col justify-center items-center">
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