import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";
import { CircleX } from "lucide-react";

// TO DO : Make it so a user can remove the description from a playlist

const EditPlaylist = ( { submitEdits, setShowEditInfo } ) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/"; // url to playlist view
  const {userToken} = useOutletContext()

  const infoToEdit = async () => {
    const editedData = {
      name: playlistName,
      description: playlistDescription
    }
    submitEdits(editedData)
  }

  const cancelEdit = () => {
    setShowEditInfo(false)
  }


  return (
    <>
    <div className="createplaylist-container rounded h-[30%] flex flex-col justify-center items-center ">
      <div className="w-full flex items-center justify-end">
      <button onClick={cancelEdit}>
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
        onClick={infoToEdit}>
          Edit Playlist
        </button>
      </div>
    </>
  );
};

export default EditPlaylist;