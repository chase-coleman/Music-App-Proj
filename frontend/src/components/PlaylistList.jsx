import { useContext, useEffect, useState } from "react";
import { CircleX, Play, Pencil, ListVideo } from 'lucide-react';
import { HomePageContext } from "../pages/HomePage";
import { getTracks } from "../utils/MusicUtils";

const PlaylistList = ({ playlist, editPlaylist, deletePlaylist }) => {
  const { setPlaylistView, setPlaylistTracks } = useContext(HomePageContext)
  const [delBtn, setDelBtn] = useState(false);

  /*
by setting the state variable of delBtn inside each component that gets
rendered by React (each playlist) has it's own state for the button
I was running into issues declaring the state variable for button in
the Playlists page and passing it down as a prop, because all playlists
shared the same state. so clicking delete on one playlist, deleted them all
*/

  useEffect(() => {
    if (delBtn){ // if delBtn is true
      deletePlaylist(playlist.id) // delete the playlist
      setDelBtn(false) // set delBtn back to false
    }
  }, [delBtn, setDelBtn])

  const handleEdit = () => {
    editPlaylist(playlist)
  }

  // when a new playlist is selected to be viewed, update the playlistTracks state to reflect the proper playlist
  // via getTracks
  const handlePlaylistViewChange = (playlist) => {
    setPlaylistView(playlist)
    getTracks(playlist.name, setPlaylistTracks)
  }


  return (
    <>
      <div className="img-container w-[100%] h-[100%]">
        <ListVideo color="black" size={30}/>
        {/*Playlist Img goes here */}
      </div>

      <div className="text-container text-center text-[.75em] flex flex-col justify-center">
        <button onClick={() => handlePlaylistViewChange(playlist)}>{playlist.name}</button> {/* Playlist Name goes here*/}
        <div className="uppercase font-semibold opacity-60 text-[0.5em] overflow-hidden text-ellipsis">          {/*Playlist Description goes here*/}
          {playlist.description}
        </div>
      </div>
      <button className="btn w-[10%] btn-square btn-ghost p-0">
        <Play size={12}/>
      </button>
      <button className="btn w-[10%] btn-square btn-ghost p-0" onClick={handleEdit}>
        <Pencil size={12} />
      </button>
      {playlist.name === "Liked Songs" ? 
      null
      :
      <button className="btn w-[10%] btn-square btn-ghost p-0" onClick={() => setDelBtn(true)}>
        <CircleX size={12} color="black"/>
      </button>
      }
    </>
  );
};

export default PlaylistList;
