<template>
  <div class="flex gap-4 items-center">
    <div class="w-12 h-12 rounded-full bg-slate-700">
      <img
        :src="logginUser.image"
        alt=""
        class="rounded-full w-full h-full object-cover"
      />
    </div>
    <div>
      <p class="font-medium text-sm">{{ logginUser.username }}</p>
      <p class="text-gray-600 text-sm">{{ logginUser.fullname }}</p>
    </div>
  </div>
</template>

<script setup>
import { usedataStore } from "@/stores/dataStore";
import { onMounted, computed, ref } from "vue";

const store = usedataStore();

const logginUser = computed(() => store.getLoggedInUser);
</script>

<style></style>
