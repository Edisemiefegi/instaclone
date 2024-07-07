<template>
  <div
    class="bg-white border bottom-0 left-16 transition-all ease-out duration-150 w-96 rounded-tr-2xl rounded-br-2xl fixed h-full"
  >
    <div class="flex flex-col p-4 gap-10">
      <p class="text-bold text-2xl">Search</p>
      <div>
        <SearchComponent class="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchComponent from "../search/SearchComponent.vue";
</script>

<style></style>
