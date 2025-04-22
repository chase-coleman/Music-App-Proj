import React, { useState, useEffect } from "react";
import axios from "../axios";
import Navbar from "../components/Navbar";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { CircleX, UserRoundX, UserRoundPen } from "lucide-react";
import { BouncyArc } from "ldrs/react";
import "ldrs/react/BouncyArc.css";

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
    getUserInfo()
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
        alert("Your account has been deleted. We hope you comeback soon!");
        setAccountDeleted(true);
        setUserToken(null);
        navigate("/");
      }
    }
  };

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
                  className="editaccount-btn btn-neutral text-white w-[25vw]"
                  onClick={handleInfoSubmit}
                >
                  Submit Edits
                </button>
              </fieldset>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Settings;
