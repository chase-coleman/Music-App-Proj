import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import axiosInstance from "./axios";
import MusicPlayer from "./components/MusicPlayer";
import SearchResults from "./components/SearchResults";
import { ListEnd } from "lucide-react"; // SYMBOL for adding song to a queue

import { getAccessToken } from "./utils/SpotifyUtils";
import Navbar from "./components/Navbar";

export default function App() {
  const [musicActive, setMusicActive] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrackID, setCurrentTrackID] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [queue, setQueue] = useState([]);

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
      <Navbar
        userToken={userToken}
        setUserToken={setUserToken}
        setMusicActive={setMusicActive}
      />
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
        }}
      />
      {userToken && accessToken && musicActive ? (
        <MusicPlayer
          isPaused={isPaused}
          player={player}
          setPlayer={setPlayer}
          setIsPaused={setIsPaused}
          currentTrack={currentTrack}
          accessToken={accessToken}
        />
      ) : null}
    </>
  );
}
