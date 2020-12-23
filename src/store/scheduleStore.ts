/*
EA & SOA Group 2 HT2020

This deals with runtime state across the whole app.
Often this is where we would use local storage db and
save state to a db on the client.
 */

export const scheduleStoreModule = {
  namespaced: true,
  state: {
    selectedOccasion: {},
    selectedSchedule: {}
  },
  mutations: {
    // todo: try removing and replacing with mapMutations in callers.
    /*    setSelectedOccasion(payload) {
      console.debug("setSelectedOccasion() mutation: " + payload);
      this.occasion = payload;
    }*/
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
        return await occasionService.getOccasions(course);
      } catch (e) {
        if (e instanceof TypeError) {
          console.error("No occasions");
        } else {
          throw e;
        }
      }
    }
  },*/
