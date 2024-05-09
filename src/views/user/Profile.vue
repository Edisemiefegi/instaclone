<template>
  <main class="px-4 w-full md:w-10/12 mx-auto flex flex-col gap-8">
    <div class="md:px-10 px-0">
      <UserProfile :data="user" :isLoggedIn="isUserLoggedIn" />
      <HighlightVue />
    </div>

    <div class="flex flex-col border-t items-center justify-center">
      <div class="flex gap-5">
        <button
          :class="[
            activeTab == 'post' ? ' border-t-2 border-black' : 'text-gray-400',
          ]"
          @click="activeTab = 'post'"
          class="flex text-xs p-2.5 font-bold justify-center items-center gap-2"
        >
          <i class="pi pi-table"></i>
          <p>POSTS</p>
        </button>
        <button
          v-if="isUserLoggedIn"
          :class="[
            activeTab == 'saved' ? ' border-t-2 border-black' : 'text-gray-400',
          ]"
          class="flex text-xs font-bold p-2.5 justify-center items-center gap-2"
          @click="activeTab = 'saved'"
        >
          <i class="pi pi-bookmark"></i>
          <p>SAVED</p>
        </button>
      </div>
    </div>

    <AllPost :posts="userPosts" v-if="activeTab == 'post'" />
    <SavedPost v-if="activeTab == 'saved'" />
  </main>
</template>

<script setup>
import MenuItems from "@/components/MenuItems.vue";
import HighlightVue from "../../components/Highlight.vue";
import AllPost from "@/components/Post/AllPost.vue";
import SavedPost from "@/components/Post/SavedPost.vue";
import UserProfile from "@/components/ProfileSection/UserProfile.vue";

import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usedataStore } from "@/stores/dataStore";
import { onMounted } from "vue";

const store = usedataStore();
const router = useRouter();
const route = useRoute();

const activeTab = computed({
  get() {
    return route.query?.tab;
  },
  set(val) {
    const username = loggedinUser.value?.username;
    router.push(`/${username}?tab=${val}`);
  },
});

const username = computed(() => route.params?.username);
const loggedinUser = computed(() => store.getLoggedInUser);

//Check if the username belongs to the loggedin user
const isUserLoggedIn = computed(() => {
  return username.value === loggedinUser.value?.username;
});

const user = ref(null);
const userPosts = ref([1]);
const savedPosts = ref([]);

watch(activeTab, () => {
  if (!activeTab.value) {
    activeTab.value = "post";
  }
});

onMounted(() => {
  if (!activeTab.value) {
    activeTab.value = "post";
  }

  //check if username belongs to the loggedin user
  if (isUserLoggedIn.value) {
    user.value = loggedinUser.value;
  } else {
    //get the user details from firebase and return
  }
});
</script>

<style></style>
