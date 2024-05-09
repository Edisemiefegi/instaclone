<template>
  <div
    :class="[collapsed ? ' w-[65px]' : 'w-[65px] lg:w-[250px]']"
    class="flex-shrink-0 border-r-2 bg-white flex flex-col gap-5 transition-all ease-in-out duration-150 p-3"
  >
    <div class="flex flex-col gap-5 w-full justify-center relative">
      <div class="hidden sm:block">
        <MenuItems label="Intagram" icon="pi pi-instagram" />
      </div>

      <div class="flex flex-col gap-1">
        <MenuItems
          v-for="(menu, index) in menuList"
          :key="index"
          :icon="menu?.icon"
          :label="menu.label"
          :path="menu?.path"
          @click="handleMenuClick(menu)"
        />
        <div v-on-click-outside="closeSearch">
          <Search v-if="showSearch && collapsed" />
        </div>
      </div>
      <div
        v-if="showMore"
        v-on-click-outside="closeMore"
        class="absolute bottom-12 left-10"
      >
        <moreComponent />
      </div>
      <div>
        <CreatePost v-if="newPost" @close="newPost = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuItems from "../MenuItems.vue";
import moreComponent from "./moreComponent.vue";
import CreatePost from "../Post/CreatePost.vue";
import Search from "./Search.vue";

import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usedataStore } from "@/stores/dataStore";
import { vOnClickOutside } from "@vueuse/components";

const store = usedataStore();
const router = useRouter();
const route = useRoute();

const logginUser = computed(() => store.getLoggedInUser);

const collapsed = computed(() => store.collapsed);
const showMore = ref(false);
const showSearch = ref(false);
const newPost = ref(false);

const closeMore = () => {
  showMore.value = false;
};
const closeSearch = () => {
  showSearch.value = false;
};

const menuList = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    path: "/",
    routeName: "Home",
  },
  {
    label: "Search",
    icon: "pi pi-search",
    path: null,
    routeName: null,
    action: () => {
      store.$patch({
        collapsed: !collapsed.value,
      });
      showSearch.value = true;
      console.log(collapsed.value);
    },
  },
  {
    label: "Explore",
    icon: "pi pi-compass",
    path: "/explore",
    routeName: "ExplorePage",
  },
  {
    label: "Notifications",
    icon: "pi pi-heart",
    path: null,
    routeName: null,
    action: () => {
      store.$patch({
        collapsed: !collapsed.value,
      });
      console.log(collapsed.value);
    },
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
    },
  },
  {
    label: "More",
    icon: "pi  pi-bars",
    path: null,
    routeName: null,
    action: () => {
      store.$patch({
        collapsed: false,
      });

      showMore.value = !showMore.value;
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
