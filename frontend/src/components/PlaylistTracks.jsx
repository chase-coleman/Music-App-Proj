import { useEffect, useState } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";

const PlaylistTracks = ({ track, playlist_name, getTracks }) => {
  // const trackUrl = "http://127.0.0.1:8000/api/v1/tracks/"; // API endopint for working with tracks
  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/"
  const {userToken} = useOutletContext()
  // const userToken = localStorage.getItem("token");
  const [likeBtn, setLikeBtn] = useState(false);

  // by setting the state variable of delBtn inside each component that gets
  // rendered by React (each playlist) has it's own state for the button
  // I was running into issues declaring the state variable for button in
  // the Playlists page and passing it down as a prop, because all playlists
  // shared the same state. so clicking delete on one playlist, deleted them all


  const removeTrack = async () => {
   const response = await axios.delete(`${playlistUrl}${playlist_name}/${track.id}/`)

    if (response.status === 204){
      alert('Song removed from the playlist!')
      getTracks()
  }
}


  return (
    <>
      <div>
        <img
          className="size-10 rounded-box"
          src={track.track_img_md}
        />{" "}
        {/*Playlist Img goes here */}
      </div>
      <div>
        <div>{track.name}</div> {/* Playlist Name goes here*/}
        <div className="text-xs uppercase font-semibold opacity-60">
          {" "}
          {/*Playlist Description goes here*/}
          {track.artist_name}
        </div>
        <div>{track.album}</div>
        <div>{track.duration}</div>
      </div>
      <button className="btn btn-square btn-ghost">
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>
      <button className="btn btn-square btn-ghost" onClick={removeTrack}>
        X
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default PlaylistTracks;
