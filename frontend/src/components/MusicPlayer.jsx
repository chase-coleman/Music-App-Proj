import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";

const MusicPlayer = ({
  accessToken,
  player,
  setPlayer,
  currentTrack,
  isPaused,
  setIsPaused,
}) => {
  // const [player, setPlayer] = useState(null);
  // const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [deviceID, setDeviceID] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  // Initialize Spotify Web Playback SDK
  useEffect(() => {
    if (!accessToken) {
      console.log("No access token.");
      return;
    }

    // create a script that will run Spotify's Web Playback API
    // const script = document.createElement("script");
    // script.src = "https://sdk.scdn.co/spotify-player.js";
    // script.async = true;
    // document.body.appendChild(script);

    // this will auto call Spotify's Web Playback once the SDK script above is fully loaded
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("Spotify SDK Ready!");

      const player = new window.Spotify.Player({
        name: "Web Playback SDK Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      // when the Spotify player is ready, run the code in the function
      player.addListener("ready", ({ device_id }) => {
        console.log("Player ready with device_id:", device_id);
        setDeviceID(device_id); // set the device ID
        setPlayer(player); // save the player to state so that the app can access it
        setIsActive(true); // set to true for UI components
      });

      // handling of errors
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Player not ready with device_id:", device_id);
        setIsActive(false);
      });

      // handling of errors
      player.addListener("initialization_error", ({ message }) =>
        console.error("Init error:", message)
      );

      // handling of errors
      player.addListener("authentication_error", ({ message }) =>
        console.error("Auth error:", message)
      );

      // handling of errors
      player.addListener("account_error", ({ message }) =>
        console.error("Account error:", message)
      );

      // handling of errors
      player.addListener("playback_error", ({ message }) =>
        console.error("Playback error:", message)
      );

      // when the song gets paused, run the code within the function
      player.addListener("player_state_changed", (state) => {
        if (!state) return;
        // console.log("Player state changed:", state);
        const durationMS = state.duration;
        // const positionMS = state.position
        setDuration(state.duration);
        setPosition(state.position);
        setIsPaused(state.paused);
      });

      // notify that the player has connected w/ spotify successfully
      player.connect().then((success) => {
        if (success) {
          console.log("Player connected successfully!");
        } else {
          console.error("Player failed to connect.");
        }
      });
    };

    // when the component unmounts, remove the window
    return () => {
      window.onSpotifyWebPlaybackSDKReady = null;
    };
  }, [accessToken]);

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  useEffect(() => {
    let interval = null;

    if (player && !isPaused) {
      interval = setInterval(async () => {
        const state = await player.getCurrentState();
        if (state) {
          setPosition(state.position);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [player, isPaused]);

  // Handle device transfer when deviceID is available
  useEffect(() => {
    if (deviceID && accessToken) {
      transferPlayback();
    }
  }, [deviceID, accessToken]);

  // Handle song playing when both deviceID and currentTrack are available
  useEffect(() => {
    if (deviceID && currentTrack && accessToken) {
      playSong();
    }
  }, [deviceID, currentTrack, accessToken]);

  // tell Spotify that we want the Playback control set to this device
  const transferPlayback = async () => {
    try {
      console.log("Transferring playback to device:", deviceID);

      // Use the correct endpoint for transferring playback
      const response = await axios({
        method: "put",
        url: "https://api.spotify.com/v1/me/player",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          device_ids: [deviceID],
          play: true,
        },
      });

      console.log("Playback transfer response:", response.status);
    } catch (error) {
      console.error(
        "Transfer playback error:",
        error.response ? error.response.status : error.message
      );
      // Try alternative method if needed
      if (error.response && error.response.status === 404) {
        console.log("Trying alternative transfer method...");
        try {
          await axios({
            method: "put",
            url: `https://api.spotify.com/v1/me/player/pause`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          await axios({
            method: "put",
            url: `https://api.spotify.com/v1/me/player/devices`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            data: {
              device_ids: [deviceID],
            },
          });

          console.log("Alternative transfer method completed");
        } catch (altError) {
          console.error("Alternative transfer method failed:", altError);
        }
      }
    }
  };

  const pauseSong = () => {
    if (!player) {
      console.log("Player not ready yet");
      return;
    }
    player
      .togglePlay()
      .then(() => {
        console.log("Playback toggled");
      })
      .catch((error) => {
        console.error("Toggle playback error:", error);
      });
  };

  const playSong = async () => {
    if (!deviceID || !currentTrack) {
      console.log("Missing required data for playback:", {
        deviceID,
        currentTrack,
      });
      return;
    }

    try {
      const songURI = `spotify:track:${currentTrack.spotify_id}`;
      console.log("Playing song:", currentTrack);

      const response = await axios({
        method: "put",
        url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: {
          uris: [songURI],
        },
      });

      console.log("Play song response:", response.status);
    } catch (error) {
      console.error(
        "Play song error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div className="dock !h-[10vh] !w-screen flex p-2 gap-4 bg-gray-200">
        <div className="left-third !max-w-[28vw] w-full overflow-hidden">
          <div className="img-container flex flex-row items-center gap-2 h-full w-full">
            <div className="img w-[30%] h-full flex-shrink-0">
              <img
                src={currentTrack.track_img_sm}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="info-container flex flex-col justify-center overflow-hidden">
              <span className="text-[0.75em] truncate">
                {currentTrack.name}
              </span>
              <span className="text-[0.5em] text-gray-500 truncate">
                {currentTrack.artist_name}
              </span>
            </div>
          </div>
        </div>
        <div className="middle !w-1/3 !max-w-[40vw]">
          <div className="flex flex-row items-center justify-center gap-2 w-[75%]">
            <span className="text-[.75em]">{formatDuration(position)}</span>
            <progress className="progress !h-2 w-56" value={position} max={duration}>
              {formatDuration(position)} / {formatDuration(duration)}
            </progress>
            <span className="text-[.75em]">{formatDuration(duration)}</span>
          </div>
        </div>
        <div className="right-third !w-1/3 !max-w-[25vw] ">
          <div className="playback-controls flex flex-row gap-3">
            <button className="">
              <SkipBack size={12} />
            </button>

            <button
              className="btn btn-square btn-ghost flex items-center justify-center"
              onClick={pauseSong}
            >
              {isPaused ? (
                <Play size={20} color="rgb(250, 245, 230)" />
              ) : (
                <Pause size={20} color="rgb(250, 245, 230)" />
              )}
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
