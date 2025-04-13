/*
https://reactrouter.com/6.30.0/hooks/use-navigate#optionsreplace
 - useNavigate doc
*/ 

import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const {userToken} = useOutletContext()
  const navigate = useNavigate()

  const handleSearch = async () => {
    const queryItem = search // get the search state variable 
    // navigate to a different page to display the search results
    navigate(`/search-results/${queryItem}`, {replace: true}) 
  }

  
  const userLogout = async () => {
    const logoutUrl = "http://127.0.0.1:8000/api/v1/users/logout/";
    try {
      // send a POST request to the logout endpoint (which will delete the user' auth token from the db)
      const response = await axios.post(
        logoutUrl,
        {},
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      // remove the deleted token from the local storage
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1 flex items-center justify-center ">
          <Nav.Link as={Link} to="/playlists">
            Playlists
          </Nav.Link>
          <br />
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // update the state variable for the search bar as the user types in it
            className="input input-bordered w-24 md:w-auto"
          />
          {/* call the function that will grab the search bar value & navigate to the search results page*/}
          <button className="btn btn-neutral w-[5vw]" onClick={handleSearch}> 
          Search
        </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={userLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

              // useEffect(() => {
              //   if (search){
              //     console.log(search);
              //   } 
              // }, [search]);