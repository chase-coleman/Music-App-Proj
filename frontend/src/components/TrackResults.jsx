import { useEffect, useState } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";
import { Prev } from "react-bootstrap/esm/PageItem";

const TrackResults = ({ track, removeTrack, removeLike, getTracks, setLikedSongs, userPlaylists }) => {
  const [likeBtn, setLikeBtn] = useState(false);
  const { setMusicActive, setCurrentTrack } = useOutletContext()

  const handleLike = () => {
    if (!likeBtn){    
      setLikedSongs(prevLikes => [...prevLikes, track ])
      setLikeBtn(true)
    } else {
      setLikeBtn(false)
      removeLike(track)
    }
  }

  // if the user wants to play the song before adding it to a playlist,
  // we have to create a dictionary from it becuase the MusicPlayer 
  // component takes in a dictionary
  const playSong = () => {
    const track_to_play = {
      "spotify_id": track.id,
      "name": track.track_name,
      "track_url": track.track_url,
      "duration": track.track_duration,
      "album_name": track.album,
      "album_id": track.album_id,
      "artist_name": track.artist,
      "artist_id": track.artist_id,
      "track_img_lg": track.track_img_lg,
      "track_img_md": track.track_img_md,
      "track_img_sm": track.track_img_sm
    }
    // console.log(`Playing ${track_to_play}`)
    setCurrentTrack(track_to_play)
    setMusicActive(true)
  }

  return (
    <>
      <div className="img-container w-[100%] h-[100%]">
        <img
          className="size-10 rounded-box"
          src={track.track_img_md}
        />{" "}
        {/*Playlist Img goes here */}
      </div>
      <div className="h-[100%] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
      <div className="name-container max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis text-[clamp(0.5em,2.5vw,1em)] font-semibold">
          {track.track_name}
          </div> {/* Playlist Name goes here*/}
        <div className="artist-container w-[100%] text-[clamp(0.5em,2.5vw,.75em)]">
          {/*Playlist Description goes here*/}
          {track.artist}
        </div>
      </div>
      <button className="play-btn btn-square btn-ghost" onClick={playSong}>
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
      <button className="btn btn-square btn-ghost" onClick={handleLike}>
        <svg className={`size-[1em] ${likeBtn ? 'text-red-500' : 'text-current'} `} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="currentColor"
        viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
          </path></g></svg>
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default TrackResults;
