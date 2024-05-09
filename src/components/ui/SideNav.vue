<template>
  <div
    @click="handleActiveNav(label)"
    :class="{ 'font-bold': active }"
    class="flex p-3 hover:bg-gray-200 rounded-lg transition-all cursor-pointer gap-2 items-center w-full"
  >
    <i v-if="icon" :class="{ 'text-xl mr-2': true, pi: true, [icon]: true }" />
    <p v-if="label" class="hidden lg:block">{{ label }}</p>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";

const props = defineProps({
  label: String,
  icon: String,
  iconColor: {
    type: String,
    default: "gray-400",
  },
});

const active = ref(false);
const currentlyBold = ref(null);

const handleActiveNav = (label) => {
  active.value = true;
};
</script>

<style scoped>
/* Same styles as before */
</style>
