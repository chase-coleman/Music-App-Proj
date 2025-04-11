import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'


export default function App() {
  const [userToken, setUserToken] = useState('')
  
  useEffect(() => {
    localStorage.setItem("token", userToken)
  }, [userToken])

  // const userToken = localStorage.getItem("token"); // grab user's token
  
  return <Outlet context={{userToken, setUserToken}}/>
}

