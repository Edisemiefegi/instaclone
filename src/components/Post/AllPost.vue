<template>
  <div class="grid grid-cols-3 gap-1 flex-shrink-0">
    <PostCard :post="item" v-for="item in posts" :key="item" :user="user" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PostCard from "../Post/PostCard.vue";

const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
  user: {
    type: Object,
    default: () => [],
  },
});
// console.log(props.posts, "allpostc");
</script>

<style></style>
