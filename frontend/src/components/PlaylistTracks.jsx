import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";
import { SkipBack, CircleX, Play, Pause, SkipForward, ListEnd } from "lucide-react";

import { getTracks, addToQueue } from "../utils/MusicUtils";
import { HomePageContext } from "../pages/HomePage";
const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";


const PlaylistTracks = ({ track }) => {
  const {isPaused, setIsPaused, 
        setMusicActive, currentTrack, 
        player, setCurrentTrack, queue, setQueue} = useOutletContext()

  const { playlistView, removeTrack } = useContext(HomePageContext)

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
      <button onClick={() => addToQueue(track, queue, setQueue)}>
        <ListEnd color="black" />
      </button>
      <button className="btn btn-square btn-ghost" onClick={handlePlay}>
        {currentTrack?.id === track.id && !isPaused ? <Pause /> : <Play />}
      </button>
      <button className="btn btn-square btn-ghost" onClick={() => removeTrack(track.id, playlistView.name, playlistUrl)}>
        <CircleX color="black" />
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default PlaylistTracks;
