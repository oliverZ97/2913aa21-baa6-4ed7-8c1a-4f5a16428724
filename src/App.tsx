import React, { useEffect, useState } from "react";
import "./styles/style.scss";
import "./styles/App.scss";
import { Event } from "./util/types";
import EventCard from "./components/EventCard";
import { OutlinedInput } from "@mui/material";

function App() {
  const [eventData, setEventData] = useState<Event[]>([]);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEvents = () => {
    fetch("https://tlv-events-app.herokuapp.com/events/uk/london")
      .then((response) => response.json())
      .then((data) => {
        setEventData(data);
        console.log(eventData);
      });
  };

  return (
    <div className="App">
      <div className="headerBar">
        <OutlinedInput></OutlinedInput>
      </div>
      <div className="eventContainer">
        {eventData &&
          eventData.map((eventItem) => {
            return (
              <div className="eventCardWrapper">
                <EventCard key={eventItem._id} item={eventItem} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
