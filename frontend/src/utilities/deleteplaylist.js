

const deletePlaylist = async () => {
  const playlistID = playlist.id;
  console.log(userToken)
  console.log("Deleting Playlist...");
  try {
    const response = await axios.delete(`${playlistUrl}${playlistID}/`, { 
        headers: {
        Authorization: `Token ${userToken}`,
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export default deletePlaylist