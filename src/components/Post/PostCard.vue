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
    :user="user"
    @close="isModalOpen = false"
  />
</template>

<script setup>
import ViewPost from "./ViewPost.vue";
import { ref } from "vue";

const props = defineProps({
  post: Object,
  user: Object,
});

const isModalOpen = ref(false);

const openModal = (item) => {
  isModalOpen.value = true;
};

// console.log(props.user, "pr");
</script>

<style></style>
