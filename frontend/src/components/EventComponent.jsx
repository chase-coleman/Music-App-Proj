import { use, useEffect } from "react";

const Event = ({event}) => {
  
  useEffect(() => {
    console.log(event)
  }, [])

  return (
    <>
 <div className="img-container w-[100%] h-[100%]">
        <img
          className="size-10 rounded-box"
          src={event.images[0].url}
        />{" "}
        {/*Playlist Img goes here */}
      </div>
      <div className="h-[100%] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
      <div className="event-container max-w-[100%] overflow-hidden whitespace-nowrap text-ellipsis text-[clamp(0.5em,2.5vw,1em)] font-semibold">
          {event.name}
          </div> {/* Playlist Name goes here*/}
        <div className="event-ddescription w-[100%] text-[clamp(0.5em,2.5vw,.75em)]">
          {/*Playlist Description goes here*/}
          {event.pleaseNote}
        </div>
      </div>

    </>
  );
};

export default Event
