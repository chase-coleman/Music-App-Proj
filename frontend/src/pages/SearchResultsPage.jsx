import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import TrackResults from "../components/SearchResults";


const SearchResults = () => {
  const {userToken} = useOutletContext()
  const {queryItem} = useParams()
  const [trackResults, setTrackResults] = useState([])
  const [artistResults, setArtistResults] = useState([])
  const [albumResults, setAlbumResults] = useState([])



  useEffect(() => {
  if (!queryItem){
    console.log("queryItem was blank!")
    return
  }else{
    handleSearch()
  }
  }, [queryItem])

  useEffect(() => {
    console.log("tracks:", trackResults)
    console.log("artists:", artistResults)
    console.log("albums:", albumResults)
}, [trackResults, artistResults, albumResults])



   const handleSearch = async () => {
      // const userToken = localStorage.getItem("token");
      const searchUrl = "http://127.0.0.1:8000/api/v1/auth/spotify/callback/"
      try {
        const response = await axios.get(searchUrl + queryItem, {
          headers: {
            Authorization: `Token ${userToken}`
          }
        })
        // console.log(response.data)
        const tracks = response.data[0]['tracks']
        // console.log("tracks:", tracks)
        const artists = response.data[1]['artists']
        // console.log("artists:", artists)
        const albums = response.data[2]['albums']
        // console.log("albums:", albums)
        
        set_search_results(tracks, artists, albums)

      } catch (error) {
        console.error("Error:", error)
      }
    }

    const set_search_results = (tracks, artists, albums) => {
      setTrackResults(tracks)
      setArtistResults(artists)
      setAlbumResults(albums)
    }



  return (
    <>
    <Navbar />
    <h1>Search Results Page</h1>
    {trackResults ? (
  <ul className="list bg-base-100 rounded-box shadow-md">
    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide" key="">
      Songs
    </li>
    {trackResults.map((track) => (
      <li className="list-row" key={track.id}>
        <TrackResults track={track} />
      </li>
    ))}
  </ul>
) : (
  <h4>Not Loaded Yet!</h4>
)}
    </>
  )
}

export default SearchResults