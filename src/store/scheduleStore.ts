/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

import { Occasion } from "@/entities/occasion";
import { Schedule } from "@/entities/schedule";

export const scheduleStoreModule = {
  namespaced: true,
  state: {
    selectedOccasion: new Occasion(),
    selectedSchedule: new Schedule(),
    eventArr: [], // loaded separately
    timeSlots: {
      1: { from: 9 * 60 + 15, to: 9 * 60 + 45, session: "PASS1" },
      2: { from: 10 * 60 + 15, to: 11 * 60 + 45, session: "PASS2" },
      3: { from: 13 * 60, to: 14 * 60 + 30, session: "PASS3" },
      4: { from: 14 * 60 + 45, to: 16 * 60 + 15, session: "PASS4" },
      5: { from: 16 * 60 + 30, to: 18 * 60, session: "PASS5" }
    }
  },
  mutations: {
    // todo: try removing and replacing with mapMutations in callers.
    setSelectedOccasion(state, payload) {
      console.debug(`setSelectedOccasion() mutation: ${payload}`);
      state.selectedOccasion = payload;
    },
    setSelectedSchedule(state, payload) {
      console.debug(`setSelectedSchedule() mutation: ${payload}`);
      state.selectedSchedule = payload;
    },
    //setEventArr: (state, payload) => state.eventArr = payload,
    setEventArr(state, payload) {
      console.debug(`setEventArr() mutation: ${payload.length}`);
      state.eventArr = payload;
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
