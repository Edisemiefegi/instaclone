<template>
  <div
    class="fixed inset-0 flex items-center cursor-pointer justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white flex-col rounded-md flex w-8/12 md:w-4/12 font-medium h-fit"
    >
      <button
        class="p-3 w-full text-center text-sm border-b"
        @click="followUser()"
      >
        <span v-if="following"> Unfollow</span> <span v-else>follow</span>
      </button>

      <button class="p-3 w-full text-center text-sm border-b" @click="savefunc">
        Add to favorites
      </button>
      <button
        class="p-3 w-full text-center text-sm border-b"
        @click="emit('close')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { usedataStore } from "@/stores/dataStore.js";
import { FollowingUsers } from "@/services/user.js";

import { ref, computed } from "vue";

const props = defineProps({
  user: Object,
});

console.log(props.user, props.user.id, "if");

const store = usedataStore();
const Users = computed(() => store.users);

const logginUser = computed(() => store.getLoggedInUser);

const following = computed(() =>
  logginUser.value.following.find((e) => e.id === props.user.id)
);
// console.log(following.value, "folo", logginUser.value.following, props.user.id);

const emit = defineEmits(["close", "handelSave"]);

const savefunc = () => {
  emit("handelSave");
  emit("close");
};

const followUser = async () => {
  console.log(logginUser.value, props.user, "pep");
  await FollowingUsers(props.user);
};
</script>

<style></style>
