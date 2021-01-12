/*
EA & SOA Group 2 HT2020
 */
import { morphism } from "morphism";
import requests from "@/service/requests";
import { MappingError } from "@/service/errors";
import { Room, roomFromDto } from "@/entities/room";

const apiCall = `rooms`;

export default {
  /* get a list */
  async getRoomList() {
    console.debug(`roomService->getRoomList()`);
    const res = await requests.getMany(apiCall);
    return this.mapper(res);
  },

  /* mapping from array of dto to domain objects */
  mapper(dtoArr: []) {
    try {
      return dtoArr.map(dto => morphism(roomFromDto, dto, Room));
    } catch (e) {
      throw new MappingError(`Bad JSON array: ${dtoArr}`);
    }
  },

  /* mapping from single dto to domain object */
  singleMapper(dto) {
    try {
      return morphism(roomFromDto, dto, Room);
    } catch (e) {
      throw new MappingError(`Bad dto: ${dto}`);
    }
  }
};
