<template>
  <div class="">
    <nav
      class="flex absolute bg-white px-4 top-0 border-b-2 py-1.5 w-full justify-between items-center"
    >
      <p class="font-bold text-lg">Instagram</p>
      <div
        class="border p-1.5 flex justify-center items-center gap-2 rounded-lg bg-slate-200"
      >
        <i class="pi pi-search"></i>
        <input
          v-model="searchtext"
          type="text"
          placeholder="Search"
          class="border outline-none bg-slate-200"
        />
      </div>
      <div class="w-10">
        <MenuItems icon="pi pi-heart" />
      </div>
    </nav>

    <div
      v-if="showSearch"
      class="p-3 bg-white rounded-md w-52 h-fit shadow-sm fixed bottom-0 right-5"
    >
      <div class="flex justify-between">
        <p class="font-medium">Recent</p>
        <p class="text-blue-400 font-medium">Clear All</p>
      </div>
      <div class="flex justify-between">
        <div class="rounded bg-gray-300 w-10 h-10"></div>
        <p>Junejewels</p>
        <i class="pi pi-times"></i>
        {{ searchtext }}
      </div>
    </div>
    {{ searchtext }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import MenuItems from "./MenuItems.vue";

const searchtext = ref("");
const showSearch = ref(false);

if (searchtext.value.trim() !== "") {
  showSearch = true;
}
console.log(searchtext.value);
</script>

<style></style>
