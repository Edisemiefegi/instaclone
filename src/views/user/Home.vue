<template>
  <main class="flex gap-20 w-11/12 md:w-9/12 lg:w-10/12 mx-auto">
    <div class="flex flex-col gap-5 w-full lg:w-9/12">
      <!-- <button class="bg-blue-500 w-fit text-white p-2" @click="logoutfunc">
      logout
    </button> -->

      <HomePostCard v-for="item in allposts" :key="item" :post="item" />
    </div>

    <div class="hidden lg:block w-5/12 h-96 border-2">
      <div
        class="bg-white flex flex-col gap-5 border"
        v-for="item in 5"
        :key="item"
      >
        <ProfileCard
          :username="logginUser.username"
          :fullname="logginUser.fullname"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usedataStore } from "@/stores/dataStore";
import { getAllUsersPosts } from "@/services/user.js";
import HomePostCard from "@/components/Post/HomePostCard.vue";
import ProfileCard from "@/components/ProfileSection/ProfileCard.vue";

const store = usedataStore();
const router = useRouter();

const logginUser = computed(() => store.getLoggedInUser);

const allposts = computed(() => store.allPosts);
console.log("All Post", allposts.value);

onMounted(() => {
  getAllUsersPosts();
});

// const logoutfunc = () => {
// };
</script>

<style></style>
