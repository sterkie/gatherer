import { db } from "../../firebase";

const state = {
  events: []
};
const mutations = {
  createEvent(state, payload) {
    state.events.push(payload);
  },
  loadedEvents(state, payload) {
    state.events = payload;
  }
};

const actions = {
  createEvent({ commit, getters }, payload) {
    // get id for new event from firebase
    const eventId = db.ref("events").push().key;
    // compose complete event object
    const newEvent = {
      id: eventId,
      creatorName: getters.user.name,
      creatorId: getters.user.id,
      title: payload.title,
      location: payload.location,
      body: payload.body,
      suggestedDates: payload.suggestedDates,
      status: payload.status
    };
    db.ref(`/events/${eventId}`).update(newEvent);
    // compose creator object with ID and name
    const creator = { id: getters.user.id, name: getters.user.name };
    // get ref for participants and initialize them with the event creator
    const paRef = db.ref(`/events/${eventId}/participants/${getters.user.id}`);
    paRef.update(creator);
    //commit to vuex store
    commit("createEvent", { ...newEvent, participants: [...creator] });
  },

  loadAllEvents({ commit }) {
    const events = [];
    db.ref("events").once("value", snapshot => {
      snapshot.forEach(event => {
        const tempEvent = {
          id: event.key,
          creatorName: event.val().creatorName,
          creatorId: event.val().creatorId,
          title: event.val().title,
          location: event.val().location,
          body: event.val().body,
          suggestedDates: event.val().suggestedDates,
          status: event.val().status,
          participants: event.val().participants
        };
        events.push(tempEvent);
      });
    });

    commit("loadedEvents", events);
  }
};

const getters = {
  events(state) {
    return state.events;
  },

  loadEvent(state) {
    return eventId => {
      return state.events.find(event => {
        return event.id === eventId;
      });
    };
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
