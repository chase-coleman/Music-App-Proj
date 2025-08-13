import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import axios from "axios";
import { Play, Pause } from "lucide-react";
import { AppContext } from "../App";

const MusicPlayer = ({
  accessToken,
  player,
  setPlayer,
  isPaused,
  setIsPaused,
  musicActive,
  setMusicActive,
}) => {
  const [isActive, setIsActive] = useState(false); // SDK/device active
  const [deviceID, setDeviceID] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const { queue, setQueue, currentTrack, setCurrentTrack } = useContext(AppContext);

  // Refs to avoid double actions from rapid updates/StrictMode
  const sdkScriptRef = useRef(null);
  const endGuardRef = useRef(false);
  const pollIdRef = useRef(null);
  const localPlayerRef = useRef(null); // holds the SDK player for cleanup

  // ---------- Helpers ----------
  const formatDuration = (ms) => {
    if (!ms || ms < 0) return "0:00";
    const seconds = Math.floor(ms / 1000);
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const playNextInQueue = useCallback(() => {
    if (queue?.[1]) {
      endGuardRef.current = true; // block multiple triggers at track boundary
      setCurrentTrack(queue[1]);
      setQueue((prev) => prev.slice(1));
    } else {
      setMusicActive(false);
    }
  }, [queue, setQueue, setCurrentTrack, setMusicActive]);

  // Optional near-end detection (guarded to avoid double fires)
  useEffect(() => {
    if (!isPaused && duration > 0 && position >= duration - 750 && !endGuardRef.current) {
      playNextInQueue();
    }
    // Reset guard at the start of a new track
    if (position < 250) endGuardRef.current = false;
  }, [position, duration, isPaused, playNextInQueue]);

  // ---------- Init Spotify Web Playback SDK ----------
  useEffect(() => {
    if (!accessToken) return;

    const ensureSDK = () =>
      new Promise((resolve) => {
        if (window.Spotify) return resolve();
        if (!sdkScriptRef.current) {
          const tag = document.createElement("script");
          tag.src = "https://sdk.scdn.co/spotify-player.js";
          tag.async = true;
          document.body.appendChild(tag);
          sdkScriptRef.current = tag;
        }
        const prev = window.onSpotifyWebPlaybackSDKReady;
        window.onSpotifyWebPlaybackSDKReady = () => {
          if (typeof prev === "function") prev();
          resolve();
        };
      });

    let mounted = true;

    (async () => {
      await ensureSDK();
      if (!mounted || !window.Spotify) return;

      const localPlayer = new window.Spotify.Player({
        name: "Web Playback SDK Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });
      localPlayerRef.current = localPlayer;

      // Listeners
      localPlayer.addListener("ready", ({ device_id }) => {
        setDeviceID(device_id);
        setPlayer(localPlayer);
        setIsActive(true);
      });
      localPlayer.addListener("not_ready", () => setIsActive(false));
      localPlayer.addListener("initialization_error", ({ message }) => console.error("Init error:", message));
      localPlayer.addListener("authentication_error", ({ message }) => console.error("Auth error:", message));
      localPlayer.addListener("account_error", ({ message }) => console.error("Account error:", message));
      localPlayer.addListener("playback_error", ({ message }) => console.error("Playback error:", message));

      localPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;
        setDuration(state.duration);
        setPosition(state.position);
        setIsPaused(state.paused);
        // Alternative end-of-track signal (uncomment if preferred):
        // if (!state.paused && state.position === 0 && state.track_window.previous_tracks.length) {
        //   playNextInQueue();
        // }
      });

      try {
        await localPlayer.connect();
      } catch (e) {
        console.error("Player connect failed:", e);
      }
    })();

    return () => {
      mounted = false;
      if (pollIdRef.current) {
        clearInterval(pollIdRef.current);
        pollIdRef.current = null;
      }
      if (localPlayerRef.current) {
        try {
          localPlayerRef.current.disconnect();
        } catch {}
        localPlayerRef.current = null;
      }
      // Do not unset onSpotifyWebPlaybackSDKReady; other components might rely on it
    };
  }, [accessToken, setPlayer, setIsPaused /* playNextInQueue not required here */]);

  // ---------- Poll position while playing (smooth progress bar) ----------
  useEffect(() => {
    if (!player || isPaused) {
      if (pollIdRef.current) {
        clearInterval(pollIdRef.current);
        pollIdRef.current = null;
      }
      return;
    }
    if (pollIdRef.current) clearInterval(pollIdRef.current);
    pollIdRef.current = setInterval(async () => {
      try {
        const state = await player.getCurrentState();
        if (state) setPosition(state.position);
      } catch {}
    }, 1000);
    return () => {
      if (pollIdRef.current) {
        clearInterval(pollIdRef.current);
        pollIdRef.current = null;
      }
    };
  }, [player, isPaused]);

  // ---------- Transfer playback to this device once ready ----------
  useEffect(() => {
    const transferPlayback = async () => {
      try {
        await axios.put(
          "https://api.spotify.com/v1/me/player",
          { device_ids: [deviceID], play: true },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (e) {
        console.error("Transfer failed:", e?.response?.status, e?.response?.data || e.message);
      }
    };
    if (deviceID && accessToken) transferPlayback();
  }, [deviceID, accessToken]);

  // ---------- Autoplay selected track when device + track ready ----------
  useEffect(() => {
    const playSong = async () => {
      try {
        const uri = `spotify:track:${currentTrack.spotify_id}`;
        await axios.put(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`,
          { uris: [uri] },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (e) {
        console.error("Play song error:", e?.response?.status, e?.response?.data || e.message);
      }
    };
    if (deviceID && currentTrack && accessToken) playSong();
  }, [deviceID, currentTrack, accessToken]);

  // ---------- Controls ----------
  const togglePlay = () => {
    if (!player) {
      console.log("Player not ready yet");
      return;
    }
    player.togglePlay().catch((err) => console.error("Toggle playback error:", err));
  };

  // ---------- UI ----------
  return (
    <>
      <div className="dock !h-[10vh] !w-screen flex p-2 gap-4 bg-gray-200">
        <div className="left-third !max-w-[28vw] w-full overflow-hidden">
          <div className="img-container flex flex-row items-center gap-2 h-full w-full">
            <div className="img w-[30%] h-full flex-shrink-0">
              {currentTrack?.track_img_sm ? (
                <img
                  src={currentTrack.track_img_sm}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded" />
              )}
            </div>
            <div className="info-container flex flex-col justify-center overflow-hidden">
              <span className="text-[0.75em] truncate">
                {currentTrack?.name || "—"}
              </span>
              <span className="text-[0.5em] text-gray-500 truncate">
                {currentTrack?.artist_name || "—"}
              </span>
            </div>
          </div>
        </div>

        <div className="middle !w-1/3 !max-w-[40vw]">
          <div className="flex flex-row items-center justify-center gap-2 w-[75%]">
            <span className="text-[.75em]">{formatDuration(position)}</span>
            <progress
              className="progress !h-2 w-56"
              value={duration ? position : 0}
              max={duration || 1}
            >
              {formatDuration(position)} / {formatDuration(duration)}
            </progress>
            <span className="text-[.75em]">{formatDuration(duration)}</span>
          </div>
        </div>

        <div className="right-third !w-1/3 !max-w-[25vw]">
          <div className="playback-controls flex flex-row gap-3">
            <button
              className="btn btn-square btn-ghost flex items-center justify-center"
              onClick={togglePlay}
              disabled={!player}
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                <Play size={20} color="rgb(250, 245, 230)" />
              ) : (
                <Pause size={20} color="rgb(250, 245, 230)" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
