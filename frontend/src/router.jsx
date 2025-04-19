import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignUp";
import SearchResults from "./pages/SearchResultsPage";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "search-results/:queryItem",
        element: <SearchResults />
      },
    ],
    errorElement: <ErrorPage />
  }
  ])

export default router