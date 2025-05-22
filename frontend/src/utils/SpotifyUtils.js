import axiosInstance from "../axios"

const spotifyAccessUrl = "http://127.0.0.1:8000/api/v1/auth/spotify/callback/"

  // get a spotify access token via the backend & set it to state 
export const getAccessToken = async (setAccessToken) => {
  const response = await axiosInstance.get(spotifyAccessUrl)
  const spotifyToken = response.data.access_token
  setAccessToken(spotifyToken)
}