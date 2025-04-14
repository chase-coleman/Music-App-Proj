import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useOutletContext, useParams } from "react-router-dom";


const PlaylistView = () => {
  const { userToken } = useOutletContext()
  const [delBtn, setDelBtn] = useState(false)
  const { playlistid } = useParams()
  
  return (
    <>
    <h1>Page for : { playlistid }</h1>
    </>
  )
}

export default PlaylistView