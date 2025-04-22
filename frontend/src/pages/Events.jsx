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
      <div className="pagecontainer h-screen w-screen flex flex-col items-center gap-1">
        <h4>Events</h4>
        <div className="inputcontainer border-2 w-full flex items-center justify-center">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Enter a ZIP Code</legend>
            <input
              type="text"
              className="input"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              placeholder="ZIP Code"
            />
          </fieldset>
          <button className="searchbtn border-2" onClick={searchEvents}>
            Search
          </button>
        </div>

        {searchResults ? (
          <div className="event-container w-[100%] h-full flex flex-col items-center mt-4">
            <div className="flex flex-row justify-center items-center relative p-0 w-full">
              <h6>Events</h6>
            </div>
            <ul className="list bg-base-100 rounded-box shadow-md w-[100%] p-0">
              {searchResults.map((event) => (
                <li className="list-row p-1 gap-1" key={event.id}>
                  <Event event={event} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h4 className="mt-4">No Events Found</h4>
        )}
      </div>
    </>
  );
};

// ✅ Make sure this is outside the component function!
export default Events;
