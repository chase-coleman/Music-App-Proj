import React, { useState, useEffect } from "react";
import axios from "../axios";
import Navbar from "../components/Navbar";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { CircleX, UserRoundX, UserRoundPen, Eye, EyeOff } from "lucide-react";
import { BouncyArc, DotPulse } from "ldrs/react";
import "ldrs/react/BouncyArc.css";

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

const Settings = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const navigate = useNavigate();
  const { currentUserInfo, getUserInfo, setUserToken } = useOutletContext();

  // if a user clicks on edit into, render the component
  const editUserInfo = () => {
    console.log("Do you want to edit user info ?");
    setShowInfo(true);
  };

  const handleInfoSubmit = async () => {
    // create an object from the state's values
    const accountData = {
      first_name: fname,
      last_name: lname,
      username: username,
      email: email,
      password: password,
    };
    // in this we are filtering out any empty states (so info fields (the states) that were unchanged!)
    const filteredData = Object.fromEntries(
      Object.entries(accountData).filter(([key, value]) => value.length > 0)
    );
    const response = await axios.put(
      "http://127.0.0.1:8000/api/v1/users/",
      filteredData
    );
    if (response.status === 200) {
      setShowConfirmation(true);
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 2000);
    }
    setShowInfo(false);
    getUserInfo();
  };

  // handles deleting a user's account
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you'd like to delete your account?"
    );
    if (confirmed) {
      const accountDelUrl = "http://127.0.0.1:8000/api/v1/users/delete/";
      const response = await axios.delete(accountDelUrl);
      if (response.status === 204) {
        localStorage.removeItem("token");
        setAccountDeleted(true);
      }
    }
  };

  useEffect(() => {
    if (accountDeleted) {
      const timer = setTimeout(() => {
        setUserToken(null);
        setAccountDeleted(false);
        navigate("/");
      }, 3000);
      
      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [accountDeleted]);

  // handles de-rendering the user-info fields from the screen
  const cancelEdit = () => {
    setShowInfo(false);
  };

  return (
    <>
      <Navbar />
      <div className="pg-container w-[100vw] h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="edit-container h-full w-1/2 flex justify-center items-">
          <div className="menu gap-2 rounded-box w-[25vw] h-[25vh]">
            <div className="flex border-2 bg-white rounded gap-1">
              <UserRoundPen />
              <button onClick={editUserInfo}>Edit Account Info</button>
            </div>
            <div className="flex border-2 rounded bg-white gap-1">
              <UserRoundX />
              <button onClick={handleDelete}>Delete Account</button>
            </div>
          </div>
        </div>
        {showConfirmation ? (
          <div className="absolute top-[-30px] left-0 w-full h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="account-created z-50 w-[30vw] h-[50vh] rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h6 className="text-center text-white">Account Info Updated!</h6>
              <BouncyArc size="70" speed="1.65" color="white" />
            </div>
          </div>
        ) : null}
        {accountDeleted ? (
          <div className="absolute top-[-30px] left-0 w-full h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="account-created z-50 w-[30vw] h-[50vh] rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h4 className="text-center">Your account has been deleted.</h4>
              <h6 className="text-center">We hope to see you again!</h6>
              <BouncyArc size="70" speed="1.65" color="black" />
            </div>
          </div>
        ) : null}
        {showInfo ? (
          <div className="absolute top-[0px] left-0 w-full h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="signupinfocontainer flex flex-col justify-center items-center h-[60vh] w-[40vw] relative">
              <div className="flex mb-1 gap-1 bg-white w-[62%] rounded">
                <span className="text-center text-[1em] text-black">
                  What info would you like to edit?
                </span>
                <button onClick={cancelEdit}>
                  <CircleX
                    className="absolute top-1 right-1"
                    color="white"
                    size={15}
                  />
                </button>
              </div>
              <fieldset className="fieldset gap-2">
                <input
                  className="input placeholder-gray text-black font-forta"
                  onChange={(e) => setFname(e.target.value)}
                  value={fname}
                  type="text"
                  placeholder="First Name"
                  style={{ fontFamily: "'Forta', sans-serif" }}
                />
                <input
                  className="input placeholder-gray text-black font-forta"
                  onChange={(e) => setLname(e.target.value)}
                  value={lname}
                  type="text"
                  placeholder="Last Name"
                  style={{ fontFamily: "'Forta', sans-serif" }}
                />
                <input
                  className="input placeholder-gray text-black font-forta"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="Email"
                  style={{ fontFamily: "'Forta', sans-serif" }}
                />
                <input
                  className="input placeholder-gray text-black font-forta"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  placeholder="Username"
                  style={{ fontFamily: "'Forta', sans-serif" }}
                />
                
                {/* Custom password input with Forta for placeholder and visible text */}
                <PasswordInput
                  className="input placeholder-gray text-black w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                />
                
                {/* Custom password confirmation input */}
                <PasswordInput
                  className="input placeholder-gray text-black w-full"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordconfirm}
                  placeholder="Confirm Password"
                />
                <button
                  className="editaccount-btn btn-neutral text-white w-[25vw]"
                  onClick={handleInfoSubmit}
                >
                  Submit Edits
                </button>
              </fieldset>
            </div>
          </div>
        ) : null}

        {/*  account deletion component */}
        
        {accountDeleted ? (
          <div
            className="absolute top-[-30px] left-0 w-full h-[calc(100vh-64px)] 
                                flex items-center justify-center"
          >
            <div
              className="account-created z-50 w-[30vw] h-[50vh] 
            rounded-lg shadow-lg flex flex-col items-center justify-center"
            >
              <h4 className="text-center text-white">Account Deleted!</h4>
              <h6 className="text-center text-white">One moment please <DotPulse color="white" size={10}/></h6>

              <BouncyArc size="70" speed="1.65" color="white" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Settings;