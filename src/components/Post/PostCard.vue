<template>
  <div
    class="border w-full aspect-square hover:bg-opacity-50"
    @click="openModal(post)"
  >
    <img :src="post.image" alt="" class="w-full h-full object-cover" />
  </div>

  <ViewPost
    :open="isModalOpen"
    :post="post"
    :user="props.post.user"
    @close="isModalOpen = false"
  />
</template>

<script setup>
import ViewPost from "./ViewPost.vue";

import { ref, computed, onMounted } from "vue";
import { usedataStore } from "@/stores/dataStore.js";

const props = defineProps({
  post: Object,
  user: Object,
});
const store = usedataStore();

const isModalOpen = ref(false);

const openModal = (item) => {
  isModalOpen.value = true;
};

console.log(props.post.user, "pr");

onMounted(async () => {
  // console.log(props.post);
});
</script>

<style></style>
