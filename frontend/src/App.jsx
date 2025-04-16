import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import axios from './axios'


export default function App() {
  const [userToken, setUserToken] = useState('');
  
  
  useEffect(() => {
    if (userToken){
      localStorage.setItem("token", userToken)
      console.log("setting userToken:", userToken)
      // getSpotifyRefreshToken()
    }
  }, [userToken]);


  return <Outlet context={{userToken, setUserToken}}/>
}

