import React, { useEffect, useState } from 'react';
import './styles/style.scss';
import { Event } from './util/types';
import EventCard from './components/EventCard';

function App() {
  const [eventData, setEventData] = useState<Event[]>([]);

  useEffect(() => {
    getEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getEvents = () => {
    fetch('https://tlv-events-app.herokuapp.com/events/uk/london')
    .then((response) => response.json())
    .then((data) => {
      setEventData(data);
      console.log(eventData);
    });
  }

  return (
    <div className="App">
      {eventData && 
      eventData.map((eventItem) => {
        return (<EventCard key={eventItem._id} item={eventItem}/>)
      })
      }
    </div>
  );
}

export default App;
