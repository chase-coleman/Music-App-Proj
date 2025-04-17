import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import { useOutletContext, useParams } from "react-router-dom";
import PlaylistTracks from "../components/PlaylistTracks";


const PlaylistView = () => {
  const singlePlaylistUrl = "http://127.0.0.1:8000/api/v1/playlists/"
  const { userToken } = useOutletContext()
  const [delBtn, setDelBtn] = useState(false)
  const { playlist_name } = useParams()
  const encodedName = encodeURIComponent(playlist_name)
  const [playlistTracks, setPlaylistTracks] = useState(null)

  useEffect(() => {
    getTracks()
  }, [])

  useEffect(() => {
    console.log("Songs have been updated!", playlistTracks)
  }, [playlistTracks])

  // API Call to get all songs within the viewed playlist
  const getTracks = async () => {
    const response = await axios.get(`${singlePlaylistUrl}${encodedName}`)
    setPlaylistTracks(response.data['tracks'])
  }
  

  return (
    <>
    <Navbar />
    <h1>Page for : { playlist_name }</h1>
    {playlistTracks.length === 0 ? (
        <h4>You don't have any songs in this playlist!</h4>
      ) : (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" key="">
            Playlists
          </li>
          {playlistTracks.map((track) => ( // map through the user's playlists 
            <li className="list-row" key={track.id}>
              <PlaylistTracks // display a component for each playlist
                track={track}
                playlist_name={playlist_name}
                getTracks={getTracks}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default PlaylistView