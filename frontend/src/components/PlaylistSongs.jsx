import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import { useOutletContext} from "react-router-dom";
import PlaylistTracks from "./PlaylistTracks";

const PlaylistSongs = ({ getTracks, removeTrack, playlistTracks, playlistView }) => {
  // const [playlistTracks, setPlaylistTracks] = useState([]);
  const { musicActive, setMusicActive, setCurrentTrack } = useOutletContext()


  // const singlePlaylistUrl = "http://127.0.0.1:8000/api/v1/playlists/";

  useEffect(() => {
    if (!playlistView) return;
    getTracks()
  }, []);

  // API call to backend to get all tracks belonging to currently viewed playlist
  // const getTracks = async () => {
  //   const response = await axios.get(
  //     `${singlePlaylistUrl}${playlistView[0].name}`
  //   );
  //   setPlaylistTracks(response.data["tracks"]);
  // };

  return (
    <>
      {playlistView ? (
        <div className="song-container w-[100%] h-[100%] flex flex-col items-center">
        <ul className="list bg-base-100 rounded-box shadow-md w-[100%] p-0">
            <h6 className="text-center">
            {playlistView[0].name}
            </h6>
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