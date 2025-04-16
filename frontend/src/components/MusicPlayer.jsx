import React, {useState, useEffect} from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const MusicPlayer = ({accessToken, currentTrack}) => {
  const [player, setPlayer] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isActivate, setIsActive] = useState(false)
  const [deviceID, setDeviceID] = useState(null)
  // const [currentTrack, setCurrentTrack] = useState(track)


  useEffect(() => {
    if (!accessToken){
      console.log("No access token provided. Unable to initialize the music player.")
      return
    }
    console.log(accessToken)
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: cb => { cb(accessToken)},
        volume: 0.5
      })

      setPlayer(player);
      player.addListener('ready', ({device_id}) => {
        console.log('Ready with Device ID:', device_id)
        setDeviceID(device_id)
      })
      
      player.addListener('not_ready', ({device_id}) => {
        console.log('Not ready with Device ID:', device_id)
      })

      player.connect()

    }
  }, [])

  useEffect(() => {
    if (!deviceID){
      return
    }
    playSong()
  }, [deviceID])


  const playerURI = "https://api.spotify.com/v1/me/player/play?device_id="
  const songURI = `spotify:track:${currentTrack.spotify_id}`

  const playSong = async () => {
    const uri = `${playerURI}${deviceID}`
    console.log(songURI)
    const response = await axios.put(uri, 
      {
        uris: [songURI]
      }, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )
  };




  return (
    <>
    <div className="player-container">
      <div className="main-wrapper">
        <h1>Music Player</h1>
      </div>
    </div>
    </>
  );
}

export default MusicPlayer