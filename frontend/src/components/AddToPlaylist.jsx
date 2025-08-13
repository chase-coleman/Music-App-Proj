import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { CirclePlus, CircleCheck } from "lucide-react";

const AddToPlaylist = ({ playlist, selectedPlaylists, setSelectedPlaylists, setLikeBtn }) => {
  const [updateAddBtn, setUpdateAddBtn] = useState(false);

  const handleAdd = () => {
    if (!updateAddBtn){
    setSelectedPlaylists((prevPlaylists) => [...prevPlaylists, playlist]);
    setUpdateAddBtn(true)
    setLikeBtn(true)
    } else {
      setSelectedPlaylists(selectedPlaylists.filter(prevPlaylist => prevPlaylist.id !== playlist.id))
      setUpdateAddBtn(false)
      setLikeBtn(false)
    }
  };

  return (
    <>
    <div className="flex justify-around">
      <div className="img-container w-[15%] h-[100%]">
        <img
          className="size-10 rounded-box"
          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        />{" "}
        {/*Playlist Img goes here */}
      </div>

      <div className="flex flex-col items-center justify-center text-[.75em] text-container text-center ">
        <Nav.Link as={Link} to={`/playlists/${playlist.name}`}>
          <div className="text-white">{playlist.name}</div> {/* Playlist Name goes here*/}
        </Nav.Link>
        <div className="text-[.75em] text-white uppercase font-semibold opacity-60">
          {/*Playlist Description goes here*/}
          {playlist.description}
        </div>
      </div>
      {updateAddBtn ? (
        <button className="btn btn-square btn-ghost" onClick={handleAdd}>
          <CircleCheck color="white" size={20}/>
        </button>
      ) : (
        <button className="btn btn-square btn-ghost" onClick={handleAdd}>
          <CirclePlus color="white" size={20} />
        </button>
      )}
      </div>
      {/*Put Trash icon here for users to delete a playlist*/}
    </>
  );
};

export default AddToPlaylist;
