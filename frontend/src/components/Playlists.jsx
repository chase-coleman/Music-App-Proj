import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import PlaylistList from "../components/PlaylistList";
import { useOutletContext } from "react-router-dom";
import CreatePlaylist from "./CreatePlaylist";
// import deletePlaylist from "../utilities/deleteplaylist";

// TO DO : create loading state variable to display while the API makes it's call
// TO DO : create a button on the page so a user can create a new playlist, and when the button is clicked,
//         a popup opens that asks for the basic playlists information

const Playlists = ( {grabUserPlaylists, setPlaylistView} ) => {
  const [createBtn, setCreateBtn] = useState(false);
  const { userPlaylists, setUserPlaylists } = useOutletContext() 

  const handlePlaylistCreation = () => {
    setCreateBtn(true);
  };

  return (
    <>
    <div>
      <div className="createplaylist-btn flex justify-center mb-[1em]">
    <button className="playlist-btn bg-white" onClick={handlePlaylistCreation}>
      Create New Playlist
    </button>
    </div>
    {createBtn ? 
    <div className='search-results z-50 fixed inset-0 flex items-center justify-center'>
    <CreatePlaylist setCreateBtn={setCreateBtn} grabUserPlaylists={grabUserPlaylists}/>
    </div>
    : null
    }

      {!userPlaylists ? (
        <h4>You don't have any playlists!</h4>
      ) : (
        <div className="playlist-container w-[100%] h-[100%] flex flex-col justify-center items-center">
        <ul className="list bg-base-100 rounded-box shadow-md w-[100%] p-0">
          {userPlaylists.map((playlist) => ( // map through the user's playlists 
            <li className="list-row p-1 gap-1" key={playlist.id}>
              <PlaylistList // display a component for each playlist
                playlist={playlist}
                setPlaylistView={setPlaylistView}
                grabUserPlaylists={grabUserPlaylists}
              />
            </li>
          ))}
        </ul>
        </div>
      )}
      </div>
    </>
  );
};

export default Playlists;
