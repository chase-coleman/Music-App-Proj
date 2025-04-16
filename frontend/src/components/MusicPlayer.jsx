import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";

const MusicPlayer = ({ accessToken, currentTrack }) => {
  const [player, setPlayer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isActivate, setIsActive] = useState(false);
  const [deviceID, setDeviceID] = useState(null);
  // const [currentTrack, setCurrentTrack] = useState(track)

  useEffect(() => {
    if (!accessToken) {
      console.log(
        "No access token provided. Unable to initialize the music player."
      );
      return;
    }
    console.log(accessToken);
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID:", device_id);
        setDeviceID(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Not ready with Device ID:", device_id);
      });

      
      player.addListener("player_state_changed", (state) => {
        if (!state) return;
        setIsPaused(state.paused)
        
      })
      
      player.connect();
    };
  }, []);


  useEffect(() => {
    if (!deviceID || !currentTrack) {
      return;
    }
    playSong();
  }, [deviceID, currentTrack]);

  const playerURI = "https://api.spotify.com/v1/me/player/play?device_id=";
  const songURI = `spotify:track:${currentTrack.spotify_id}`;


  const pauseSong = () => {
    if (!player) {
      console.log("Player not ready yet")
      return
    }
    player.togglePlay().then(() => {
      console.log("playback toggled")
    }).catch(error => {
      console.error("error:", error)
    })


  }



  const playSong = async () => {
    const uri = `${playerURI}${deviceID}`;
    console.log(songURI);
    const response = await axios.put(
      uri,
      {
        uris: [songURI],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <>
      <div className="player-container">
        <div className="main-wrapper">
          <div className="dock">
            <div className="img-container w-[30%] h-[100%] object-cover object-contain">
            <img src={currentTrack.track_img_sm} alt="" />
            </div>
              <div>
                <span>{currentTrack.name}</span>
                <span>{currentTrack.artist_name}</span>
              </div>

            <button>
                <SkipBack size={12} />
            </button>

            <button className="btn btn-square btn-ghost" onClick={pauseSong}>
                {isPaused ? <Pause /> : <Play />}
            </button>

            <button>
             <SkipForward size={12} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
