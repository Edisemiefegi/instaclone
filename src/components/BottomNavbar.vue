<template>
  <div class="flex w-full fixed bg-white bottom-0 left-0 right-0">
    <MenuItems
      v-for="(menu, index) in menuList"
      :key="index"
      :icon="menu?.icon"
      :label="menu.label"
      :path="menu?.path"
      @click="handleMenuClick(menu)"
    />
    <CreatePost v-if="newPost" @close="newPost = false" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItems from "@/components/MenuItems.vue";
import CreatePost from "@/components/Post/CreatePost.vue";

import { usedataStore } from "@/stores/dataStore";

const store = usedataStore();
const route = useRoute();
const router = useRouter();

const logginUser = computed(() => store.getLoggedInUser);

const newPost = ref(false);

const menuList = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    path: "/",
    routeName: "Home",
  },

  {
    label: "Create",
    icon: "pi pi-plus-circle",
    path: null,
    routeName: null,
    action: () => {
      newPost.value = true;
    },
  },
  {
    label: "Profile",
    icon: "pi pi-image",
    path: null,
    routeName: null,
    action: () => {
      router.push(`/${logginUser.value.username}`);
      console.log("clicked");
    },
  },
]);

const handleMenuClick = (menu) => {
  if (menu?.routeName) {
    router.push({ name: menu.routeName });
    return;
  }
  if (menu.action) {
    menu.action();
  }
};
</script>

<style></style>
