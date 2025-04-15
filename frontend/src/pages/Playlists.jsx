import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import PlaylistList from "../components/PlaylistList";
import { useOutletContext } from "react-router-dom";
// import deletePlaylist from "../utilities/deleteplaylist";

// TO DO : create loading state variable to display while the API makes it's call
// TO DO : create a button on the page so a user can create a new playlist, and when the button is clicked,
//         a popup opens that asks for the basic playlists information

const Playlists = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);
  const {userToken} = useOutletContext()

  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/"; // url to playlist view

  // grab all the user's playlists upon the page being rendered
  useEffect(() => {
    // call the GET endpoint for user's playlists
    grabUserPlaylists();
  }, []);


  // API Call to backend
  const grabUserPlaylists = async () => {
    // API Call to the playlists endpoint to get all the user's playlists
    const response = await axios.get(playlistUrl);

    setUserPlaylists(response.data); // set their created playlists to state so we can display it
  };

  const createPlaylist = async () => {

    // creating object to send to backend to create the playlist
    const playlistInfo = {
      name: playlistName,
      description: playlistDescription,
    };
    
    try {
      
      // send a POST request to backend to create a playlist model in the db
      const response = await axios.post(playlistUrl, playlistInfo, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      // update usersPlaylist state variable to include newly created playlist
      // also also add it to the page in the .map() function
      grabUserPlaylists()
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <h1>Playlists Page</h1>
      <fieldset className="fieldset">
        <input
          className="input"
          onChange={(e) => setPlaylistName(e.target.value)}
          value={playlistName}
          type="text"
          placeholder="Playlist Name"
        />
        <input
          className="input"
          onChange={(e) => setPlaylistDescription(e.target.value)}
          value={playlistDescription}
          type="text"
          placeholder="Playlist Description"
        />
        <button className="btn btn-neutral w-[25vw]" onClick={createPlaylist}>
          Create Playlist
        </button>
      </fieldset>
      {userPlaylists.length === 0 ? (
        <h4>You don't have any playlists!</h4>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" key="">
            Playlists
          </li>
          {userPlaylists.map((playlist) => ( // map through the user's playlists 
            <li className="list-row" key={playlist.id}>
              <PlaylistList // display a component for each playlist
                playlist={playlist}
                grabUserPlaylists={grabUserPlaylists}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Playlists;
