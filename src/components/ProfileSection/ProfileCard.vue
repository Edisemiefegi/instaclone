<template>
  <div class="flex gap-4 items-center">
    <div
      class="w-12 h-12 rounded-full bg-slate-200 flex justify-center items-center"
    >
      <img
        v-if="image"
        :src="image"
        alt=""
        class="rounded-full w-full h-full object-cover"
      />
      <i class="pi pi-image" v-else></i>
    </div>
    <div>
      <p class="font-medium text-sm">{{ username }}</p>
      <p class="text-gray-600 text-sm">{{ fullname }}</p>
    </div>
  </div>
</template>

<script setup>
import { usedataStore } from "@/stores/dataStore";
import { onMounted, computed, ref } from "vue";

const store = usedataStore();

const props = defineProps({
  fullname: String,
  username: String,
  image: String,
});

const logginUser = computed(() => store.getLoggedInUser);
</script>

<style></style>
