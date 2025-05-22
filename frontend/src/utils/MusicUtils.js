



const getTracks = async () => {
  const response = await axios.get(
    `${singlePlaylistUrl}${playlistView[0].name}`
  );
  setPlaylistTracks(response.data["tracks"]);
};

export default getTracks