import React, { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios";
import Navbar from "../components/Navbar";
import { BouncyArc, DotPulse } from "ldrs/react";
import { Eye, EyeOff } from "lucide-react";
import "ldrs/react/BouncyArc.css";
import "ldrs/react/DotPulse.css"
// TO DO : error handling for incorrect user login info

// Custom Password Input Component
const PasswordInput = ({ 
  placeholder = "Enter password", 
  onChange,
  value,
  className = "",
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative w-full">
      <input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className} ${isVisible ? "font-forta" : "font-sans"}`}
        style={{
          fontFamily: isVisible ? "'Forta', sans-serif" : "sans-serif"
        }}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        aria-label={isVisible ? "Hide password" : "Show password"}
      >
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

function Login() {
  // creating state variables for user's username and password that they enter
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { setUserToken } = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginUrl = "http://127.0.0.1:8000/api/v1/users/login/";
    try {
      // call backend login view and send user-input data to authenticate
      const response = await axios.post(loginUrl, {
        username: username,
        password: password,
      });
      const current_user_token = response.data.token;
      if (current_user_token) {
        setUserToken(current_user_token);
        setSuccess(true); // show a message
        setTimeout(() => {
        setSuccess(false);
        navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="info-container h-screen w-screen mt-[5em] flex flex-col justify-start items-center">
        <div className="field-container h-[30%] flex flex-col justify-start items-center p-3">
          <fieldset className="fieldset">
            <input
              className="input placeholder-gray text-black font-forta"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
              style={{ fontFamily: "'Forta', sans-serif" }}
            />
            
            {/* Replace standard password input with custom component */}
            <PasswordInput
              className="input placeholder-gray text-black w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </fieldset>
          <div className="loginbutton-container m-[1em] w-[50%] gap-2 z-10 flex flex-col items-center">
            <button
              className="login-btn btn-neutral rounded text-white !text-[1em] w-[100%]"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="signup-link w-[50%] text-center rounded">
            <Nav.Link
              as={Link}
              to="/signup"
              className="signup-btn !text-[.5em]"
            >
              Sign Up
            </Nav.Link>
            </div>
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
              <span className="text-center text-[1em] text-white">Login Successful!</span>
              <span className="text-center text-[.5em] text-white">
                Just a moment <DotPulse color="white" size={10}/>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;