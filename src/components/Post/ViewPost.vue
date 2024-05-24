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
        class="bg-white flex-col gap-5 sm:flex-row flex w-10/12 h-[90%] rounded-sm"
      >
        <div class="sm:w-5/12 w-full h-full">
          <img
            :src="post.image"
            alt="Image"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="text w-6/12 pt-4 relative flex flex-col gap-5">
          <div class="flex justify-between items-center cursor-pointer">
            <ProfileCard :username="logginUser.username" />
            <i class="pi pi-trash" @click="showdelete"></i>
            <div
              class="w-fit flex flex-col gap-2 p-3 rounded-lg absolute bg-black/10 top-16 -right-4"
              v-if="show"
            >
              <p class="text-sm">This post will be deleted permanently</p>
              <button
                class="w-full bg-blue-400 text-sm rounded-sm text-white"
                @click="handleDeletePost"
              >
                ok
              </button>
            </div>
          </div>
          <div class="border-b w-full"></div>
          <div class="flex gap-3 items-center">
            <ProfileCard :username="logginUser.username" />

            <p>{{ post.caption }}</p>
          </div>
          <input
            class="outline-none w-full absolute bottom-5 border-t p-2"
            type="text"
            placeholder="Add a comment..."
            v-model="inputValue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from "@/components/ProfileSection/ProfileCard.vue";
import { usedataStore } from "@/stores/dataStore.js";
import { ref, computed, onMounted } from "vue";
import { deletePost } from "@/services/user.js";

const store = usedataStore();

const logginUser = computed(() => store.getLoggedInUser);

const props = defineProps({
  post: Object,
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);

const show = ref(false);

const inputValue = ref("");

const closeModal = () => {
  console.log("Clicked");
  emit("close");
};

const showdelete = () => {
  show.value = true;
  console.log("showdelete", show.value);
};

const handleDeletePost = async () => {
  await deletePost(props.post.postid);
  show.value = false;
};
</script>

<style scoped></style>
