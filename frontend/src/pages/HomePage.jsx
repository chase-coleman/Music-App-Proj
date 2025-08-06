import React, { useEffect, useState, createContext } from "react";
import { Outlet, Link, useOutletContext, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Playlists from "../components/Playlists";
import PlaylistSongs from "../components/PlaylistSongs";
import SearchResults from "../components/SearchResults";

import { grabUserPlaylists, getTracks } from "../utils/MusicUtils";
import ToastComponent from "../components/ToastComponent";
import axiosInstance from "../axios";

// TO DO : Find out why the getTracks function is being called twice.
// TO DO : Find out why when selecting a new playlist, the song's are updating

const singlePlaylistUrl = "http://127.0.0.1:8000/api/v1/playlists/";
const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";


export const HomePageContext = createContext({
  playlistView: '',
  setPlaylistView: () => {},
  playlistTracks: [],
  setPlaylistTracks: () => {},
  removeTrack: () => {},
  setPopupMsg: () => {},
  timerFunction: () => {},
})


const HomePage = () => {
  const [playlistView, setPlaylistView] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  // const [trackResults, setTrackResults] = useState(null);
  // const [artistResults, setArtistResults] = useState(null);
  // const [albumResults, setAlbumResults] = useState(null);
  const [notification, setNotification] = useState(false);
  const [popupMsg, setPopupMsg] = useState('')
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
    trackResults,
    setTrackResults,
    albumResults,
    setArtistResults,
    artistResults,
    setAlbumResults
  } = useOutletContext();

  // when page is mounted, grab the user's playlists 
  // grabUserPlaylists being imported 
  useEffect(() => {
    grabUserPlaylists(setUserPlaylists);
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
    const response = await axiosInstance.delete(
      `playlists/${playlistView.name}/${trackID}/`
    );

    if (response.status === 204) {
      let m = "Song removed from playlist"
      timerFunction(3000, m)
      getTracks(playlistName, setPlaylistTracks); 
    } else {
      console.error("There was an issue removing this song from your playlist!")
    }
  };

// reusable function to display different messages to the user for action results
  const timerFunction = (duration, msg) => {
    setNotification(true)
    setPopupMsg(msg)
    const timer = setTimeout(() => {
      setNotification(false)
      setPopupMsg('')
    }, duration)
  }

  return (
    <>
    <HomePageContext.Provider
    value={{
      playlistView,
      setPlaylistView,
      playlistTracks,
      setPlaylistTracks,
      removeTrack,
      setPopupMsg,
      timerFunction
    }}
    >
    {/* {!loginPage &&
      <Navbar
        setTrackResults={setTrackResults}
        setArtistResults={setArtistResults}
        setAlbumResults={setAlbumResults}
      />} */}
      <div className="page-container relative flex flex-wrap justify-around h-[calc(100vh-104px)] overflow-y-auto">

        {/* users playlists */}
        <div className="playlists-homepage-container w-32 border-1 h-full overflow-y-auto">
          <Playlists />
        </div>

        {/* Songs within the selected playlist */}
        <div className="songs-homepage-container border-2 !w-120 h-full overflow-y-auto">
          {playlistView && (
            <PlaylistSongs />
          )}
        </div>

        {/* search results */}
        <div className="searchresults-homepage-container w-64 h-full border-4 overflow-y-auto">
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
      {notification ? (
        <div className="absolute left-5 bottom-5 z-50">
        <ToastComponent msg={popupMsg} />
        </div>
      ) : null}
      </HomePageContext.Provider>
    </>
  );
};

export default HomePage;
