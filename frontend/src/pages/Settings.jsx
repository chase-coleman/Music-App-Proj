import React, { useState, useEffect } from "react";
import axios from "../axios";
import Navbar from "../components/Navbar";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { CircleX, Key} from "lucide-react";


const Settings = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const { currentUserInfo } = useOutletContext();

  // if a user clicks on edit into, render the component 
  const editUserInfo = () => {
    console.log("Do you want to edit user info ?")
    setShowInfo(true)
  }
  
  const handleInfoSubmit = async () => {
    // create an object from the state's values
    const accountData = {
      first_name: fname,
      last_name: lname,
      username: username,
      email: email,
      password: password
    }
    // in this we are filtering out any empty states (so states that were unchanged!)
    const filteredData = Object.fromEntries(
      Object.entries(accountData).filter(([key, value]) => value.length > 0)
    );
    console.log(filteredData)
    const response = await axios.put("http://127.0.0.1:8000/api/v1/users/", filteredData)
  }

  // handles deleting a user's account
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you'd like to delete your account?")
    if (confirmed){
    const accountDelUrl = "http://127.0.0.1:8000/api/v1/users/delete/"
    const response = await axios.delete(accountDelUrl)
    if (response.status === 204) {
      localStorage.removeItem("token")
      alert("Your account has been deleted. We hope you comeback soon!")
      navigate("/")
      }
    }
  }

  // handles de-rendering the user-info fields from the screen
  const cancelEdit = () => {
    setShowInfo(false)
  }


  return (
    <>
      <Navbar />
      <div className="pg-container w-[100vw] h-[calc(100vh-64px)] flex items-center justify-center bg-white">
        <ul className="menu bg-base-200 rounded-box w-[25vw] h-[25vh]">
          <li>
          <button onClick={editUserInfo}>
            Edit Account Info
          </button>
          </li>
          <li>
            <button onClick={handleDelete}>
            Delete Account
            </button>
          </li>
        </ul>
        {showInfo ? 
              <div className="absolute top-[0px] left-0 w-full h-[calc(100vh-64px)] flex items-center justify-center">
              <div className="signupinfocontainer flex flex-col justify-center items-center 
              h-[60vh] w-[40vw] relative">
                <div className="flex gap-1">
                <h6 className="text-center text-black">What info would you like to edit?</h6>
                <button onClick={cancelEdit}>
                <CircleX className="absolute top-1 right-1" color="black" size={15}/>
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
                  className="editaccount-btn btn-neutral text-black w-[25vw]"
                  onClick={handleInfoSubmit}
                >
                  Submit Edits
                </button>
              </fieldset>
              </div>
            </div>
            : null
            }
      </div>
    </>
  );
};

export default Settings;
