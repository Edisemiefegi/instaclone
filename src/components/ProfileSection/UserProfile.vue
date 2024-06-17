<template>
  <div class="flex justify-center gap-20 w-full">
    <div class="w-2/12 md:block hidden">
      <div
        @click="changeProfile = true"
        class="rounded-full w-32 h-32 cursor-pointer bg-slate-300 flex justify-center items-center"
      >
        <i class="pi pi-image text-[40px]" v-if="!user?.image"></i>

        <img
          v-else
          :src="user?.image"
          alt=""
          class="w-full h-full object-cover rounded-full"
        />
      </div>
      <ChangeProfileImg v-if="changeProfile" @close="changeProfile = false" />
    </div>
    <div class="flex flex-col gap-5 w-full md:w-8/12">
      <div class="flex gap-5">
        <div class="rounded-full w-32 h-32 bg-slate-400 md:hidden block"></div>

        <div class="flex md:flex-row flex-col gap-4">
          <p class="text-xl">{{ user?.username }}</p>
          <button
            v-if="isLoggedIn"
            @click="showEdit"
            class="bg-gray-200 hover:bg-gray-300 font-medium text-xs rounded-lg px-3 py-2"
          >
            Edit Profile
          </button>
          <button
            v-else
            @click="followUser"
            :disabled="load"
            :class="load ? 'hidden' : 'block'"
            class="bg-gray-200 hover:bg-gray-300 font-medium text-xs rounded-lg px-3 py-2"
          >
            <span v-if="isFollowingUser">Unfollow</span>
            <span v-else>Follow</span>
          </button>

          <div
            v-if="load"
            class="rounded-full w-6 h-6 bg-blue-300 animate-spin flex justify-center items-center"
          >
            <div class="rounded-full w-4 h-4 bg-slate-500"></div>
          </div>
        </div>
      </div>

      <div class="flex gap-4 text-sm">
        <p>
          <span class="font-medium mr-0.5">{{ userpost?.length }} </span>Posts
        </p>
        <p>
          <span class="font-medium mr-0.5">{{ user?.followers?.length }} </span>
          Followers
        </p>
        <p>
          <span class="font-medium mr-0.5">{{ user?.following?.length }}</span>
          Following
        </p>
      </div>

      <div class="w-full">
        <p class="font-medium">{{ user?.fullname }}</p>
        <p class="text-gray-400 text-sm leading-none">category</p>
        <p class="leading-tight text-sm">
          {{ user?.bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { usedataStore } from "@/stores/dataStore";
import ChangeProfileImg from "../ProfileSection/ChangeProfileImg.vue";
import { useRouter } from "vue-router";
import { FollowingUsers } from "@/services/user.js";

const store = usedataStore();
const router = useRouter();

const props = defineProps({
  user: {
    type: Object,
  },
  userpost: {
    type: Object,
  },

  isLoggedIn: Boolean,
});
const loggedInUserPost = computed(() => store.posts);
const logginUser = computed(() => store.getLoggedInUser);
// console.log(logginUser.value.following, "ssjjjeueu");
// console.log(props.user, "users");

const changeProfile = ref(false);
const load = ref(false);

const showEdit = () => {
  router.push({ name: "SettingsPage" });
};

const isFollowingUser = computed(() => {
  return props.user?.followers.find((e) => e.id == logginUser.value?.id);
});

// console.log(isFollowingUser.value);

const followUser = async () => {
  try {
    load.value = true;
    if (!props.user) return;
    await FollowingUsers(props.user);
  } catch (error) {
  } finally {
    load.value = false;
  }
};
</script>

<style></style>
