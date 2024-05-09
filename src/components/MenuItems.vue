<template>
  <div
    :class="[collapsed ? 'justify-center ' : '', active ? 'font-bold' : '']"
    class="flex p-3 hover:bg-gray-100 rounded-lg transition-all cursor-pointer gap-2 items-center w-full"
  >
    <i
      v-if="icon"
      :class="['text-xl mx-auto sm:mx-0', active ? 'font-bold' : '', icon]"
    />
    <p
      v-if="label"
      :class="[
        collapsed ? 'hidden ' : hiddenOnLowerScreen,
        'transition-all ease-in-out duration-150',
      ]"
    >
      {{ label }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usedataStore } from "@/stores/dataStore";

const store = usedataStore();

const collapsed = computed(() => store.collapsed);
const route = useRoute();

const props = defineProps({
  label: String,
  icon: String,
  path: String,
  dontShrink: {
    type: Boolean,
    default: false,
  },
});

//if the current route path is thesame as the menu path then its active
const active = computed(() => route.path === props.path);
const hiddenOnLowerScreen = computed(() => {
  return !props.dontShrink ? "hidden lg:block" : "";
});
</script>

<style scoped>
/* Same styles as before */
</style>
