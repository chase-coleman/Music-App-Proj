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
import { useNavigate, useOutletContext } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../axios";
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
          fontFamily: isVisible ? "'Forta', sans-serif" : "sans-serif",
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

  // used to show the user successful account creation
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  // used to show the user any signup issues
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { setUserToken } = useOutletContext();

  // if user account created successfully, notify them of it and log them in.
  useEffect(() => {
    if (showSuccessMsg) {
      const timer = setTimeout(() => {
        setShowSuccessMsg(false);
        const token = localStorage.getItem("token");
        setUserToken(token);
        navigate("/home");
      }, 3000);
    }
  }, [showSuccessMsg]);

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
      const response = await axiosInstance.post("users/signup/", accountInfo);
      localStorage.setItem("token", response.data.token);
      setShowSuccessMsg(true);
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          const errors = error.response.data;
          const errorMessages = [];

          for (const field in errors) {
            if (Array.isArray(errors[field])) {
              errorMessages.push(`${field}: ${errors[field].join(" ")}`);
            }
          }
          setShowErrorMsg(true);
          setErrorMsg(errorMessages);
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      {/* the h-[calc(100vh-64px)] is to account for the navbar's size increasing the viewport causing issues
    whenever h-full/screen is used.  */}
      <div className="signup-page-container w-full h-[calc(100vh-64px)]">
        <div className="outer-signup-container flex flex-col items-center justify-center w-full h-full min-h-[calc(100vh-64px)]">
          <h5 className="text-center mb-0 text-white">
            Please enter the required information:
          </h5>
          <span className="text-center text-[.75rem] mb-0 text-white">Indicated by a *</span>
          <div className="signupinfocontainer rounded-xl flex flex-col justify-center items-center h-2/3 w-1/2">
            <fieldset className="fieldset gap-3">

              {/* first name */}
              <span className="text-[.6rem] text-red-500 max-h-[.3rem]">
                
                {/* check if errorMsg is true, and use .some() to iterate through and see if the field is in the error message. 
                conditionally renders error message and also highlights input field border  */}
                {errorMsg && errorMsg.some((msg) => msg.includes("first_name"))
                  ? "First name cannot be blank."
                  : null}
              </span>
              <input
                className={`input border-2 ${
                  showErrorMsg && errorMsg.some((msg) => msg.includes("first_name"))
                    ? "border-red-500"
                    : "border-black-500"
                } placeholder-gray-400 focus:border-blue-500 text-black`}
                onChange={(e) => setFname(e.target.value)}
                value={fname}
                type="text"
                placeholder="* First Name"
              />

              {/* last name */}
              <span className="text-[.6rem] text-red-500 w-full h-full max-h-[.3rem]">
                {errorMsg && errorMsg.some((msg) => msg.includes("last_name"))
                  ? "Last name cannot be blank."
                  : null}
              </span>
              <input
                className={`input border-2 ${
                  showErrorMsg && errorMsg.some((msg) => msg.includes("last_name"))
                    ? "border-red-500"
                    : "border-black-500"
                } placeholder-gray-400 focus:border-blue-500 text-black`}
                onChange={(e) => setLname(e.target.value)}
                value={lname}
                type="text"
                placeholder="* Last Name"
              />

              {/* email */}
              <span className="text-[.6rem] text-red-500 w-full max-h-[.3rem]">
                {Array.isArray(errorMsg) ? errorMsg?.find((msg) => msg.includes("email")) || "" 
                : "" }
              </span>
              <input
                className={`input border-2 ${
                  showErrorMsg && errorMsg.some((msg) => msg.includes("email"))
                    ? "border-red-500"
                    : "border-black-500"
                } placeholder-gray-400 focus:border-blue-500 text-black`}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="* Email"
              />

              {/* username */}
              <span className="text-[.6rem] text-red-500 w-full h-full max-h-[.3rem]">
                {errorMsg && errorMsg.some((msg) => msg.includes("username"))
                  ? "Username already exists."
                  : null}
              </span>
              <input
                className={`input border-2 ${
                  showErrorMsg && errorMsg.some((msg) => msg.includes("username"))
                    ? "border-red-500"
                    : "border-black-500"
                } placeholder-gray-400 focus:border-blue-500 text-black`}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Username"
              />

              {/* passwords */}
              <span className="text-[.6rem] text-red-500 w-full h-full max-h-[.3rem]">
                {errorMsg && errorMsg.some((msg) => msg.includes("password"))
                  ? "Password cannot be blank."
                  : null}
              </span>
              <PasswordInput
                className={`input border-2 ${
                  showErrorMsg && errorMsg.some((msg) => msg.includes("password"))
                    ? "border-red-500"
                    : "border-black-500"
                } placeholder-gray-400 focus:border-blue-500 text-black`}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="* Password"
              />

              <span className="text-[.6rem] text-red-500 w-full h-full max-h-[.3rem]">
                {errorMsg && errorMsg.some((msg) => msg.includes("password"))
                  ? "Password cannot be blank."
                  : null}
              </span>
              <PasswordInput
                className={`input border-2 ${
                  showErrorMsg && errorMsg.some((msg) => msg.includes("password"))
                    ? "border-red-500"
                    : "border-black-500"
                } placeholder-gray-400 focus:border-blue-500 text-black`}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordconfirm}
                placeholder="* Confirm Password"
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
      </div>
      {showSuccessMsg && (
        <div
          className="absolute top-[-30px] left-0 w-full h-[calc(100vh-64px)] 
                        flex items-center justify-center"
        >
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
};

export default Signup;
