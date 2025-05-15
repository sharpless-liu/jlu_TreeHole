<template>
  <div class="postActions">
    <TheIcon
      icon="like"
      :fill="likedByMe ? '#FF3C3C' : 'none'"
      stroke="#000000 "
      @click="emit('likeClick')"
    ></TheIcon>
    <span>{{ like }}</span>
    <TheIcon icon="comment" fill="none" stroke="#000000"></TheIcon>
    <span>{{ comment }}</span>
    <TheIcon
      icon="favorite"
      :fill="favoredByMe ? '#FFD12E' : 'none'"
      stroke="#000000"
      @click="emit('favorClick')"
    ></TheIcon>
    <span>{{ favor }}</span>
  </div>
</template>
<script setup>
import TheIcon from "./TheIcon.vue";
defineProps({
  like: Number,
  comment: Number,
  favor: Number,
  likedByMe: Boolean,
  favoredByMe: Boolean,
});
const emit = defineEmits(["likeClick", "commentsClick", "favorClick"]);
</script>

<style scoped>
.postActions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  column-gap: 16px;
  row-gap: 4px;
}

.postActions > svg {
  width: 32px;
  height: 32px;
  grid-row: 1 / 2;
  cursor: pointer;
}

.postActions > span {
  font-size: 14px;
}
</style>
