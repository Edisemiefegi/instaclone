<template>
  <main v-if="post" class="flex flex-col gap-4 border-b">
    <div class="flex items-center w-full justify-between">
      <div class="flex gap-2 items-center cursor-pointer">
        <ProfileCard
          :username="post?.user?.username"
          :image="post?.user?.image"
        />
        <p class="text-sm text-gray-300">7 h</p>
      </div>
      <i class="pi pi-ellipsis-h cursor-pointer" @click="showMore = true"></i>
    </div>
    <div v-if="showMore">
      <PostMoreDropdown @close="showMore = false" />
    </div>

    <div class="w-full h-[520px] rounded-md">
      <img :src="post.image" alt="" class="w-full h-full object-cover" />
    </div>

    <div class="flex justify-between text-2xl">
      <div>
        <i
          @click="handelSavePostLikes"
          class="pi pi-heart cursor-pointer"
          :class="liked ? 'text-red-400 w-fit' : ''"
        ></i>
        <i class="pi pi-comment cursor-pointer"></i>
      </div>
      <i
        class="pi pi-bookmark cursor-pointer"
        @click="handelSavePost"
        :class="saved ? 'text-red-400 w-fit' : ''"
      ></i>
    </div>

    <p>{{ post.likes }}</p>

    <div class="line-clamp-3">
      <p>
        {{ post.caption }}
      </p>
      <p class="text-gray-400">View all {{ post.comments }} comments</p>
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
import PostMoreDropdown from "./PostMoreDropdown.vue";
import ProfileCard from "../ProfileSection/ProfileCard.vue";
import { usedataStore } from "@/stores/dataStore.js";
import { onMounted, computed, ref } from "vue";
import { addLikesToPost } from "@/services/user.js";

const showMore = ref(false);
const saved = ref(false);
const liked = ref(false);

const store = usedataStore();

const closeMore = () => {
  showMore.value = false;
};

const props = defineProps({
  post: Object,
});
const handelSavePost = async () => {
  saved.value = !saved.value;
  // if (saved.value) {
  //   savePosts();
  // }

  console.log("saved", saved.value);
};

const handelSavePostLikes = () => {
  liked.value = !liked.value;
  if (liked.value) {
    addLikesToPost(props.post.postid);
  }
};
</script>

<style></style>
