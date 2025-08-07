import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../axios";
import TrackResults from "../components/TrackResults";
import { CircleX } from "lucide-react";
import axiosInstance from "../axios";

const SearchResults = ( { tracks, setTrackResults, userPlaylists, removeTrack, getTracks } ) => {
  // likedSongs is a list of objects containing any liked songs that the user has 
  // liked from their search results
  const [likedSongs, setLikedSongs] = useState([]);
  const trackUrl = "http://127.0.0.1:8000/api/v1/tracks/"; // API endopint for working with tracks


  useEffect(() => {
    if (likedSongs.length === 0) return;
      // add the latest liked song to the playlist songs
      likeSong(likedSongs[likedSongs.length - 1]) ;
  }, [likedSongs]);

  // removes the search results from the page
  const removePopup = () => {
    setTrackResults(null);
  }

  // a use can unlike a song and it'll be removed from the playlist's track
  const removeLike = (track) => {
    setLikedSongs(likedSongs.filter(song => song.id != track.id));
    removeTrack(track.id);
  }


  const likeSong = async (track) => {
    // create an object to send to the backend in proper format
    const track_to_add = {
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
    };
    try { 
      console.log("song being liked!");
      const response = await axiosInstance.post("tracks/", track_to_add);
  } catch (error){
    console.error("Error:", error)
  };
};

  return (
    <>

        {tracks ? (
          <div className="song-container w-[100%] h-[100%] flex flex-col items-center">
          <ul className="list bg-base-100 rounded-box shadow-md w-[100%] p-0 ">
            <div className="flex flex-row justify-center items-center relative p-0">
            <h6>Songs</h6>
            <div className="btn-container absolute top-0 right-2">
            <button onClick={removePopup}>
              <CircleX size={20}/>
            </button>
            </div>
            </div>
            {tracks.map((track) => (
              <li className="list-row p-1 gap-1" key={track.id}>
                <TrackResults 
                setLikedSongs={setLikedSongs}
                removeTrack={removeTrack}
                userPlaylists={userPlaylists} 
                getTracks={getTracks}
                removeLike={removeLike}
                track={track} />
              </li>
            ))}
          </ul>
          </div>
        ) : (
          <h4>Not Loaded Yet!</h4>
        )}

    </>
  );
};

export default SearchResults;
