/*
EA & SOA Group 2 HT2020

Helper service for working with backend or middleware apis
 */

import myAxios from "@/service/myAxios";
// library https://www.npmjs.com/package/object-mapper
import {objectMapper} from "object-mapper";

// Used as truth for typescript typing
export interface EventObj {
  id: string;
  title: string;
  occasionCode: string; // tillfällekod
  datetime: Date; // javascript Date object
  timeslots: [] // 1 through 5 (lektionspass)
  rooms: [];
  equipment: [];
  teachers: []
}

const toDto = {
  "id": "id",
  "title": "title",
  "occasionCode": "occasion_code",
  "datetime": "datetime",
  "timeslots": "timeslots",
  "rooms": "rooms",
  "equipment": "equipment",
  "teachers": "teachers"
};

const toEventObj = {
  "id": "id",
  "title": "title",
  "occasion_code": "occasionCode",
  "datetime": "datetime",
  "timeslots": "timeslots",
  "rooms": "rooms",
  "equipment": "equipment",
  "teachers": "teachers"
}

export default {
  /* Gets events by occasion code, if no occasionCode is supplied return false. */
  async getEventsByOccasionCode(occasionCode: string) {
    const params = occasionCode ? {occasion_code: occasionCode} : {}; //eslint-disable-line
    if (params) { // only get events if there is an occasion code
      try {
        const res = await myAxios.get("events", {params});
        console.debug("GET to: " + res.config.baseURL + "/" + res.config.url);
        return res.data.forEach((dto) => objectMapper(dto, toEventObj));
      } catch (error) {
        console.error(error);
      }
    } else {
      return false;
    }
  },

  /* POST request with a new event */
  async createNewEvent(event: EventObj) {
    const data = event => objectMapper(event, toDto)
    try {
      const res = await myAxios.post("events", {data});
      console.debug("POST to: " + res.config.baseURL + "/" + res.config.url);
      // todo: return id from backend?
    } catch (error) {
      console.error(error);
    }
  },
};
