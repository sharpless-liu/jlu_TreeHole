import { createStore } from "vuex";
import { user } from "./user";
import { post } from "./post";
import { comment } from "./comment";
export const store = createStore({
  modules: {
    user,
    post,
    comment,
  },
  state() {
    return {
      showPostUpload: false,
    };
  },
  mutations: {
    changeShowPostUpload(state, show) {
      state.showPostUpload = show;
    },
  },
  actions: {},
});
