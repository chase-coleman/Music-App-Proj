import axiosInstance from "../axios";
const singlePlaylistUrl = "http://127.0.0.1:8000/api/v1/playlists/";

// API Call to backend
export const grabUserPlaylists = async (playlistUrl, setUserPlaylists) => {
  // API Call to the playlists endpoint to get all the user's playlists
  const response = await axiosInstance.get(playlistUrl);

  // set their created playlists to state so we can display it
  setUserPlaylists(response.data);
};

// API call to backend to grab tracks from a specific playlist
export const getTracks = async (playlistName, setPlaylistTracks) => {
  if (playlistName){
    const response = await axiosInstance.get(
      `${singlePlaylistUrl}${playlistName}`
      );
    setPlaylistTracks(response.data.tracks);
  } else {
    console.error("The function was called with an undefined playlistName")
  }
};

export const addToQueue = (track, queue, setQueue) => {
  // checking if the song is already in the queue
  if (queue.filter(prevTrack => prevTrack.id == track.id).length === 1){
        const confirmed = window.confirm(
      "This song is already in your queue. Would you like to add it again?"
    );
    if (confirmed) {
      setQueue((prevQueue) => [...prevQueue, track])
    } else return;
  } else {
    setQueue((prevQueue) => [...prevQueue, track])
  }
}