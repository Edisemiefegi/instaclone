<template>
  <div class="flex justify-between items-center w-full">
    <input
      class="outline-none w-full p-2"
      type="text"
      placeholder="Add a comment..."
      :value="value"
      @input="updateValue($event.target.value)"
    />
    <button
      v-if="value"
      @click="postcomment"
      :disabled="load"
      :class="load ? 'hidden' : 'block'"
      class="text-blue-400 font-medium"
    >
      Post
    </button>
    <div
      v-if="load"
      class="rounded-full w-6 h-6 bg-blue-500 animate-spin flex justify-center items-center"
    >
      <div class="rounded-full w-4 h-4 bg-slate-500"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { addComments } from "@/services/user.js";
import { usedataStore } from "@/stores/dataStore.js";

const store = usedataStore();

const props = defineProps({
  value: String,
  post: Object,
});

const emit = defineEmits(["update:value"]);

const inputValue = ref(props.value);
const load = ref(false);

const updateValue = (newValue) => {
  emit("update:value", newValue);
};

watch(
  () => props.value,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const postcomment = async () => {
  try {
    load.value = true;

    await addComments(props.post, inputValue.value);

    emit("update:value", "");
  } catch (error) {
  } finally {
    load.value = false;
  }
};
</script>

<style></style>
