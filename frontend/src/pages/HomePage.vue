<template>
  <div>
    <PostList>
      <PostItem v-for="post in posts" :post="post" :key="post.id"> </PostItem>
    </PostList>
    <!-- <PostDetails></PostDetails> -->
    <PostUpload v-if="showPostUpload"></PostUpload>
  </div>
</template>
<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostUpload from "../components/PostUpload.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
const store = useStore();
// computed可以只有一个参数吗？
const showPostUpload = computed(() => store.state.showPostUpload);
const posts = computed(() => store.state.post.list);
onMounted(() => {
  store.dispatch("loadAllPosts");
});
</script>
<style scoped></style>
