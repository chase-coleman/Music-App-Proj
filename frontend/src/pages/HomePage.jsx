import React, { useEffect, useState } from "react";
import { Outlet, Link, useOutletContext, useSearchParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Playlists from "../components/Playlists";
import axios from "../axios";
import PlaylistSongs from "../components/PlaylistSongs";


function HomePage() {
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [playlistView, setPlaylistView] = useState([])
  const [userPlaylists, setUserPlaylists] = useState([])

  const {userToken} = useOutletContext()
  

  // when page is mounted, run the user info function to get the current user's info
  useEffect(() => {
    getUserInfo()
    grabUserPlaylists()
  }, [])
  
  // when page is mounted, call the function to load liked songs playlist
  useEffect(() => {
    if (!userPlaylists) return;
    getInitPlaylist()
  }, [userPlaylists])

  // useEffect(() => {
  //   console.log(playlistView)
  // }, [playlistView])



    // get the user's Liked Songs playlist to display in the playlistView component
  const getInitPlaylist = () => {
    const initPlaylist = userPlaylists.filter(playlist => playlist.name === "Liked Songs")
    setPlaylistView(initPlaylist)
  }


  const getUserInfo = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/users/info/")
    setCurrentUserInfo(response.data)
  }

  // API Call to backend
  const grabUserPlaylists = async () => {
    const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/"; // url to playlist view

    // API Call to the playlists endpoint to get all the user's playlists
    const response = await axios.get(playlistUrl);

    setUserPlaylists(response.data); // set their created playlists to state so we can display it
  };

  return (
    <>
    <Navbar />
    {currentUserInfo ?
    <h3>Hi, {currentUserInfo.first_name}!</h3> : null
    }
    <div className="page-container relative border-2 flex flex-row">
      <div className="playlists w-50">
    <Playlists userPlaylists={userPlaylists} grabUserPlaylists={grabUserPlaylists} setUserPlaylists={setUserPlaylists}/>
      </div>
    <div className="songs border-2 w-full">
      {playlistView.length > 0 ? <PlaylistSongs playlistView={playlistView} /> : null

      }  
    </div>    
    </div>
    </>
  )
}

export default HomePage