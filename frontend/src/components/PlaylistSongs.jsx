import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import { useOutletContext} from "react-router-dom";
import PlaylistTracks from "./PlaylistTracks";

const PlaylistSongs = ({ playlistView }) => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const { musicActive, setMusicActive, setCurrentTrack } = useOutletContext()


  const singlePlaylistUrl = "http://127.0.0.1:8000/api/v1/playlists/";

  useEffect(() => {
    if (!playlistView) return;
    getTracks()
  }, []);

  // API call to backend to get all tracks belonging to currently viewed playlist
  const getTracks = async () => {
    const response = await axios.get(
      `${singlePlaylistUrl}${playlistView[0].name}`
    );
    setPlaylistTracks(response.data["tracks"]);
  };

  return (
    <>
      {playlistView ? (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            {playlistView[0].name}
          </li>
          {playlistTracks.map((track) => (
            <li className="list-row" key={track.id}>
              <PlaylistTracks
                track={track}
                playlistView={playlistView}
                getTracks={getTracks}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default PlaylistSongs;