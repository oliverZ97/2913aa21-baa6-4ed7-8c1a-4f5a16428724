import EventCard from "../components/EventCard";
import { Event } from "../util/types";
import "../styles/Main.scss";
import { DateTime } from "luxon";

function Main(props: {
  eventGroups: Record<string, Event[]>;
  addToCart: (item: Event) => void;
}) {
  return (
    <div className="mainContainer">
      {Object.entries(props.eventGroups).map((entry) => {
        return (
          <div key={entry[0]} className="mainGroupContainer">
            {entry[1].filter((ev) => ev.visible).length > 0 &&
              entry[1].filter((ev) => !ev.selected).length > 0 && (
                <div className="mainGroupContainerHeader">
                  <p>
                    {DateTime.fromFormat(entry[0], "dd.MM.yyyy").isValid
                      ? entry[0]
                      : "Datum unbekannt"}
                  </p>
                </div>
              )}
            <div className="mainGroupItemContainer">
              {entry[1]
                .filter((ev) => ev.visible)
                .filter((ev) => !ev.selected)
                .map((ev) => {
                  return (
                    <div className="eventCardWrapper">
                      <EventCard
                        addToCart={(item: Event) => props.addToCart(item)}
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
  );
}

export default Main;
