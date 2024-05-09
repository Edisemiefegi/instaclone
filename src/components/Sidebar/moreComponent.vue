<template>
  <div class="bg-white rounded-md shadow-md w-64 h-fit p-2">
    <MenuItems
      v-for="(menu, index) in moreList"
      :key="index"
      :icon="menu?.icon"
      :label="menu.label"
      :path="menu?.path"
      @click="handleMenuClick(menu)"
      dontShrink
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { useRoute, useRouter } from "vue-router";
import MenuItems from "../MenuItems.vue";
import { usedataStore } from "@/stores/dataStore";
import { signoutfunc } from "@/services/auth.js";

const store = usedataStore();
const router = useRouter();
const route = useRoute();

const collapsed = computed(() => store.collapsed);

const moreList = ref([
  {
    label: "Setting",
    icon: "pi pi-cog",
    path: "/accounts",
    routeName: "SettingsPage",
  },
  {
    label: "Saved",
    icon: "pi pi-bookmark",
    path: "/:",
    routeName: null,
  },
  {
    label: "Log out",
    icon: null,
    path: "/auth",
    routeName: "Auth",
  },
]);

const handleMenuClick = (menu) => {
  if (menu?.routeName) {
    router.push({ name: menu.routeName });

    return;
  }
  if (menu.label == "Saved") {
    const username = logginUser.value?.username;
    router.push(`/${username}?tab=${"saved"}`);
  }
  if (menu.label == "Log Out") {
    signoutfunc(logginUser.value);
    console.log("logout");
  }
};

const logginUser = computed(() => store.getLoggedInUser);
</script>

<style></style>
