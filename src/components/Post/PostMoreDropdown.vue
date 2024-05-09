<template>
  <div
    @click="emit('close')"
    class="fixed inset-0 flex items-center cursor-pointer justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white flex-col rounded-md flex w-8/12 md:w-4/12 font-medium h-fit"
    >
      <button class="p-3 w-full text-center text-sm border-b">follow</button>

      <button class="p-3 w-full text-center text-sm border-b">
        Add to favorites
      </button>
      <button class="p-3 w-full text-center text-sm border-b">Cancel</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);
</script>

<style></style>
