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
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItems from "@/components/MenuItems.vue";

const router = useRouter();

const menuList = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    path: "/",
    routeName: "Home",
  },

  {
    label: "Explore",
    icon: "pi pi-compass",
    path: "/explore",
    routeName: "ExplorePage",
  },

  {
    label: "Create",
    icon: "pi pi-plus-circle",
    path: null,
    routeName: null,
  },
  {
    label: "Profile",
    icon: "pi pi-image",
    path: "/profile",
    routeName: "ProfilePage",
  },
]);

const handleMenuClick = (menu) => {
  if (menu?.routeName) {
    router.push({ name: menu.routeName });
    return;
  }
};
</script>

<style></style>
