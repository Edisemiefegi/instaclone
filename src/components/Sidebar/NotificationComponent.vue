<template>
  <div class="bg-white fixed h-full">
    <div class="p-4">
      <h1 class="font-bold text-2xl">Notifications</h1>

      <div v-for="notification in notifications" :key="notification">
        <div class="flex justify-between items-center">
          <ProfileCard
            :image="notification.sender.image"
            :username="notification.sender.username"
          />

          <p>
            {{ notification.message }}
          </p>
          <div
            class="w-16 h-16 rounded-md cursor-pointer"
            @click="openModal(notification.post)"
          >
            <img
              :src="notification.post.image"
              alt=""
              class="object-contain w-full overflow-hidden"
            />
            <ViewPost
              :open="isModalOpen"
              :post="notification.post"
              :user="notification.post.user"
              @close="isModalOpen = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usedataStore } from "@/stores/dataStore.js";
import { getNotification } from "@/services/notification.js";

import ProfileCard from "../ProfileSection/ProfileCard.vue";
import ViewPost from "@/components/Post/ViewPost.vue";

const isModalOpen = ref(false);

const openModal = (item) => {
  isModalOpen.value = true;
};

const store = usedataStore();

const notifications = computed(() => store.notifications);

console.log(notifications.value, "ted");

const Getuser = async () => {
  const user = await getUserByID();
};

onMounted(() => {
  getNotification();
});
</script>

<style></style>
