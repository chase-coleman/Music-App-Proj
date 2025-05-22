import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import PlaylistList from "../components/PlaylistList";
import { useOutletContext } from "react-router-dom";
import CreatePlaylist from "./CreatePlaylist";
import EditPlaylist from "../components/EditPlaylist";
import { DotStream } from "ldrs/react";
import "ldrs/react/DotStream.css";
import { HomePageContext } from "../pages/HomePage";
import { grabUserPlaylists } from "../utils/MusicUtils";
const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";

// TO DO : create loading state variable to display while the API makes it's call

const Playlists = () => {
  const [createBtn, setCreateBtn] = useState(false);
  const [editInfo, setShowEditInfo] = useState(false);
  const [playlistToEdit, setPlaylistToEdit] = useState(null);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);

  const { userPlaylists, setUserPlaylists } = useOutletContext();
  const { setPlaylistView } = useContext(HomePageContext)
  const handlePlaylistCreation = () => {
    setCreateBtn(true);
  };

  const editPlaylist = async (playlist) => {
    setPlaylistToEdit(playlist);
    setShowEditInfo(true);
  };

  const submitEdits = async (editedData) => {
    const filteredData = Object.fromEntries(
      Object.entries(editedData).filter(([key, value]) => value.length > 0)
    );
    const response = await axios.put(
      `${playlistUrl}${playlistToEdit.id}/`,
      filteredData
    );
    if (response.status === 200) {
      setShowEditConfirmation(true);
      const timer = setTimeout(() => {
        setShowEditConfirmation(false);
      }, 2000);
      grabUserPlaylists(playlistUrl, setUserPlaylists)
    }
    setShowEditInfo(false)
  };

  return (
    <>
      <div>
        <div className="createplaylist-btn flex justify-center mb-[1em]">
          <button className="playlist-btn " onClick={handlePlaylistCreation}>
            Create New Playlist
          </button>
        </div>
        {createBtn ? (
          <div className="search-results z-50 fixed inset-0 flex items-center justify-center">
            <CreatePlaylist
              setCreateBtn={setCreateBtn}
            />
          </div>
        ) : null}

        {!userPlaylists ? (
          <h4>You don't have any playlists!</h4>
        ) : (
          <div className="playlist-container w-[100%] h-[100%] flex flex-col justify-center items-center">
            <ul className="list bg-base-100 rounded-box shadow-md w-[100%] p-0">
              {userPlaylists.map(
                (
                  playlist // map through the user's playlists
                ) => (
                  <li className="list-row p-1 gap-1" key={playlist.id}>
                    <PlaylistList // display a component for each playlist
                      playlist={playlist}
                      editPlaylist={editPlaylist}
                      submitEdits={submitEdits}
                      setPlaylistView={setPlaylistView}
                      grabUserPlaylists={grabUserPlaylists}
                    />
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
      {editInfo ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <EditPlaylist 
          setShowEditInfo={setShowEditInfo}
          submitEdits={submitEdits} />
        </div>
      ) : null}
      {showEditConfirmation ? (
        <div className="absolute left-5 bottom-5 z-50">
          <div className="updated-alert z-50 flex justify-center items-center rounded-xl flex-col p-1 text-center text-[0.65em]">
            <span>Playlist updated!</span>
            <DotStream size="30" speed="3" color="black" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Playlists;
