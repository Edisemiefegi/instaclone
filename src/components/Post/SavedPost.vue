<template>
  <div class="grid grid-cols-3 gap-1 flex-shrink-0">
    <PostCard v-for="item in post" :key="item" :post="item" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import PostCard from "../Post/PostCard.vue";

const props = defineProps({
  post: Array,
});

console.log(props.post, "savedpostco");
</script>

<style></style>
j
