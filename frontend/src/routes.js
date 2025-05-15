import HomePage from "./pages/HomePage.vue";
import SearchPage from "./pages/SearchPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import ProfileEditingPage from "./pages/ProfileEditingPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import { getJwtToken } from "./apis/auth";
// import { getJwtToken } from "./apis/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/search_result",
    name: "search_result",
    component: SearchPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: "/profile/edit",
    name: "ProfileEditing",
    component: ProfileEditingPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to) => {
  if (to.name !== "login" && !getJwtToken()) {
    return {
      name: "login",
    };
  }
  if (to.name == "login" && getJwtToken()) {
    return { name: "home" };
  }
});
export { router };
