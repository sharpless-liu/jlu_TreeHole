<template>
  <div class="postItem">
    <img
      :src="post.image"
      alt=""
      width="100%"
      height="100%"
      style="background: #eee"
    />
    <div class="postInfo">
      <div class="postMeta">
        <TheAvatar :src="post?.user?.avatar"></TheAvatar>
        <span>{{ post?.user?.username }}</span>
        <span class="postPubDate">{{ dateToRelative(post.publishedAt) }}</span>
        <PostActions
          :comment="post.comments.length"
          :favor="post.favored_bies.length"
          :like="post.liked_bies.length"
          :favored-by-me="post.isFavored"
          :liked-by-me="post.isLiked"
          @likeClick="handleLikeClick"
          @favorClick="handleFavorClick"
        ></PostActions>
      </div>
      <div class="postDesc">
        <p>{{ post.description }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { dateToRelative } from "../utils/date";
import PostActions from "../components/PostActions.vue";
import TheAvatar from "../components/TheAvatar.vue";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps({
  post: {
    type: Object,
    default: {},
  },
});
function handleLikeClick() {
  store.dispatch("toggleLike", {
    documentId: props.post.documentId,
    isLiked: props.post.isLiked,
  });
}
function handleFavorClick() {
  store.dispatch("toggleFavor", {
    documentId: props.post.documentId,
    isFavored: props.post.isFavored,
  });
}
</script>
<style scoped>
.postItem {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.postInfo {
  padding: 24px;
}

.postItem > img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  background: #eee;
  cursor: pointer;
}

.postMeta {
  display: grid;
  grid-template-areas:
    "avatar name actions"
    "pubDate pubDate actions";
  grid-template-columns: 42px 1fr 3fr;
  row-gap: 6px;
}
.postMeta .avatar {
  grid-area: avatar;
}

.postMeta .postPubDate {
  grid-area: pubDate;
  color: #9f9f9f;
  font-size: 14px;
}

.postActions {
  grid-area: actions;
  justify-self: end;
}

.postDesc {
  margin-top: 28px;
  white-space: pre-line;
}
</style>
