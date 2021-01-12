/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import roomService from "@/service/u4/roomService";
import resourceService from "@/service/u4/resourceService";
import { Ut } from "@/service/utils";

export const bookingStoreModule = {
  namespaced: true,
  state: {
    roomArr: [],
    resourceArr: []
  },
  mutations: {
    setRoomArr: (state, arr) => (state.roomArr = arr),
    setResourceArr: (state, arr) => (state.resourceArr = arr)
  },
  actions: {
    async refreshRooms(context) {
      Ut.ld(`bookingStore->refreshRooms()`);
      const rooms = await roomService.getRoomList();
      Ut.pp(rooms);
      context.commit("setRoomArr", rooms);
    },
    async refreshResources(context) {
      Ut.ld(`bookingStore->refreshResources()`);
      const resources = await resourceService.getResourceList();
      Ut.pp(resources);
      context.commit("setResourceArr", resources);
    }
  }
};

/*  actions: {
    /!**
     * Commits selected course to local root store store state, and then fetches
     * occasions by course and returns them.
     *!/
    async doSetSelectedCourse(context, course) {
      context.commit("setSelectedCourse", course);
      try {
        return await occasionService.getOccasionsByCourseId(course);
      } catch (e) {
        if (e instanceof TypeError) {
          console.error("No occasions");
        } else {
          throw e;
        }
      }
    }
  },*/
