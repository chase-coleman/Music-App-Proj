import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const AlbumResults = ({ album }) => {
  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";
  const {userToken} = useOutletContext()
  // const userToken = localStorage.getItem("token");
  const [likeBtn, setLikeBtn] = useState(false);


  useEffect(() => {
    console.log("Album will be added to your liked albums!")
    likeAlbum()
  }, [likeBtn, setLikeBtn])

  const likeAlbum = () => {
    console.log("like button has been pressed!")
  }

  return (
    <>
      <div>
        <img
          className="size-10 rounded-box"
          src={album.album_img_lg}
        />{" "}
        {/*Playlist Img goes here */}
      </div>
      <div>
        <div>{album.album_name}</div> {/* Playlist Name goes here*/}
        <div className="text-xs uppercase font-semibold opacity-60">
          {" "}
          {/*Playlist Description goes here*/}
          {album.artist}
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
      <button className="btn btn-square btn-ghost">
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default AlbumResults;
