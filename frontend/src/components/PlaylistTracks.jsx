import { useEffect, useState } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";

const PlaylistTracks = ({ track, playlistView, getTracks }) => {
  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/"
  const {userToken, musicActive, setMusicActive, setCurrentTrack} = useOutletContext()
  const [likeBtn, setLikeBtn] = useState(false);

  const removeTrack = async () => {

    // do a DELETE request to the Playlist endpoint for the viewed playlist and seleted song
   const response = await axios.delete(`${playlistUrl}${playlistView[0].name}/${track.id}/`)

    if (response.status === 204){ // if song has been removed from the playlist successfully,
      alert('Song removed from the playlist!') // alert the user
      getTracks() // call the function to load the playlist's tracks which will update the page with the song now removed
    }
  }

  const handlePlay = () => {
    setCurrentTrack(track);
    setMusicActive(true);
  };


  return (
    <>
      <div className="img-container w-[100%] h-[100%]">
        <img
          className="size-12 rounded-box"
          src={track.track_img_md}
        />
        {/*Playlist Img goes here */}
      </div>
      <div className="h-[100%] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
      <div className="name-container h-[100%] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
        <div className="text-[clamp(0.5em,2.5vw,1em)] font-semibold">
          {track.name}
          </div> {/* Playlist Name goes here*/}
        <div className="artist-container w-[100%]">
          {/*Playlist Description goes here*/}
          <div className="text-[clamp(0.5em,2.5vw,.75em)]">
          {track.artist_name}
        </div>
        </div>
        </div>
        <div>{track.album}</div>
        <div className="duration-container w-[100%]">
        <div className="text-[clamp(0.5em,2.5vw,.75em)]">
          {track.duration}
        </div>
      </div>
      </div>
      <button className="btn btn-square btn-ghost" onClick={handlePlay}>
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
