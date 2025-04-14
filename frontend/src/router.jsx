import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUp";
import Playlists from "./pages/Playlists";
import SearchResults from "./pages/SearchResultsPage";
import ErrorPage from "./pages/ErrorPage";
import PlaylistView from "./pages/PlaylistView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "playlists",
        element: <Playlists />
      },
      {
        path: "search-results/:queryItem",
        element: <SearchResults />
      },
      {
        path: "playlists/:playlist_name",
        element: <PlaylistView />
      }
    ],
    errorElement: <ErrorPage />
  }
  ])

export default router