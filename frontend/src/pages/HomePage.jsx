import React, { useEffect, useState, createContext } from "react";
import { Outlet, Link, useOutletContext, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Playlists from "../components/Playlists";
import axios from "../axios";
import PlaylistSongs from "../components/PlaylistSongs";
import SearchResults from "../components/SearchResults";

import { grabUserPlaylists, getTracks } from "../utils/MusicUtils";

// TO DO : Find out why the getTracks function is being called twice.
// TO DO : 

const singlePlaylistUrl = "http://127.0.0.1:8000/api/v1/playlists/";
const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";


export const HomePageContext = createContext({
  playlistView: '',
  setPlaylistView: () => {},
  playlistTracks: [],
  setPlaylistTracks: () => {},
  removeTrack: () => {},
})


const HomePage = () => {
  const [playlistView, setPlaylistView] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [trackResults, setTrackResults] = useState(null);
  const [artistResults, setArtistResults] = useState(null);
  const [albumResults, setAlbumResults] = useState(null);
  const [notifyRemoved, setNotifyRemoved] = useState(false);
  const location = useLocation();
  const loginPage = location.pathname === "/login";

  const {
    userToken,
    currentTrack,
    userPlaylists,
    isPaused,
    setIsPaused,
    setUserPlaylists,
    currentUserInfo,
  } = useOutletContext();

  // when page is mounted, grab the user's playlists 
  // grabUserPlaylists being imported 
  useEffect(() => {
    grabUserPlaylists(playlistUrl, setUserPlaylists);
  }, []);

  // when page is mounted, call the function to load liked songs playlist
  useEffect(() => {
    if (!userPlaylists) return;
    const initPlaylist = userPlaylists.find(
      (playlist) => playlist.name === "Liked Songs"
    );
    if (initPlaylist){
      setPlaylistView(initPlaylist);
      getTracks(initPlaylist.name, setPlaylistTracks) // in the MusicUtils file
    }
  }, [userPlaylists]);


  /* API call using a DELETE method to remove the track from the currently viewed playlist
    set deleted notification for user in the setTimeout
    recall the getTracks function to update the playlist tracks */
  const removeTrack = async (trackID, playlistName, playlistUrl) => {
    const response = await axios.delete(
      `${playlistUrl}${playlistView.name}/${trackID}/`
    );

    if (response.status === 204) {
      setNotifyRemoved(true)
      const timer = setTimeout(() => {
        setNotifyRemoved(false)
      }, 3000)
      getTracks(playlistName, setPlaylistTracks); 
    } else {
      console.error("There was an issue removing this song from your playlist!")
    }
  };


  return (
    <>
    <HomePageContext.Provider
    value={{
      playlistView,
      setPlaylistView,
      playlistTracks,
      setPlaylistTracks,
      removeTrack,
    }}
    >
    {!loginPage &&
      <Navbar
        setTrackResults={setTrackResults}
        setArtistResults={setArtistResults}
        setAlbumResults={setAlbumResults}
      />}
      {currentUserInfo ? (
        <div className="flex items-center justify-center">
          <h3 className="welcome-text !text-[1em]">
            Welcome, {currentUserInfo.first_name}!
          </h3>
          {/* <h6>{(`${day} ${month}, ${year}`).toString()}</h6> */}
        </div>
      ) : null}
      <div className="page-container relative flex flex-row justify-center gap-2 h-screen overflow-hidden">
        {/* users playlists */}
        <div className="playlists-homepage-container w-[20vw] border-1 h-[calc(100vh-104px)] overflow-y-auto">
          <Playlists />
        </div>

        {/* Songs within the selected playlist */}
        <div className="songs-homepage-container border-2 w-[50vw] h-[calc(100vh-104px)] overflow-y-auto">
          {playlistView && (
            <PlaylistSongs />
          )}
        </div>

        {/* search results */}
        <div className="searchresults-homepage-container w-[25vw] h-[calc(100vh-104px)] overflow-y-auto">
          {trackResults && (
            <SearchResults
              tracks={trackResults}
              removeTrack={removeTrack}
              setTrackResults={setTrackResults}
              getTracks={getTracks}
              userPlaylists={userPlaylists}
            />
          )}
        </div>
      </div>
      {notifyRemoved ? (
        <div className="absolute left-5 bottom-5 z-50">
          <div className="removed-alert z-50 flex rounded-xl flex-col p-1 text-center text-[0.65em]">
            <span>Song removed from playlist</span>
          </div>
        </div>
      ) : null}
      </HomePageContext.Provider>
    </>
  );
};

export default HomePage;
