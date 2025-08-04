/* 
AXIOS .post() method docs 
https://axios-http.com/docs/post_example
*/

/*
https://www.freecodecamp.org/news/how-to-use-settimeout-in-react-using-hooks/#heading-how-to-use-settimeout-in-functional-components
resource for using setTimeout() function
*/

import { BouncyArc } from "ldrs/react";
import "ldrs/react/BouncyArc.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// TO DO : create verification for account fields like email & password formatting

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

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const navigate = useNavigate();
  const { setUserToken } = useOutletContext()

  const handleMsg = () => {
    setShowMsg(true);
  };

  useEffect(() => {
    if (showMsg) {
      const timer = setTimeout(() => {
        setShowMsg(false);
        const token = localStorage.getItem("token")
        setUserToken(token)
        navigate("/home");
      }, 3000);
    }
  }, [showMsg]);

  /* When user hits 'Create Account' button, the 2 passwords 
  that they entered are checked to make sure they match*/
  const handlePasswordMatching = () => {
    if (password === passwordconfirm) {
      /* if they do match, create an objects to send to backend
       and call the function that does the post call */
      const accountInfo = {
        first_name: fname,
        last_name: lname,
        email: email,
        //if the user entered a username, send it to backend. otherwise username will be generated for them
        username: username.length ? username : null, 
        password: password,
      };
      handleSubmit(accountInfo);
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleSubmit = async (accountInfo) => {
    const signUpUrl = "http://127.0.0.1:8000/api/v1/users/signup/";
    try {
      // call backend signup view and send it the new user's entered info
      const response = await axios.post(signUpUrl, accountInfo);
      localStorage.setItem("token", response.data.token);
      setShowMsg(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container flex flex-col justify-center items-center">
        <Navbar />
        <div
          className="signupinfocontainer rounded-xl flex flex-col justify-center items-center 
        h-[60vh] w-[40vw]"
        >
          <h5 className="text-center">
            Please enter the required information:
          </h5>
          <fieldset className="fieldset gap-2">
            <input
              className="input placeholder-gray-400 text-black font-forta"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
              type="text"
              placeholder="First Name"
              style={{ fontFamily: "'Forta', sans-serif" }}
            />
            <input
              className="input placeholder-gray-400 text-black font-forta" 
              onChange={(e) => setLname(e.target.value)}
              value={lname}
              type="text"
              placeholder="Last Name"
              style={{ fontFamily: "'Forta', sans-serif" }}
            />
            <input
              className="input placeholder-gray-400 text-black font-forta"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Email"
              style={{ fontFamily: "'Forta', sans-serif" }}
            />
            <input
              className="input placeholder-gray-400 text-black font-forta"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
              style={{ fontFamily: "'Forta', sans-serif" }}
            />
            
            <PasswordInput
              className="input placeholder-gray-400 text-black w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
            
            <PasswordInput
              className="input placeholder-gray-400 text-black w-full"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordconfirm}
              placeholder="Confirm Password"
            />
            
            <button
              className="createaccount-btn btn-neutral w-[25vw]"
              onClick={handlePasswordMatching}
            >
              Create Account
            </button>
          </fieldset>
        </div>
      </div>
      {showMsg && (
        <div className="absolute top-[-30px] left-0 w-full h-[calc(100vh-64px)] 
                        flex items-center justify-center">
          <div
            className="account-created z-50 w-[30vw] h-[50vh] 
    rounded-lg shadow-lg flex flex-col items-center justify-center"
          >
            <h4 className="text-center">Account Created!</h4>
            <h6 className="text-center">Logging you in...</h6>

            <BouncyArc size="70" speed="1.65" color="black" />
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;