/*
EA & SOA Group 2 HT2020
 */
import requests from "@/service/requests";
import { Room, roomFromDto } from "@/entities/room";
import { ApiTools } from "@/service/utils";

const apiCall = `rooms`;

export default {
  /* get a list */
  async getRoomList() {
    console.debug(`roomService->getRoomList()`);
    const res = await requests.getMany(apiCall);
    return ApiTools.mapper(roomFromDto, res, Room);
  }
};
