<template>
  <div class="grid grid-cols-3 gap-1 flex-shrink-0">
    <PostCard
      v-for="item in posts"
      :key="item"
      :post="item.post"
      :user="user"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import PostCard from "../Post/PostCard.vue";

const props = defineProps({
  posts: Array,
  user: Object,
});

console.log(props.user, "uuuu");

console.log(props.posts, "savedpostco");
</script>

<style></style>
