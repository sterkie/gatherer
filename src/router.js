import Vue from "vue";
import Router from "vue-router";

// Styles

import Home from "./containers/Home.vue";
import Dashboard from "./containers/Dashboard.vue";
import Register from "./containers/Register.vue";
import Login from "./containers/Login.vue";
import UserList from "./containers/UserList.vue";
import UserDetail from "./containers/UserDetail.vue";
import Events from "./containers/Events.vue";

Vue.use(Router);

const routes = [
  { path: "/", component: Home },
  { path: "/dashboard", component: Dashboard },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/users", component: UserList },
  { path: "/users/:id", component: UserDetail },
  { path: "/events", component: Events }
];

export default new Router({
  routes: routes,
  mode: "history",
  linkActiveClass: "is-active"
});
