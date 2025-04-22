import { useEffect, useState } from "react";
import axios from "../axios";
import { Link, useOutletContext } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { CirclePlus } from 'lucide-react';

const AddToPlaylist = ({ playlist, grabUserPlaylists, setSelectedPlaylists }) => {

  const handleAdd = () => {
    setSelectedPlaylists(prevPlaylists => [...prevPlaylists, playlist])
  }


  return (
    <>
      <div className="img-container w-[100%] h-[100%]">
        <img
          className="size-10 rounded-box"
          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        />{" "}
        {/*Playlist Img goes here */}
      </div>

      <div className="flex items-center justify-center text-[.75em] text-container text-center ">
        <Nav.Link as={Link} to={`/playlists/${playlist.name}`}>
        <div>{playlist.name}</div> {/* Playlist Name goes here*/}
        </Nav.Link>
        <div className="text- uppercase font-semibold opacity-60">
          {/*Playlist Description goes here*/}
          {playlist.description}
        </div>
      </div>
      <button className="btn btn-square btn-ghost" onClick={handleAdd}>
        <CirclePlus color="black" size={20}/>
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default AddToPlaylist;
