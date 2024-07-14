<template>
  <div class="">
    <nav
      class="flex absolute bg-white px-4 top-0 border-b-2 py-1.5 w-full justify-between items-center"
    >
      <p class="font-bold text-lg">Instagram</p>
      <div
        class="border p-1.5 flex justify-center items-center gap-2 rounded-lg w-4/5 bg-slate-200"
      >
        <i class="pi pi-search cursor-pointer"></i>
        <input
          v-model="searchQuery"
          @focus="showSearch = true"
          type="text"
          placeholder="Search"
          class="border outline-none border-none bg-slate-200"
        />
      </div>
      <div class="w-10">
        <MenuItems icon="pi pi-heart" @click="showNotifications" />
      </div>
    </nav>
    <div v-if="showSearch">
      <SearchComponent
        class="fixed right-2 p-2 top-1.5 border-2 border-t-0 rounded-md h-full w-3/4"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, provide } from "vue";
import SearchComponent from "./search/SearchComponent.vue";
import MenuItems from "./MenuItems.vue";
import { useRouter } from "vue-router";

const searchtext = ref("");
const showSearch = ref(false);
const searchQuery = ref("");

const closeSearch = () => {
  showSearch.value = false;
};
provide("closeSearch", closeSearch);

const router = useRouter();

const showNotifications = () => {
  router.push({ name: "NotificationPage" });
};

// console.log(searchtext.value);
</script>

<style></style>
