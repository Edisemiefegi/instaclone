<template>
  <div v-if="open" class="container">
    <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <i
        @click="closeModal"
        class="absolute top-0 right-0 m-4 cursor-pointer pi pi-times text-white font-bold"
      >
      </i>

      <div
        class="bg-white flex-col sm:flex-row flex w-10/12 h-[90%] rounded-sm"
      >
        <div class="sm:w-5/12 w-full h-full bg-slate-700">
          <img src="" alt="Image" />
        </div>
        <div class="text p-2">
          <p>This is some text.</p>
          <input
            type="text"
            placeholder="Enter something..."
            v-model="inputValue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  post: Number,
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);

const inputValue = ref("");

const closeModal = () => {
  console.log("Clicked");
  emit("close");
};
</script>

<style scoped></style>
