import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";


const CreatePlaylist = ( { grabUserPlaylists, setCreateBtn } ) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/"; // url to playlist view
  const {userToken} = useOutletContext()

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
      grabUserPlaylists();
      setCreateBtn(false)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <div className="createplaylist-container flex flex-col justify-center items-center bg-black">
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
      </div>
    </>
  );
};

export default CreatePlaylist;