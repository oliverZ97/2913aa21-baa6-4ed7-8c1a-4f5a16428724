import React from "react";
import { Event } from "../util/types";
import "../styles/EventCard.scss";
import unknownImg from "../unknown.jpg";

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
        <p>{props.item.startTime}</p>
        <p>{props.item.endTime}</p>
      </div>
    </div>
  );
}

export default EventCard;
