import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "../axios";
import TrackResults from "../components/TrackResults";
import ArtistResults from "../components/ArtistResults";
import AlbumResults from "../components/AlbumResults";

const SearchResults = ( { tracks, setTrackResults } ) => {

const removePopup = () => {
  setTrackResults(null)
}



  return (
    <>

        {tracks ? (
          <div className="song-container w-[100%] h-[100%] flex flex-col items-center">
          <ul className="list bg-base-100 rounded-box shadow-md w-[100%] p-0 ">
            <div className="flex flex-row justify-center items-center relative p-0">
            <h6>Songs</h6>
            <div className="btn-container absolute top-0 right-2">
            <button onClick={removePopup}>X</button>
            </div>
            </div>
            {tracks.map((track) => (
              <li className="list-row p-1 gap-1" key={track.id}>
                <TrackResults track={track} />
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
