import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUp";
import Playlists from "./pages/Playlists";
import SearchResults from "./pages/SearchResultsPage";

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
        path: "search-results/:item",
        element: <SearchResults />
      },
    ]
  }
])

export default router