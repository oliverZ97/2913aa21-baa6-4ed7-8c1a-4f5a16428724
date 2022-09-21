import { Card } from '@mui/material';
import React from 'react';
import { Event } from '../util/types';
import '../styles/EventCard.scss';

function EventCard(props: {item: Event}) {
  
    return (
        <Card className='eventCard'>
            <div className='titleContainer'>
            <p className="title">{props.item.title}</p>

            </div>
        <img src={props.item.flyerFront} alt={"flyerPhoto"}></img>
        <p>{props.item.venue.name}</p>
        <p>{props.item.startTime}</p>
        <p>{props.item.endTime}</p>
      </Card>
    );
  }
  
  export default EventCard;