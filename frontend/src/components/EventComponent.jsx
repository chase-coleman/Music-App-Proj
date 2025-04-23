import { useEffect } from "react";
import { Link } from 'lucide-react';

const Event = ({event}) => {
  
  useEffect(() => {
    console.log(event)
  }, [])

  const handleTicket = () => {
    window.open(event.url, '_blank')
  }

  const handleVenue = () => {
    window.open(event._embedded.venues[0].url, '_blank')
  }

  return (
    <>
      <div className="img-container ml-0.5 flex items-center w-[100%] h-[100%]">
        <img
          className="size-15 object-cover rounded-box"
          src={event.images[0].url}
        />
        {/*Artist Img goes here */}
      </div>
      <div className="h-[100%] w-[100%] overflow-hidden whitespace-nowrap text-ellipsis">
      <div className="event-container max-w-[100%] overflow-hidden whitespace-nowrap 
                      text-ellipsis text-[clamp(0.5em,2.5vw,.75em)] font-semibold">
          {event.name}
          </div> {/* Playlist Name goes here*/}
        <div className="event-description w-[100%] text-wrap line-clamp-2 text-[clamp(0.5em,2.5vw,.5em)]">
         {event.pleaseNote ? event.pleaseNote : <span>No Description Available</span>

         }
          </div>
        <div className="links flex gap-1 w-[50%] text-[.65em] overflow-hidden whitespace-nowrap text-ellipsis h-[50%]">
        <button className="tickets-button h-[60%] flex items-center justify-center pr-1 pl-1 rounded gap-1 bg-yellow-500"
        onClick={handleTicket}
        >
          <Link size={10}/>
          Tix
          </button>
          <button className="tickets-button flex h-[60%] items-center justify-center pt-0 pr-1 pl-1 rounded gap-1 bg-yellow-500"
          onClick={handleVenue}
          >
          <Link size={10}/>
          Venue
          </button>
        </div>
      </div>

    </>
  );
};

export default Event
