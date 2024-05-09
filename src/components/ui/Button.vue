<template>
  <button
    :type="type"
    :style="variantStyle"
    :class="[mainStyle]"
    v-bind="$attrs"
  >
    <slot v-if="!loading" />

    <div v-else class="relative">
      <span class="opacity-0">
        <slot />
      </span>

      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span class="loader"></span>
      </div>
    </div>
  </button>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "Button",
  },

  loading: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
  block: Boolean,

  color: {
    type: String,
    default: "primary",
  },

  size: {
    type: String,
    default: "medium", //small medium large
  },

  variant: {
    type: String,
    default: "fill", //fill text outline
  },
});

const colorCodes = {
  primary: "#000000",
  secondary: "#2979FF",
  info: "#2196F3",
  success: "#00C853",
  warning: "#FFAB00",
  error: "#F44336",
};

const loaderColor = ref("#ffff");

const mainStyle = computed(() => {
  let style = "border rounded-lg hover:opacity-90 font-medium";
  let disabledStyle = props.disabled ? "opacity-50 pointer-events-none" : "";
  let loadingStyle = props.loading ? "pointer-events-none" : "";
  let blockStyle = props.block ? "w-full" : "w-fit";

  return [style, disabledStyle, blockStyle, loadingStyle, sizeStyle.value];
});

const variantStyle = computed(() => {
  let color = colorCodes[props.color] || "#000000";
  let background, text, border;

  if (props.variant === "outline") {
    background = "transparent";
    text = color;
    border = color;
    loaderColor.value = color;
  } else if (props.variant === "text") {
    background = "transparent";
    text = color;
    border = "transparent";
    loaderColor.value = color;
  } else {
    background = color;
    text = "white";
    border = "transparent";
    loaderColor.value = "#ffff";
  }
  return `background-color:${background}; color:${text}; border-color:${border}`;
});

const sizeStyle = computed(() => {
  switch (props.size) {
    case "large":
      return "py-3.5 px-6 text-base";
    case "small":
      return "py-1.5 px-3 text-xs";
    default:
      return "py-2.5 px-4 text-sm";
  }
});
</script>

<style scope>
.loader {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  color: v-bind(loaderColor);
  left: -100px;
  box-sizing: border-box;
  animation: shadowRolling 2s linear infinite;
}

@keyframes shadowRolling {
  0% {
    box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  12% {
    box-shadow: 100px 0 v-bind(loaderColor), 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  25% {
    box-shadow: 110px 0 v-bind(loaderColor), 100px 0 v-bind(loaderColor),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  36% {
    box-shadow: 120px 0 v-bind(loaderColor), 110px 0 v-bind(loaderColor),
      100px 0 v-bind(loaderColor), 0px 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 130px 0 v-bind(loaderColor), 120px 0 v-bind(loaderColor),
      110px 0 v-bind(loaderColor), 100px 0 v-bind(loaderColor);
  }
  62% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 v-bind(loaderColor),
      120px 0 v-bind(loaderColor), 110px 0 v-bind(loaderColor);
  }
  75% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      130px 0 v-bind(loaderColor), 120px 0 v-bind(loaderColor);
  }
  87% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      200px 0 rgba(255, 255, 255, 0), 130px 0 v-bind(loaderColor);
  }
  100% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
  }
}
</style>
