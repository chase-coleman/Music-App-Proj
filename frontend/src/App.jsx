import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import axiosInstance from "./axios";
import MusicPlayer from "./components/MusicPlayer";
import { getAccessToken } from "./utils/SpotifyUtils";
import Navbar from "./components/Navbar";

export const AppContext = createContext({
  queue: [],
  setQueue: () => {},
  userToken: null,
  setUserToken: () => {},
  artistResults: [],
  setArtistResults: () => {},
  albumResults: [],
  setAlbumResults: () => {},
  trackResults: [],
  setTrackResults: () => {},
  currentTrack: null,
  setCurrentTrack: () => {}
})

export default function App() {
  const [musicActive, setMusicActive] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrackID, setCurrentTrackID] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [queue, setQueue] = useState([]);
  const [trackResults, setTrackResults] = useState(null);
  const [artistResults, setArtistResults] = useState(null);
  const [albumResults, setAlbumResults] = useState(null);

  // when a user logs in, set their token to localstorage and call the func to get an access token
  useEffect(() => {
    if (!userToken) {
      console.log("no user token!");
    }
    if (userToken) {
      localStorage.setItem("token", userToken);
      getAccessToken(setAccessToken);
      getUserInfo();
    }
  }, [userToken]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("users/info/");
      setCurrentUserInfo(response.data);
    } catch (error) {
      console.error(
        "Error getting user info:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (!currentTrack) return;
    setCurrentTrackID(currentTrack.id);
  }, [currentTrack]);

  useEffect(() => {
    if (musicActive) {
      console.log("musicActive triggered");
    }
  }, [musicActive]);

  return (
    <>
    <AppContext.Provider
    value={{
      queue,
      setQueue,
      userToken,
      currentTrack,
      setCurrentTrack,
      setUserToken,
      artistResults,
      setArtistResults,
      albumResults,
      setAlbumResults,
      trackResults,
      setTrackResults,
      setMusicActive
    }} >
      <Navbar />
      <Outlet
        context={{
          userToken,
          setUserToken,
          accessToken,
          currentUserInfo,
          isPaused,
          setIsPaused,
          currentTrackID,
          player,
          getUserInfo,
          musicActive,
          setMusicActive,
          currentTrack,
          setCurrentTrack,
          userPlaylists,
          setUserPlaylists,
          queue,
          setQueue,
          trackResults,
          setTrackResults,
          albumResults,
          setAlbumResults,
          artistResults,
          setArtistResults
        }}
      />
      {userToken && accessToken && musicActive ? (
        <MusicPlayer
          isPaused={isPaused}
          player={player}
          setPlayer={setPlayer}
          setIsPaused={setIsPaused}
          accessToken={accessToken}
          musicActive={musicActive}
          setMusicActive={setMusicActive}
        />
      ) : null}
      </AppContext.Provider>
    </>
  );
}
