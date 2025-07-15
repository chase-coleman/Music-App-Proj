import React, { useEffect, useState } from "react";
import { Outlet, Link, useOutletContext, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import axios from "axios";
import "ldrs/react/DotPulse.css"
import { DotPulse } from "ldrs/react";

const LandingPage = () => {
  const { userToken } = useOutletContext();
  const [loginBtn, setLoginBtn] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoginBtn(true);
    navigate("/login");
  };

  // checks if there is a token already existing (meaning the user already logged in and hasn't logged out)
  useEffect(() => {
    let localToken = localStorage.getItem("token");
    if (localToken) {
      verifyToken(localToken);
    }
  }, []);

  const verifyToken = async (localToken) => {
    const verifyTokenUrl = "http://localhost:8000/api/v1/users/verify/";
    try {
      const response = await axios.get(verifyTokenUrl, {
        headers: {
          Authorization: `Token ${localToken}`,
        },
      });
      if (response.status === 200) {
          setSuccess(true); // show a message
          setTimeout(() => {
          setSuccess(false);
          navigate("/home");
          }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col justify-start items-center">
        <div className="landingpage-container !blurbg h-1/3 w-6/10 mt-[7em] flex justify-center items-center">
          {/* fix the pt issue where rhythm isnt centered verticall */}
          <span className="brand pt-3 text-white !text-[7.5em]">Rhythm</span>
        </div>
        <div className="login-container blurbg h-[2em] mt-[1em] w-1/10 flex flex-col justify-center items-center">
          <button
            className="login-btn text-[clamp(0.5em,2vw,3em)]"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
      {success && (
        <div
          className="absolute top-[5px] left-0 w-full h-[calc(100vh-64px)] 
                        flex items-center justify-center"
        >
          <div
            className="login-successful z-50 w-[20vw] h-[20vh] 
    rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <span className="text-center text-[1em] text-white">
              Login Successful!
            </span>
            <span className="text-center text-[.5em] text-white">
              Just a moment <DotPulse color="white" size={10} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
