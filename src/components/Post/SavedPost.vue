<template>
  <div class="grid grid-cols-3 gap-1 flex-shrink-0">
    <PostCard v-for="item in 2" :key="item" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import PostCard from "../Post/PostCard.vue";
</script>

<style></style>
