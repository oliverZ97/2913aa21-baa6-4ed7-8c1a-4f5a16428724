/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./styles/style.scss";
import "./styles/App.scss";
import { APIEvent, Event } from "./util/types";
import EventCard from "./components/EventCard";
import { DateTime } from "luxon";
import { FaShoppingCart } from "react-icons/fa";

function App() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [eventGroups, setEventGroups] = useState<Record<string, Event[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Event[]>([]);
  const filterKeys = ["title", "artists+name", "venue+name"];

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    groupEventsByDate();
  }, [eventData]);

  useEffect(() => {
    filterEventsBySearchQuery();
  }, [searchQuery]);

  const getEvents = () => {
    fetch("https://tlv-events-app.herokuapp.com/events/uk/london")
      .then((response) => response.json())
      .then((data) => {
        setEventData(sortEventsByDate(formatDateStringsToDateTime(data)));
      });
  };

  const formatDateStringsToDateTime = (data: APIEvent[]): Event[] => {
    const formattedData: Event[] = data.map((event) => ({
      ...event,
      startTime: DateTime.fromISO(event.startTime),
      endTime: DateTime.fromISO(event.endTime),
      date: DateTime.fromISO(event.date),
      visible: true,
      selected: checkCartContent(event),
    }));
    return formattedData;
  };

  const checkCartContent = (item: APIEvent): boolean => {
    if (cart.find((ev) => ev._id === item._id) === undefined) {
      return false;
    } else {
      return true;
    }
  };

  const sortEventsByDate = (data: Event[]): Event[] => {
    return data.sort(sortDateTime);
  };

  const sortDateTime = (a: Event, b: Event) => {
    return a.startTime.toMillis() - b.startTime.toMillis();
  };

  const groupEventsByDate = () => {
    let newEventGroups: Record<string, Event[]> = {};
    for (let i = 0; i < eventData.length; i++) {
      let dateKey = eventData[i].startTime.toLocaleString(DateTime.DATE_SHORT);
      if (newEventGroups[dateKey]) {
        newEventGroups[dateKey].push(eventData[i]);
      } else {
        newEventGroups[dateKey] = [eventData[i]];
      }
    }
    setEventGroups(newEventGroups);
  };

  const filterEventsBySearchQuery = () => {
    setEventData(
      eventData.map((eventItem) => {
        eventItem.visible = true;
        if (searchQuery !== "") {
          if (!checkKeysByQuery(eventItem)) {
            eventItem.visible = false;
          }
        }
        return eventItem;
      })
    );
  };

  const checkKeysByQuery = (item: Event): boolean => {
    let visibleFlag = false;
    filterKeys.forEach((key) => {
      let nestedKeys: string[] = [];
      if (key.includes("+")) {
        nestedKeys = key.split("+");
      }

      if (item[key as keyof Event]) {
        if (
          typeof item[key as keyof Event] === "string" ||
          typeof item[key as keyof Event] === "number"
        ) {
          if (
            item[key as keyof Event]
              .toString()
              .toLowerCase()
              .includes(searchQuery)
          ) {
            visibleFlag = true;
          }
        }
      } else {
        let value = null;
        let target: any = item;
        for (let i = 0; i < nestedKeys.length; i++) {
          value = target[nestedKeys[i] as keyof Event];
          if (typeof value === "object") {
            target = value;
          }
        }
        if (value && value.toString().toLowerCase().includes(searchQuery)) {
          visibleFlag = true;
        }
      }
    });
    return visibleFlag;
  };

  const addItemToCart = (item: Event) => {
    setCart([...cart, item]);
    const data = eventData;
    const index = data.findIndex((ev) => ev._id === item._id);
    data[index].selected = true;
    setEventData(data);
  };

  return (
    <div>
      <div className="circle-lg"></div>
      <div className="circle-md"></div>
      <div className="headerBar">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        ></input>
        <div className="cartContainer">
          <FaShoppingCart className="cartIcon"></FaShoppingCart>
          <div className="cartBadge">{cart.length}</div>
        </div>
      </div>
      <div className="eventContainer">
        {Object.entries(eventGroups).map((entry) => {
          return (
            <div className="groupContainer">
              {entry[1].filter((ev) => ev.visible).length > 0 &&
                entry[1].filter((ev) => !ev.selected).length > 0 && (
                  <div className="groupContainerHeader">
                    <p>{entry[0]}</p>
                  </div>
                )}
              <div className="groupItemContainer">
                {entry[1]
                  .filter((ev) => ev.visible)
                  .filter((ev) => !ev.selected)
                  .map((ev) => {
                    return (
                      <div className="eventCardWrapper">
                        <EventCard
                          addToCart={(item: Event) => addItemToCart(item)}
                          key={ev._id}
                          item={ev}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
