import React from "react";
import { Event } from "../util/types";
import "../styles/EventCard.scss";
import unknownImg from "../unknown.jpg";
import { DateTime } from "luxon";

function EventCard(props: { item: Event }) {
  return (
    <div className="eventCard">
      <div className="titleContainer">
        <p className="title">{props.item.title}</p>
      </div>
      <img
        src={props.item.flyerFront ? props.item.flyerFront : unknownImg}
        alt={"flyerPhoto"}
      ></img>

      <div className="infoContainer">
        <p className="location">{props.item.venue.name}</p>
        {props.item.startTime.isValid && (
          <p>
            {props.item.startTime
              .setLocale("dt")
              .toLocaleString(DateTime.DATETIME_SHORT)}
          </p>
        )}
        {props.item.endTime.isValid && (
          <p>
            {props.item.endTime
              .setLocale("dt")
              .toLocaleString(DateTime.DATETIME_SHORT)}
          </p>
        )}
      </div>
    </div>
  );
}

export default EventCard;
