import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const {userToken} = useOutletContext()
  const {queryItem} = useParams()

  useEffect(() => {
    if (queryItem === false){
      return 
    } else {
      handleSearch()
    }
  }, [queryItem])

   const handleSearch = async () => {
      // const userToken = localStorage.getItem("token");
      const searchUrl = "http://127.0.0.1:8000/api/v1/auth/spotify/callback/"
      try {
        const response = await axios.get(searchUrl + queryItem, {
          headers: {
            Authorization: `Token ${userToken}`
          }
        })
        console.log(response.data)
      } catch (error) {
        console.error("Error:", error)
      }
    }
  return (
    <>
    <Navbar />
    <h1>Search Results Page</h1>
    </>
  )
}

export default SearchResults