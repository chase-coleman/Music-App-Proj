import React, { useEffect, useState } from "react";
import { Outlet, Link, useOutletContext, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Playlists from "../components/Playlists";
import axios from "../axios";
import PlaylistSongs from "../components/PlaylistSongs";
import SearchResults from "../components/SearchResults";

/*
https://api.reactrouter.com/v7/functions/react_router.useLocation.html
react router's useLocation function
*/

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
  const singlePlaylistUrl = "http://127.0.0.1:8000/api/v1/playlists/";
  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";

  // const date = new Date();
  // const month = date.getMonth()+1;
  // const day = date.getDate();
  // const year = date.getFullYear();

  // when page is mounted, run the user info function to get the current user's info
  useEffect(() => {
    grabUserPlaylists();
  }, []);

  // when page is mounted, call the function to load liked songs playlist
  useEffect(() => {
    if (!userPlaylists) return;
    getInitPlaylist();
  }, [userPlaylists]);

  // get the user's Liked Songs playlist to display in the playlistView component
  const getInitPlaylist = () => {
    const initPlaylist = userPlaylists.find(
      (playlist) => playlist.name === "Liked Songs"
    );
    setPlaylistView(initPlaylist);
  };

  // API Call to backend
  const grabUserPlaylists = async () => {
    // API Call to the playlists endpoint to get all the user's playlists
    const response = await axios.get(playlistUrl);

    // set their created playlists to state so we can display it
    setUserPlaylists(response.data);
  };

  useEffect(() => {
    if (playlistView) {
      getTracks();
    }
  }, [playlistView]);


  // API call to backend to grab tracks from a specific playlist
  const getTracks = async () => {
    if (playlistView) {
      const response = await axios.get(
        `${singlePlaylistUrl}${playlistView.name}`
      );
      setPlaylistTracks(response.data.tracks);
    }
  };

  // API call to a specific playlist's endpoint to remove a song from the playlist
  const removeTrack = async (trackID) => {
    // do a DELETE request to the Playlist endpoint for the viewed playlist and seleted song
    const response = await axios.delete(
      `${playlistUrl}${playlistView.name}/${trackID}/`
    );

    if (response.status === 204) {
      // if song has been removed from the playlist successfully,
      setNotifyRemoved(true)
      const timer = setTimeout(() => {
        setNotifyRemoved(false)
      }, 3000)
      getTracks(); // call the function to load the playlist's tracks which will update the page with the song now removed
    }
  };


  return (
    <>
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
          <Playlists
            userPlaylists={userPlaylists}
            grabUserPlaylists={grabUserPlaylists}
            setPlaylistView={setPlaylistView}
            setUserPlaylists={setUserPlaylists}
          />
        </div>

        {/* Songs within the selected playlist */}
        <div className="songs-homepage-container border-2 w-[50vw] h-[calc(100vh-104px)] overflow-y-auto">
          {playlistView && (
            <PlaylistSongs
              removeTrack={removeTrack}
              getTracks={getTracks}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              playlistView={playlistView}
              playlistTracks={playlistTracks}
            />
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
    </>
  );
};

export default HomePage;
