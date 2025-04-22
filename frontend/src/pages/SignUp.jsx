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
import { useNavigate } from "react-router-dom";
// TO DO : create verification for account fields like email & password formatting

function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const navigate = useNavigate();

  const handleMsg = () => {
    setShowMsg(true);
  };

  useEffect(() => {
    if (showMsg) {
      const timer = setTimeout(() => {
        setShowMsg(false);
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
        username: username,
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
              className="input placeholder-gray text-black"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
              type="text"
              placeholder="First Name"
            />
            <input
              className="input placeholder-gray text-black"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
              type="text"
              placeholder="Last Name"
            />
            {/* lookup email and password entry form from a library */}
            <input
              className="input placeholder-gray text-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Email"
            />
            <input
              className="input placeholder-gray text-black"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
            />
            <input
              className="input placeholder-gray text-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="text"
              placeholder="Password"
            />
            <input
              className="input placeholder-gray text-black"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordconfirm}
              type="text"
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
        <div className="absolute top-[-30px] left-0 w-full h-[calc(100vh-64px)] flex items-center justify-center">
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
