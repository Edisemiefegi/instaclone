<template>
  <main class="flex gap-20 w-11/12 md:w-9/12 lg:w-10/12 mx-auto">
    <div class="flex flex-col gap-5 w-full lg:w-9/12">
      <div v-if="!allposts.length" class="flex flex-col gap-4 border-b">
        <div class="flex items-center w-full justify-between">
          <div class="flex gap-2 items-center cursor-pointer">
            <ProfileCard
              :username="logginUser?.username"
              :image="logginUser?.image"
            />
            <p class="text-sm text-gray-300">7 h</p>
          </div>
          <i class="pi pi-ellipsis-h cursor-pointer"></i>
        </div>

        <div
          class="w-full h-[520px] rounded-md bg-slate-400 flex gap-5 flex-col justify-center items-center"
        >
          <p class="text-5xl text-white font-bold">Welcome to Instagram</p>
          <p class="w-96 text-center text-white font-bold text-lg">
            For better experince please follow people you are interested in to
            see their daily activities.
          </p>
        </div>

        <div class="flex justify-between text-2xl">
          <div>
            <i class="pi pi-heart cursor-pointer text-red-400 w-fit"></i>
            <i class="pi pi-comment cursor-pointer"></i>
          </div>
          <i class="pi pi-bookmark cursor-pointer text-red-400 w-fit"></i>
        </div>

        <div class="line-clamp-3">
          <p>Welcome {{ logginUser.username }}</p>
          <p class="text-gray-400 cursor-pointer">View all comments</p>
        </div>
      </div>

      <HomePostCard v-for="item in allposts" :key="item" :post="item" />
    </div>

    <div class="hidden lg:block w-5/12 h-96 border-2">
      <div
        class="bg-white flex flex-col gap-5 border"
        v-for="item in 5"
        :key="item"
      >
        <ProfileCard
          :username="logginUser?.username"
          :fullname="logginUser?.fullname"
        />
      </div>
    </div>
    <iconLoader v-if="loader" />
  </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usedataStore } from "@/stores/dataStore";
import { getAllUsersPosts } from "@/services/post.js";
import HomePostCard from "@/components/Post/HomePostCard.vue";
import ProfileCard from "@/components/ProfileSection/ProfileCard.vue";
import iconLoader from "../../components/iconLoader.vue";

const store = usedataStore();

const loader = ref(false);

const logginUser = computed(() => store.getLoggedInUser);

const allposts = computed(() => store.allPosts);

onMounted(() => {
  try {
    loader.value = true;
    getAllUsersPosts();
  } catch (error) {
  } finally {
    loader.value = false;
  }
});
</script>

<style></style>
