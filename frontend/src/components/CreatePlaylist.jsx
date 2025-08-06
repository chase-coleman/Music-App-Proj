import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { CircleX } from "lucide-react";

import { grabUserPlaylists } from "../utils/MusicUtils";
import axiosInstance from "../axios";

const CreatePlaylist = ( { setCreateBtn } ) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/"; // url to playlist view
  const {userToken, setUserPlaylists} = useOutletContext()

  const createPlaylist = async () => {
    // creating object to send to backend to create the playlist
    const playlistInfo = {
      name: playlistName,
      description: playlistDescription,
    };

    try {
      // send a POST request to backend to create a playlist model in the db
      const response = await axiosInstance.post('playlists/', playlistInfo );
      // update usersPlaylist state variable to include newly created playlist
      // also also add it to the page in the .map() function
      grabUserPlaylists(setUserPlaylists);
      setCreateBtn(false)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <div className="createplaylist-container rounded h-[30%] flex flex-col justify-center items-center ">
      <div className="w-full flex items-center justify-end">
      <button>
      <CircleX color="white"/>
      </button>
      </div>
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
      </fieldset>
        <button className="createplaylist-btn btn-neutral text-[1em] text-white w-full h-full" 
        onClick={createPlaylist}>
          Create Playlist
        </button>
      </div>
    </>
  );
};

export default CreatePlaylist;