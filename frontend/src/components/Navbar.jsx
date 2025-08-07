/*
https://reactrouter.com/6.30.0/hooks/use-navigate#optionsreplace
 - useNavigate doc
*/
import { House, Settings, LogOut, CircleUser } from "lucide-react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "../axios";
import { useContext, useEffect, useState } from "react";
import App, { AppContext } from "../App";
import axiosInstance from "../axios";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchUrl = "http://127.0.0.1:8000/api/v1/auth/spotify/callback/";

  const { setTrackResults, setArtistResults, setAlbumResults, userToken, setUserToken, setMusicActive } = useContext(AppContext)

  const handleSearch = async () => {
    inputSearch();
  };

  const inputSearch = async () => {
    try {
      const response = await axios.get(searchUrl + search);
      console.log(response.data)
      const tracks = response.data[0]["tracks"];
      const artists = response.data[0]["artists"];
      const albums = response.data[0]["albums"];
      setTrackResults(tracks);
      setArtistResults(artists);
      setAlbumResults(albums);
      setSearch("");
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const userLogout = async () => {
    try {
      // send a POST request to the logout endpoint (which will delete the user' auth token from the db)
      const response = await axiosInstance.post("users/logout/");

      localStorage.removeItem("token"); // remove the deleted token from the local storage
      console.log("user logged out!", userToken);
      setUserToken(null);
      setMusicActive(false);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="navbar p-0 shadow-sm fixed top-0 left-0 w-full z-50">
      {userToken ? (
        <>
          {/* Left side nav items */}
          <div className="flex-1 flex flex-row gap-5 items-center justify-center">
            <Nav.Link as={Link} to="/events" className="events-link text-white">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/account" className="account-link text-white">
            Account
            </Nav.Link>
          </div>
          {/* Right side nav items */}
          <div className="flex justify-end pr-2 gap-2">
            <div className="flex items-center">
              <Nav.Link as={Link} to="/home">
                <House
                  className="home-btn"
                  color="rgb(250, 245, 230)"
                  size={35}
                />
              </Nav.Link>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered !w-[50%] md:w-auto"
            />
            <button
              className="search-btn !bg-whitebtn-neutral !w-[5rem] !bg-white !p-0"
              onClick={handleSearch}
            >
              Search
            </button>
            <div className="dropdown dropdown-end rounded">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost rounded btn-circle avatar p-0"
              >
                <div className="w-full  rounded overflow-hidden p-0">
                  <CircleUser color="white" size={40}/>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <div className="flex gap-1">
                  <Settings size={20} />
                  <li>
                    <Nav.Link as={Link} to="/settings" className="text-black">
                      Settings
                    </Nav.Link>
                  </li>
                </div>
                <div className="flex items-center">
                  <LogOut size={17}/>
                <li>
                  <button className="logoutbutton" onClick={userLogout}>Logout</button>
                </li>
                </div>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* If user is not logged in */}
          <div className="flex-1 flex items-center justify-center">
            <Nav.Link as={Link} to="/">
              <House className="home-btn" color="rgb(250, 245, 230)" />
            </Nav.Link>
          </div>
          <div className="flex gap-2"></div>
        </>
      )}
    </div>
  );
};

export default Navbar;
