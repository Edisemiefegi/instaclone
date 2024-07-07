<template>
  <div class="flex justify-between items-center relative">
    <div class="flex gap-3 items-center">
      <ProfileCard
        :username="data.users.user.username"
        :image="data.users.user.image"
      />

      <p>{{ data.message }}</p>
    </div>
    <i
      class="pi pi-trash cursor-pointer"
      @click="show = true"
      v-if="userCommentDelete"
    ></i>
    <div
      class="w-fit flex flex-col gap-2 p-3 rounded-lg absolute bg-black/10 right-5"
      v-if="show"
    >
      <p class="text-xs">This comment will be deleted permanently</p>
      <div class="flex gap-3 justify-center">
        <button
          class="w-10 p-1 bg-blue-400 text-xs rounded-sm text-white"
          @click="handleDeletePost"
        >
          ok
        </button>
        <button
          class="w-fit p-1 bg-blue-400 text-xs rounded-sm text-white"
          @click="show = false"
        >
          cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from "@/components/ProfileSection/ProfileCard.vue";
import { ref, computed, onMounted } from "vue";
import { usedataStore } from "@/stores/dataStore.js";
import { deletecomment } from "@/services/post.js";
const store = usedataStore();

const props = defineProps({
  data: Object,
  post: Object,
});

// console.log(props.data, props.data.users.user.username);
const show = ref(false);
const deletebtn = ref(false);
const logginUser = computed(() => store.getLoggedInUser);

const userCommentDelete = computed(
  (e) => props.data.users.user.id == logginUser.value.id
);
const handleDeletePost = async () => {
  await deletecomment(props?.post, props?.data?.commentId);
  show.value = false;
};
</script>

<style></style>
