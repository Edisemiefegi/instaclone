<template>
  <main class="flex flex-col gap-4 border-b">
    <div class="flex items-center w-full justify-between">
      <div class="flex gap-2 items-center cursor-pointer">
        <div class="rounded-full w-10 h-10 bg-black"></div>
        <p class="text-sm font-medium">Username</p>
        <p class="text-sm text-gray-300">7 h</p>
      </div>
      <i class="pi pi-ellipsis-h cursor-pointer" @click="showMore = true"></i>
    </div>
    <div v-if="showMore">
      <PostMoreDropdown @close="showMore = false" />
    </div>

    <div class="bg-gray-400 w-full h-[520px] rounded-md"></div>

    <div class="flex justify-between text-2xl">
      <div>
        <i class="pi pi-heart"></i>
        <i class="pi pi-comment pi-"></i>
      </div>
      <i class="pi pi-bookmark"></i>
    </div>

    <p>62 likes</p>

    <div class="line-clamp-3">
      <p>
        caption Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ut,
        corporis tempore nemo similique voluptatibus mollitia sint rem maxime
        repellendus! Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <p class="text-gray-400">View all 12 comments</p>
    </div>

    <input
      type="text"
      class="w-full text-sm outline-none pb-5"
      name=""
      id=""
      placeholder="Add a comment..."
    />
  </main>
</template>

<script setup>
import { ref } from "vue";
import PostMoreDropdown from "./PostMoreDropdown.vue";

const showMore = ref(false);

const closeMore = () => {
  showMore.value = false;
};
</script>

<style></style>
