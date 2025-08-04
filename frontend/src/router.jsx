import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import Events from "./pages/Events";
import Settings from "./pages/Settings";
import AccountPage from "./pages/AccountPage";

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
        path: "/events",
        element: <Events />
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/account",
        element: <AccountPage />
      }
    ],
    errorElement: <ErrorPage />
  }
  ])

export default router