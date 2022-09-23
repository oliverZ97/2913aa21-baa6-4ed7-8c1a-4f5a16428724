import { DateTime } from "luxon";

export type Artist = {
  id: string;
  name: string;
  _id: {
    $oid: string;
  };
};

export type Pick = {
  blurb: string;
  id: string;
};

export type Venue = {
  contentUrl: string;
  direction: string;
  id: string;
  live: boolean;
  name: string;
};

export type APIEvent = {
  _id: string;
  artists: Artist[];
  attending: number;
  city: string;
  contentUrl: string;
  country: string;
  date: string;
  endTime: string;
  flyerFront: string;
  pick: Pick;
  private: boolean;
  startTime: string;
  title: string;
  venue: Venue;
};

export type Event = {
  _id: string;
  artists: Artist[];
  attending: number;
  city: string;
  contentUrl: string;
  country: string;
  date: DateTime;
  endTime: DateTime;
  flyerFront: string;
  pick: Pick;
  private: boolean;
  startTime: DateTime;
  title: string;
  venue: Venue;
  visible: boolean;
  selected: boolean;
};
