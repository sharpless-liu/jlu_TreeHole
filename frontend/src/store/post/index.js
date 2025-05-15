import { getUser } from "../../apis/auth";
import { createPost, favorPost, likePost, loadPosts } from "../../apis/post";

export const post = {
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    initializePosts(state, posts) {
      state.list = posts;
      console.log(state.list);
    },
    //传要点赞的id，和当前的状态
    toggleLike(state, documentId) {
      const post = state.list.find((post) => post.documentId === documentId);
      //没被点赞就加上自己
      if (!post.isLiked) {
        post.liked_bies = [
          ...post.liked_bies,
          {
            id: getUser().id,
          },
        ];
      } else {
        post.liked_bies = post.liked_bies.filter((user) => {
          return user.id != getUser().id;
        });
      }
      //取反
      console.log(post);
      post.isLiked = !post.isLiked;
    },
    toggleFavor(state, documentId) {
      const post = state.list.find((post) => post.documentId === documentId);
      //没被点赞就加上自己
      if (!post.isFavored) {
        post.favored_bies = [
          ...post.favored_bies,
          {
            id: getUser().id,
          },
        ];
      } else {
        post.favored_bies = post.favored_bies.filter((user) => {
          return user.id != getUser().id;
        });
      }
      //取反
      console.log(post);
      post.isFavored = !post.isFavored;
    },
  },
  actions: {
    async uploadPost({ commit, dispatch }, { image, description }) {
      await createPost(image, description);
      dispatch("loadAllPosts");
      commit("changeShowPostUpload", false);
    },
    async loadAllPosts({ commit }) {
      const posts = await loadPosts();
      commit("initializePosts", posts);
    },
    async toggleLike({ commit }, { documentId, isLiked }) {
      const isLike = await likePost(documentId, isLiked);
      commit("toggleLike", documentId);
    },
    async toggleFavor({ commit }, { documentId, isFavored }) {
      const isFavor = await favorPost(documentId, isFavored);
      commit("toggleFavor", documentId);
    },
  },
};
