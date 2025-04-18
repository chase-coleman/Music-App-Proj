import { useEffect, useState } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";

const TrackResults = ({ track }) => {
  const trackUrl = "http://127.0.0.1:8000/api/v1/tracks/"; // API endopint for working with tracks
  // const userToken = localStorage.getItem("token");
  const [likeBtn, setLikeBtn] = useState(false);


  const likeSong = async () => {

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
    }

    try { 
      console.log("song being liked!")
      const response = await axios.post(trackUrl, track_to_add)
      alert(response.data['Message']) // alert the user that the song has been added to their liked songs 
  } catch (error){
    console.error("Error:", error)
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
        <div>{track.track_name}</div> {/* Playlist Name goes here*/}
        <div className="text-xs uppercase font-semibold opacity-60">
          {" "}
          {/*Playlist Description goes here*/}
          {track.artist}
        </div>
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
      <button className="btn btn-square btn-ghost" onClick={likeSong}>
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
          </path></g></svg>
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default TrackResults;
