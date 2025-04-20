import { useEffect, useState } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";
import { SkipBack, CircleX, Play, Pause, SkipForward } from "lucide-react";

const PlaylistTracks = ({ track, playlistView, removeTrack, getTracks }) => {
  // const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/"
  const {userToken, musicActive, isPaused, setIsPaused, 
    currentTrackID, setMusicActive, currentTrack, player, setCurrentTrack} = useOutletContext()
  const [likeBtn, setLikeBtn] = useState(false);


  const handlePlay = async () => {
    if (!isPaused){
      await player.pause()
      setIsPaused(true)
    }
    else {
      setCurrentTrack(track);
      setMusicActive(true);
      await player.resume()
      setIsPaused(false)
    }
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
        {currentTrack?.id === track.id && !isPaused ? <Pause /> : <Play />}
      </button>
      <button className="btn btn-square btn-ghost" onClick={() => removeTrack(track.id)}>
        <CircleX color="black" />
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default PlaylistTracks;
