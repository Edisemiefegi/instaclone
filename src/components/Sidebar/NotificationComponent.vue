<template>
  <div class="bg-white fixed h-full">
    <div class="p-4 flex flex-col gap-4">
      <h1 class="font-bold text-2xl">Notifications</h1>

      <div v-for="notification in notifications" :key="notification">
        <div class="flex flex-col">
          <div class="flex justify-between items-center gap-2.5">
            <ProfileCard
              class="w-3/4"
              :image="notification.sender.image"
              :username="notification.sender.username"
            />
            <div v-if="notification.type !== 'follow'" class="w-2/12">
              <div
                class="w-full h-30 rounded-md cursor-pointer flex justify-center"
                @click="openModal(notification.post)"
              >
                <img
                  :src="notification.post.image"
                  alt=""
                  class="object-cover w-full h-full rounded-md"
                />
                <ViewPost
                  :open="isModalOpen"
                  :post="notification.post"
                  :user="notification.post.user"
                  @close="isModalOpen = false"
                />
              </div>
            </div>
            <div v-else class="w-3/12">
              <button
                class="p-2 rounded-lg w-full text-center text-white bg-blue-400 text-sm border-b"
                @click="followUser(notification.sender)"
              >
                <span v-if="isFollowing(notification.sender.id)">Unfollow</span>
                <span v-else>follow</span>
              </button>
            </div>
          </div>
          <p class="px-14 w-full">
            {{ notification.message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usedataStore } from "@/stores/dataStore.js";
import { getNotification } from "@/services/notification.js";
import { FollowingUsers } from "@/services/user.js";
import ProfileCard from "../ProfileSection/ProfileCard.vue";
import ViewPost from "@/components/Post/ViewPost.vue";

const isModalOpen = ref(false);

const openModal = (item) => {
  isModalOpen.value = true;
};

const store = usedataStore();

const notifications = computed(() => store.notifications);

const logginUser = computed(() => store.getLoggedInUser);

const isFollowing = (userId) => {
  return logginUser.value.following.find((e) => e.id === userId);
};

const followUser = async (user) => {
  FollowingUsers(user);
};

onMounted(() => {
  getNotification();
});
</script>

<style></style>
