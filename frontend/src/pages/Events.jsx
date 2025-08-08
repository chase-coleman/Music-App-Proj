import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Event from "../components/EventComponent";
import { BouncyArc, DotPulse } from "ldrs/react";
import "ldrs/react/BouncyArc.css";

const Events = () => {
  const [zipInput, setZipInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [noResults, setNoResults] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const ticketmasterKey = import.meta.env.VITE_TICKETMASTER_KEY;
  const ticketmasterSecret = import.meta.env.VITE_TICKETMASTER_SECRET;

  const ticketmasterAPI = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=${ticketmasterKey}`;

  // function validates zip code input
  const validateZip = (zip) => {
    const trimmedZip = zip.trim()
    const regexZip = /^\d{5}(-\d{4})?$/
    return regexZip.test(trimmedZip)
  }


  // handle the API call when search button is clicked
  const searchEvents = async () => {
    if (noResults) { setNoResults(false)}
    setSearching(true);
    try {
      if (!validateZip(zipInput)){
        setErrorMsg("Invalid ZIP input")
        setNoResults(true)
        return
      }
      const response = await axios.get(
      `${ticketmasterAPI}&postalCode=${zipInput}`
    );
    // if there are no events returned from ticketmaster API, set the searchResults back to empty
    // the return will stop the rest of the code from running (localEvents would mess this up)
    if (!response.data?._embedded?.events) {
      setSearchResults([]);
      setErrorMsg("No events found for that ZIP code")
      setNoResults(true)
      return
    }
    const localEvents = response.data._embedded.events;
    setZipInput("")
    setSearchResults(localEvents);
  } catch (error) {
    console.error("error", error)
  } finally {
    // no matter what, set the searching popup to false.
    setSearching(false);
  }
  };


  return (
    <>
      <div className="eventpage-container h-[calc(100vh-70px)] w-screen flex flex-col items-center gap-1">
        <div className="eventinput-container w-full flex items-center justify-center">
          <div>
            <fieldset className="fieldset w-[35vw] flex flex-col items-center gap-1">
              <div className="flex items-center justify-center ">
                <span className="w-[100%] text-center text-[1em] text-white">
                  Enter a ZIP Code to find live music near you!
                </span>
              </div>
              <div className="zipinput-container rounded flex gap-2 w-[75%] p-1.5">
                <input
                  type="text"
                  className="input placeholder-gray-500 rounded text-black"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  placeholder="ZIP Code"
                  />
                <button
                  className="searchzip-btn rounded w-[20%] !text-[.75em] p-1"
                  onClick={searchEvents}
                  >
                  Search
                </button>
              </div>
                  { noResults &&
                  <span className="text-xs text-red-500">{errorMsg}</span>
                  }
            </fieldset>
          </div>
        </div>
        <div className="event-container w-[100%] flex justify-center flex-col items-center overflow-y-auto ml-[25vw] mt-1">
          <ul className="list rounded-box shadow-md flex w-[100%] h-[95%] p-0">
            {searchResults.map((event) => (
              <li
                className="list-row h-[10vh] w-[75vw] p-0 m-1 text-black bg-white gap-1"
                key={event.id}
              >
                <Event event={event} />
              </li>
            ))}
          </ul>
        </div>
        {searching ? (
          <div className="absolute top-[-90px] left-0 w-full h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="account-created z-50 w-[30vw] h-[20vh] rounded-lg shadow-lg flex flex-col items-center justify-center">
              <h4 className="text-center text-white">Searching</h4>
              <BouncyArc size="70" speed="1.65" color="white" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

// ✅ Make sure this is outside the component function!
export default Events;
