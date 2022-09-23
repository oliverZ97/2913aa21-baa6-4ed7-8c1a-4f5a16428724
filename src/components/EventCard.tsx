import React from "react";
import { Event } from "../util/types";
import "../styles/EventCard.scss";
import unknownImg from "../unknown.jpg";
import { DateTime } from "luxon";
import {
  FaMapMarkerAlt,
  FaRegClock,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";

function EventCard(props: {
  item: Event;
  addToCart?: (item: Event) => void;
  removeFromCart?: (item: Event) => void;
}) {
  const addToCart = (item: Event): void => {
    if (props.addToCart) {
      props.addToCart(item);
    }
  };

  const removeFromCart = (item: Event): void => {
    if (props.removeFromCart) {
      props.removeFromCart(item);
    }
  };

  return (
    <div className="eventCard">
      <img
        src={props.item.flyerFront ? props.item.flyerFront : unknownImg}
        alt={"flyerPhoto"}
      ></img>
      <div className="titleContainer">
        <p className="title">{props.item.title}</p>
      </div>
      <div className="infoContainer">
        <div>
          <a
            className="locationLink"
            target={"_blank"}
            href={props.item.venue.direction}
            rel="noreferrer"
          >
            <FaMapMarkerAlt></FaMapMarkerAlt>
            <p className="location">{props.item.venue.name}</p>
          </a>
          <div className="time">
            <FaRegClock className="timeIcon"></FaRegClock>
            {props.item.startTime.isValid && (
              <p>
                {props.item.startTime
                  .setLocale("dt")
                  .toLocaleString(DateTime.DATETIME_SHORT)}
              </p>
            )}
            <span> - </span>
            {props.item.endTime.isValid && (
              <p>
                {props.item.endTime
                  .setLocale("dt")
                  .toLocaleString(DateTime.DATETIME_SHORT)}
              </p>
            )}
          </div>
        </div>
        <div className="iconContainer">
          {props.item.selected ? (
            <FaMinusCircle
              className="icon"
              onClick={() => removeFromCart(props.item)}
            ></FaMinusCircle>
          ) : (
            <FaPlusCircle
              className="icon"
              onClick={() => addToCart(props.item)}
            ></FaPlusCircle>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
