import { ref, watch } from "vue";

export const useDebounce = (value, delay = 500) => {
  const debouncevalue = ref(value.value);

  let timeoutId;

  watch([value], (newVal, _, cleanup) => {
    timeoutId = setTimeout(() => {
      debouncevalue.value = newVal;
    }, delay);

    cleanup(() => clearTimeout(timeoutId));
  });

  return debouncevalue;
};
