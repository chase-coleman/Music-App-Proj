import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { CircleX, Play, Pause, ListEnd } from "lucide-react";

import { addToQueue, removeFromQueue } from "../utils/MusicUtils";
import { HomePageContext } from "../pages/HomePage";

const playlistUrl = "http://127.0.0.1:8000/api/v1/playlists/";

const PlaylistTracks = ({ track, queued }) => {
  const {
    isPaused,
    setIsPaused,            // kept in case you use elsewhere; we don't manually flip it here
    setMusicActive,
    currentTrack,
    player,
    setCurrentTrack,
    queue,
    setQueue,
  } = useOutletContext();

  const { playlistView, removeTrack, timerFunction } = useContext(HomePageContext);

  const handlePlay = async () => {
    // If clicking the SAME track: toggle play/pause using the SDK.
    if (currentTrack?.id === track.id) {
      try {
        await player?.togglePlay();
        // Let MusicPlayer's player_state_changed update isPaused; no manual set here.
      } catch (e) {
        console.error("togglePlay failed:", e);
      }
      return;
    }

    // If clicking a DIFFERENT track:
    // Do NOT pause/resume here. Set the new current track and mark music active.
    // MusicPlayer's effect (watching currentTrack) will call /me/player/play
    // with the new URI on your device.
    setCurrentTrack(track);
    setMusicActive(true);
    // (Optional) optimistic UI:
    // setIsPaused(false);
  };

  return (
    <>
      <div className="img-container w-[100%] h-[100%]">
        <img
          className="size-12 rounded-box"
          src={track.track_img_md}
          alt={track.name || "track artwork"}
        />
      </div>

      <div className="h-[100%] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
        <div className="name-container h-[100%] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
          <div className="text-[clamp(0.5em,2.5vw,1em)] font-semibold">
            {track.name}
          </div>
          <div className="artist-container w-[100%]">
            <div className="text-[clamp(0.5em,2.5vw,.75em)]">
              {track.artist_name}
            </div>
          </div>
        </div>

        <div>{track.album}</div>

        <div className="duration-container w-[100%]">
          <div className="text-[clamp(0.5em,2.5vw,.75em)]">
            {track.duration}
          </div>
        </div>
      </div>

      {!queued && (
        <button
          onClick={() => addToQueue(track, queue, setQueue, timerFunction)}
          title="Add to queue"
        >
          <ListEnd color="black" />
        </button>
      )}

      <button
        className="btn btn-square btn-ghost"
        onClick={handlePlay}
        disabled={!player}
        title={
          currentTrack?.id === track.id && !isPaused ? "Pause" : "Play"
        }
      >
        {currentTrack?.id === track.id && !isPaused ? <Pause /> : <Play />}
      </button>

      {queued ? (
        <button
          className="btn btn-square btn-ghost"
          onClick={() => removeFromQueue(track.id, queue, setQueue, timerFunction)}
          title="Remove from queue"
        >
          <CircleX color="black" />
        </button>
      ) : (
        <button
          className="btn btn-square btn-ghost"
          onClick={() => removeTrack(track.id, playlistView.name, playlistUrl)}
          title="Remove from playlist"
        >
          <CircleX color="black" />
        </button>
      )}
    </>
  );
};

export default PlaylistTracks;
