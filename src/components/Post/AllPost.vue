<template>
  <div class="grid grid-cols-3 gap-1 flex-shrink-0">
    <PostCard :post="item" v-for="item in posts" :key="item" />
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
});
</script>

<style></style>
