<template>
  <div
    :class="[background, disabled ? 'opacity-50' : '']"
    class="border rounded relative h-[42px] overflow-hidden flex"
  >
    <input
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputStyle"
      class="w-full h-full cursor-pointer bg-transparent text-[0.8rem] focus:outline-none px-2 appearance-none"
    />

    <div
      v-if="$slots.prepend"
      :class="background"
      class="h-full cursor-pointer flex items-center justify-center px-2 text-sm"
    >
      <slot name="prepend" />
    </div>

    <span
      v-if="label && !placeholder"
      :class="labelStyle"
      class="absolute pointer-events-none text-gray-400 font-normal transition-all duration-100"
    >
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  placeholder: String,
  label: String,
  modelValue: String,
  disabled: Boolean,
  prepend: String,
  background: {
    type: String,
    default: "bg-gray-50/50",
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputStyle = computed(() => {
  let style = " ";

  if (props.modelValue && !props.placeholder) {
    style += "pt-2";
  }

  return style;
});

const labelStyle = computed(() => {
  let style = "";

  if (props.modelValue) {
    style = "left-2 top-[0.3px] text-[0.7rem]";
  } else {
    style = "left-2 text-[0.8rem] top-1/2 -translate-y-1/2";
  }

  return style;
});
</script>

<style></style>
