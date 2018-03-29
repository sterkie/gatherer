import { auth, db } from "../../firebase";

const state = {
  user: null,
  users: [],
  selectedUser: null
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setUsers(state, payload) {
    state.users = payload;
  },
  selectedUser(state, payload) {
    state.selectedUser = payload;
  }
};

const actions = {
  registerUser({ commit }, payload) {
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        db
          .ref("users")
          .child(user.uid)
          .set({
            name: payload.name
          });
        const newUser = {
          id: user.uid,
          name: payload.name,
          registeredEvents: []
        };
        commit("setUser", newUser);
      })
      .catch(err => console.log(err));
  },
  logUserIn({ commit }, payload) {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const tempUser = { id: user.uid, name: "", registeredEvents: [] };
        commit("setUser", tempUser);
      });
  },
  logUserOut({ commit }) {
    auth.signOut();
    commit("setUser", null);
    console.log("signed out.");
  },
  autoLog({ commit }, payload) {
    commit("setUser", { id: payload.uid, name: "", registeredEvents: [] });
  },
  loadUserDetails({ commit, getters }) {
    db
      .ref("users")
      .child(getters.user.id)
      .once("value")
      .then(doc => {
        const updatedUserInfo = {
          id: getters.user.id,
          name: doc.val().name,
          registeredEvents: []
          //   registeredEvents: doc.val().registeredEvents
        };
        commit("setUser", updatedUserInfo);
      });
  },
  loadUser({ commit }, payload) {
    db
      .ref("/users")
      .child(payload)
      .once("value")
      .then(doc => {
        console.log(doc.val().name);
        const currentUser = { id: payload, name: doc.val().name };
        commit("selectedUser", currentUser);
      });
  },
  loadAllUsers({ commit }) {
    db.ref("users").once("value", snapshot => {
      const users = [];
      snapshot.forEach(user => {
        const tempUser = {
          id: user.key,
          name: user.val().name
        };
        users.push(tempUser);
      });
      commit("setUsers", users);
    });
  }
};

const getters = {
  user(state) {
    return state.user;
  },
  users(state) {
    return state.users;
  },
  selectedUser(state) {
    return state.selectedUser;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
};
