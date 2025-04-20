import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import axios from './axios'
import MusicPlayer from './components/MusicPlayer';
import SearchResults from './components/SearchResults';


export default function App() {
  const [musicActive, setMusicActive] = useState(false)
  const [userToken, setUserToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [userPlaylists, setUserPlaylists] = useState(null)

  const spotifyAccessUrl = "http://127.0.0.1:8000/api/v1/auth/spotify/callback/"

  // when a user logs in, set their token to localstorage and call the func to get an access token
  useEffect(() => {
    if (userToken){
      localStorage.setItem("token", userToken)
      console.log("setting userToken:", userToken)
      get_access_token()
    }
  }, [userToken]);

  // get a spotify access token via the backend & set it to state 
  const get_access_token = async () => {
    const response = await axios.get(spotifyAccessUrl)
    const spotifyToken = response.data.access_token
    setAccessToken(spotifyToken)
  }

  useEffect(() => {
    if (!currentTrack) return;
    // console.log(currentTrack)
  }, [currentTrack])


  useEffect(() => {
    if (musicActive){
      console.log("musicActive triggered")
    }
  }, [musicActive])



  return (
      <>
      <Outlet context={
        {userToken, setUserToken, 
        accessToken, 
        musicActive, setMusicActive, 
        currentTrack, setCurrentTrack,
        userPlaylists, setUserPlaylists
        }}/>
      {userToken && accessToken && musicActive ? (<MusicPlayer currentTrack={currentTrack} accessToken={accessToken}/>) : (null)}
      </>
)
};
