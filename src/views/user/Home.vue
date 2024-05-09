<template>
  <main class="flex gap-20 w-11/12 md:w-9/12 lg:w-10/12 mx-auto">
    <div class="flex flex-col gap-5 w-full lg:w-9/12">
      <!-- <button class="bg-blue-500 w-fit text-white p-2" @click="logoutfunc">
      logout
    </button> -->

      <HomePostCard v-for="item in 4" :key="item" />
    </div>
    <div class="hidden lg:block w-5/12 h-96 border-2">
      <div
        class="bg-white flex flex-col gap-5 border"
        v-for="item in 5"
        :key="item"
      >
        <ProfileCard />
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usedataStore } from "@/stores/dataStore";
import HomePostCard from "@/components/Post/HomePostCard.vue";
import ProfileCard from "@/components/ProfileSection/ProfileCard.vue";

const store = usedataStore();

const logginUser = computed(() => store.getLoggedInUser);
console.log(logginUser.value);

const router = useRouter();

// const logoutfunc = () => {
// };
</script>

<style></style>
