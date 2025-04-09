/* 
AXIOS .post() method docs 
https://axios-http.com/docs/post_example
*/

import React, { useState, useEffect } from "react";
import axios from "axios";


// TO DO : create verification for account fields like email & password formatting

function Signup() {
  // creating state variables for first+last name
  // username, email, and password
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState('')

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
        password: password
      }
      handleSubmit(accountInfo)
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleSubmit = async (accountInfo) => {
    const signUpUrl = 'http://127.0.0.1:8000/api/v1/users/signup/'
    try{
      // call backend signup view and send it the new user's entered info
      const response = await axios.post(signUpUrl, accountInfo)
      console.log(response.data)
    } catch (error){
      console.error("Error:", error)
    }
    }

    
  return (
    <>
      <h1>Signup Page</h1>
      <fieldset className="fieldset">
        <input
          className="input"
          onChange={(e) => setFname(e.target.value)}
          value={fname}
          type="text"
          placeholder="First Name"
        />
        <input
          className="input"
          onChange={(e) => setLname(e.target.value)}
          value={lname}
          type="text"
          placeholder="Last Name"
        />
        {/* lookup email and password entry form from a library */}
        <input
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
        />
        <input
          className="input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username"
        />
        <input
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="text"
          placeholder="Password"
        />
        <input
          className="input"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordconfirm}
          type="text"
          placeholder="Confirm Password"
        />
        <button className="btn btn-neutral w-[25vw]" onClick={handlePasswordMatching}>
          Create Account
        </button>
      </fieldset>
    </>
  );
}
export default Signup;
