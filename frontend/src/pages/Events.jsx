import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Event from "../components/EventComponent";

const Events = () => {
  const [zipInput, setZipInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const ticketmasterKey = import.meta.env.VITE_TICKETMASTER_KEY;
  const ticketmasterSecret = import.meta.env.VITE_TICKETMASTER_SECRET;

  const ticketmasterAPI = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=${ticketmasterKey}`;

  useEffect(() => {
    console.log(zipInput);
  }, [zipInput]);

  const searchEvents = async () => {
    const response = await axios.get(
      `${ticketmasterAPI}&postalCode=${zipInput}`
    );
    const localEvents = response.data._embedded.events;
    console.log(localEvents);
    setSearchResults(localEvents);
    setZipInput("");
  };

  return (
    <>
      <Navbar />
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
            </fieldset>
          </div>
        </div>

        {searchResults ? (
          <div className="event-container w-[100%] h-[calc(100vh-70px)] h-full flex justify-center flex-col items-center overflow-y-auto ml-[25vw] mt-4">
            <ul className="list rounded-box shadow-md w-[100%] p-0">
              {searchResults.map((event) => (
                <li className="list-row h-[10vh] w-[75vw] p-0 m-1 text-black bg-white gap-1" key={event.id}>
                  <Event event={event} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
};

// ✅ Make sure this is outside the component function!
export default Events;
