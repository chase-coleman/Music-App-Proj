import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const {userToken} = useOutletContext()
  const {queryItem} = useParams()
  const [trackResults, setTrackResults] = useState([])
  const [artistResults, setArtistResults] = useState([])
  const [albumResults, setAlbumResults] = useState([])



  useEffect(() => {
    if (!queryItem){
      handleSearch()
    } else {
      return 
    }
  }, [queryItem])

  useEffect(() => {
    if (trackResults.length === 0, artistResults.length === 0, albumResults.length === 0){
      return
    } else {
    console.log("tracks:", trackResults)
    console.log("artists:", artistResults)
    console.log("albums:", albumResults)
}}, [trackResults, artistResults, albumResults])



   const handleSearch = async () => {
      // const userToken = localStorage.getItem("token");
      const searchUrl = "http://127.0.0.1:8000/api/v1/auth/spotify/callback/"
      try {
        const response = await axios.get(searchUrl + queryItem, {
          headers: {
            Authorization: `Token ${userToken}`
          }
        })
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
    </>
  )
}

export default SearchResults