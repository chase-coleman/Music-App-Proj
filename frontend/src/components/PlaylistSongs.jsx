import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PlaylistTracks from "./PlaylistTracks";
import { getTracks } from "../utils/MusicUtils";
import { HomePageContext } from "../pages/HomePage";

const PlaylistSongs = () => {
  const [queueView, setQueueView] = useState(false);
  const { queue } =
    useOutletContext();

  const { playlistView, playlistTracks, setPlaylistTracks } =
    useContext(HomePageContext);

  useEffect(() => {
    if (!playlistView) return;
    getTracks(playlistView.name, setPlaylistTracks);
  }, []);

  // handles the state that renders the user's queued songs
  const viewQueue = () => {
    if (!queueView) {
      setQueueView(true);
    } else setQueueView(false);
  };

  return (
    <>
      {playlistView ? (
        <div className="song-container w-[100%] h-[100%] flex flex-col items-center">
          <ul className="list bg-base-100 rounded-box shadow-md w-[100%] p-0">
            <div className="flex flex-row justify-between">
              <div className="w-1/4">
                <button
                  className="queue-btn p-1 !text-[.75em]"
                  onClick={viewQueue}
                >
                  {queueView ? "Back" : "Queue"}
                </button>
              </div>
              <div className="w-1/2 text-center">
                <span>{ queueView ? "Queue" : playlistView.name}</span>
                <span className="text-center text-[0.5em] text-black-500 font-light">
                  { queueView ? null : playlistView.description}
                </span>
              </div>
              <div className="w-1/4"></div>
            </div>
            {/* conditionally render components for the songs in queue or in the playlist as well as if there are no songs in the queue */}
            {queueView ? 
              queue.length < 1 ? <span className="text-[.75em] text-center">No songs in your queue!</span>:
              queue.map((track) => (
                  <li className="list-row p-1 gap-1" key={track.id}>
                    <PlaylistTracks track={track} queued={queueView}/>
                  </li>
                ))
              : playlistTracks.map((track) => (
                  <li className="list-row p-1 gap-1" key={track.id}>
                    <PlaylistTracks track={track} queued={queueView}/>
                  </li>
                ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default PlaylistSongs;
