import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const PlaylistList = ({ playlist }) => {
  const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";
  const {userToken} = useOutletContext()
  // const userToken = localStorage.getItem("token");
  const [delBtn, setDelBtn] = useState(false);

  // by setting the state variable of delBtn inside each component that gets
  // rendered by React (each playlist) has it's own state for the button
  // I was running into issues declaring the state variable for button in
  // the Playlists page and passing it down as a prop, because all playlists
  // shared the same state. so clicking delete on one playlist, deleted them all

  useEffect(() => {
    if (delBtn){
      deletePlaylist()
      setDelBtn(false)
    }
  }, [delBtn, setDelBtn])

  const deletePlaylist = async () => {
    // get the playlist ID from the current playlist being added to a component
    const playlistID = playlist.id; 
    console.log("Deleting Playlist...");
    try {
      // do a DELETE request to remove the playlist instance from the db 
      const response = await axios.delete(`${playlistUrl}${playlistID}/`, { 
          headers: {
          Authorization: `Token ${userToken}`,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <img
          className="size-10 rounded-box"
          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        />{" "}
        {/*Playlist Img goes here */}
      </div>
      <div>
        <div>{playlist.name}</div> {/* Playlist Name goes here*/}
        <div className="text-xs uppercase font-semibold opacity-60">
          {" "}
          {/*Playlist Description goes here*/}
          {playlist.description}
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
      <button className="btn btn-square btn-ghost" onClick={() => setDelBtn(true)}>
        X
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default PlaylistList;
