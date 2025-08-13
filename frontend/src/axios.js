import axios from "axios";

const axiosInstance = axios.create({
  // importing the baseURL for development from the .env
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Please log in or create an account to access this feature');
    } else if (!error.response) {
      alert('Network Error. Please try again.');
    }
  }
);

export default axiosInstance