import { useEffect, useState } from "react";
import axios from "../axios";
import { useOutletContext } from "react-router-dom";
import { Prev } from "react-bootstrap/esm/PageItem";
import AddToPlaylist from "./AddToPlaylist";
import { CircleX } from "lucide-react";

const TrackResults = ({ track, removeTrack, removeLike, getTracks,grabUserPlaylists, setLikedSongs }) => {
  const [likeBtn, setLikeBtn] = useState(false);
  const [showPlaylists, setShowPlaylists] = useState(false)
  const [selectedPlaylists, setSelectedPlaylists] = useState([])
  const trackUrl = "http://127.0.0.1:8000/api/v1/tracks/"; // API endopint for working with tracks

  const { setMusicActive, setCurrentTrack, userPlaylists } = useOutletContext()

  const addToPlaylist = () => {
    setShowPlaylists(true)
  }
  useEffect(() => {
    if (selectedPlaylists){
    console.log(selectedPlaylists)
    }
  }, [selectedPlaylists])

  const handleAdding = async () => {
    const track_to_add = {
      "spotify_id": track.id,
      "name": track.track_name,
      "track_url": track.track_url,
      "duration": track.track_duration,
      "album_name": track.album,
      "album_id": track.album_id,
      "artist_name": track.artist,
      "artist_id": track.artist_id,
      "track_img_lg": track.track_img_lg,
      "track_img_md": track.track_img_md,
      "track_img_sm": track.track_img_sm
    }
    if (!selectedPlaylists){
      alert("You haven't selected any playlist!")
    } else {
      try {
      for (const playlist of selectedPlaylists){
        console.log(playlist.id)
          const response = await axios.post(`${trackUrl}${playlist.id}/`, track_to_add)
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    setShowPlaylists(false)
  }
    

  const handleLike = () => {
    if (!likeBtn){    
      setLikedSongs(prevLikes => [...prevLikes, track ])
      setLikeBtn(true)
      addToPlaylist()
    } else {
      setLikeBtn(false)
      removeLike(track)
    }
  }

  // if the user wants to play the song before adding it to a playlist,
  // we have to create a dictionary from it becuase the MusicPlayer 
  // component takes in a dictionary
  const playSong = () => {
    const track_to_play = {
      "spotify_id": track.id,
      "name": track.track_name,
      "track_url": track.track_url,
      "duration": track.track_duration,
      "album_name": track.album,
      "album_id": track.album_id,
      "artist_name": track.artist,
      "artist_id": track.artist_id,
      "track_img_lg": track.track_img_lg,
      "track_img_md": track.track_img_md,
      "track_img_sm": track.track_img_sm
    }
    // console.log(`Playing ${track_to_play}`)
    setCurrentTrack(track_to_play)
    setMusicActive(true)
  }

  return (
    <>
    {showPlaylists ? 
  <div className="fixed inset-0 z-50 flex items-center justify-center">
  <ul className="list bg-red-100 rounded-box shadow-md w-[40vw] p-0 gap-2">
    <div className="text-center">
      Select the playlists you'd like to add the song to!
    </div>
    {userPlaylists.map((playlist) => (
      <li className="list-row p-1 gap-1" key={playlist.id}>
        <AddToPlaylist
          playlist={playlist}
          setSelectedPlaylists={setSelectedPlaylists}
          grabUserPlaylists={grabUserPlaylists}
          setShowPlaylists={setShowPlaylists}
        />
      </li>
    ))}
    <button className="closeplaylists" onClick={handleAdding}>
      Done!
    </button>
  </ul>
</div>
    : null
    }
      <div className="img-container w-[100%] h-[100%]">
        <img
          className="size-10 rounded-box"
          src={track.track_img_md}
        />{" "}
        {/*Playlist Img goes here */}
      </div>
      <div className="h-[100%] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
      <div className="name-container max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis text-[clamp(0.5em,2.5vw,1em)] font-semibold">
          {track.track_name}
          </div> {/* Playlist Name goes here*/}
        <div className="artist-container w-[100%] text-[clamp(0.5em,2.5vw,.75em)]">
          {/*Playlist Description goes here*/}
          {track.artist}
        </div>
      </div>
      <button className="play-btn btn-square btn-ghost" onClick={playSong}>
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>
      <button className="btn btn-square btn-ghost" onClick={handleLike}>
        <svg className={`size-[1em] ${likeBtn ? 'text-red-500' : 'text-current'} `} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="currentColor"
        viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
          </path></g></svg>
      </button>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default TrackResults;
