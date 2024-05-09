<template>
  <div
    class="bg-gray-400 w-full aspect-square hover:bg-opacity-50"
    @click="openModal(post)"
  ></div>

  <ViewPost :open="isModalOpen" @close="isModalOpen = false" />
</template>

<script setup>
import ViewPost from "./ViewPost.vue";

import { ref, computed, onMounted } from "vue";
import { getPosts } from "../../services/user.js";
import { usedataStore } from "../../stores/dataStore.js";

const props = defineProps({
  post: Number,
});
const store = usedataStore();

const isModalOpen = ref(false);

const openModal = (item) => {
  isModalOpen.value = true;
};

onMounted(async () => {
  await getPosts();
  console.log(store.posts);
});
</script>

<style></style>
