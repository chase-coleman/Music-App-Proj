import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

// TO DO : Create outlet context for user token

const Playlists = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const createPlaylist = async () => {
    console.log(playlistName, playlistDescription)
    const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";
    const userToken = localStorage.getItem("token");
    const playlistInfo = {
      name: playlistName,
      description: playlistDescription,
    };
    try {
      const response = await axios.post(playlistUrl, playlistInfo, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log(Request.data)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <h1>Playlists Page</h1>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
        Create New Playlist
      </button>
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
    </>
  );
};

export default Playlists;
