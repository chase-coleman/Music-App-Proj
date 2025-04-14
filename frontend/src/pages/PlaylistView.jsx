import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useOutletContext, useParams } from "react-router-dom";


const PlaylistView = () => {
  const singlePlaylistUrl = "http://127.0.0.1:8000/api/v1/playlists/"
  const { userToken } = useOutletContext()
  const [delBtn, setDelBtn] = useState(false)
  const { playlistname } = useParams()
  const encodedName = encodeURIComponent(playlistname)
  const [playlistSongs, setPlaylistsSongs] = useState([])

  useEffect(() => {
    getTracks()
  }, [])

  useEffect(() => {
    console.log("Songs have been updated!", playlistSongs)
  }, [playlistSongs])

  const getTracks = async () => {
    // console.log(encodedName)
    const response = await axios.get(`${singlePlaylistUrl}${encodedName}`, {
      headers: {
        Authorization: `Token ${userToken}`
      }
    })
    setPlaylistsSongs(response.data['tracks'])
  }
  

  return (
    <>
    <Navbar />
    <h1>Page for : { playlistname }</h1>
    {/* {userPlaylists.length === 0 ? (
        <h4>You don't have any playlists!</h4>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" key="">
            Playlists
          </li>
          {userPlaylists.map((playlist) => ( // map through the user's playlists 
            <li className="list-row" key={playlist.id}>
              <PlaylistList // display a component for each playlist
                playlist={playlist}
                grabUserPlaylists={grabUserPlaylists}
              />
            </li>
          ))}
        </ul>
      )} */}
    </>
  )
}

export default PlaylistView