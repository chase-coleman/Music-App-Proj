import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import { useOutletContext} from "react-router-dom";
import PlaylistTracks from "./PlaylistTracks";

const PlaylistSongs = ({ getTracks, removeTrack, playlistTracks, playlistView }) => {
  // const [playlistTracks, setPlaylistTracks] = useState([]);
  const { musicActive, setMusicActive, setCurrentTrack } = useOutletContext()

  useEffect(() => {
    if (!playlistView) return;
    getTracks()
  }, []);


  return (
    <>
      {playlistView ? (
        <div className="song-container w-[100%] h-[100%] flex flex-col items-center">
        <ul className="list bg-base-100 rounded-box shadow-md w-[100%] p-0">
            <div className="flex flex-col">
            <span className="text-center">
            {playlistView.name}
            </span>
            <span className="text-center text-[0.5em] text-black-500 font-light">
              {playlistView.description}
            </span>
            </div>
          {playlistTracks.map((track) => (
            <li className="list-row p-1 gap-1" key={track.id}>
              <PlaylistTracks
                track={track}
                removeTrack={removeTrack}
                playlistView={playlistView}
                getTracks={getTracks}
                />
            </li>
          ))}
        </ul>
        </div>
      ) : null}
    </>
  );
};

export default PlaylistSongs;