import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "../axios";
import TrackResults from "../components/TrackResults";
import ArtistResults from "../components/ArtistResults";
import AlbumResults from "../components/AlbumResults";

const SearchResults = ( { tracks, } ) => {
  // const { trackResults, artistResults, albumResults } = useOutletContext();

  return (
    <>

        {tracks ? (
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" key="">
              Songs
            </li>
            {tracks.map((track) => (
              <li className="list-row" key={track.id}>
                <TrackResults track={track} />
              </li>
            ))}
          </ul>
        ) : (
          <h4>Not Loaded Yet!</h4>
        )}

    </>
  );
};

export default SearchResults;
