import React from "react";
import { Event } from "../util/types";
import "../styles/EventCard.scss";
import unknownImg from "../unknown.jpg";
import { DateTime } from "luxon";
import { FaMapMarkerAlt, FaRegClock, FaPlusCircle } from "react-icons/fa";

function EventCard(props: { item: Event; addToCart: (item: Event) => void }) {
  const addToCart = (item: Event) => {
    props.addToCart(item);
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
        <div className="plusIconContainer">
          <FaPlusCircle
            className="plusIcon"
            onClick={() => addToCart(props.item)}
          ></FaPlusCircle>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
