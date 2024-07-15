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
        <div class="sm:w-5/12 w-full sm:h-full h-3/6">
          <img
            :src="post.image"
            alt="Image"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          class="text sm:w-3/6 w-full h-3/6 sm:h-full relative flex flex-col gap-5"
        >
          <div
            class="flex justify-between pt-0 sm:pt-2.5 items-center cursor-pointer px-2"
          >
            <ProfileCard :username="user?.fullname" :image="user?.image" />
            <i
              class="pi pi-trash"
              @click="showdelete"
              v-if="post.userid == logginUser.id"
            ></i>
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
          <div class="flex gap-3 flex-col h-96 overflow-auto px-2">
            <div class="flex gap-3 items-center">
              <ProfileCard :username="user?.username" :image="user?.image" />

              <p>{{ post.caption }}</p>
            </div>
            <Comments
              v-for="item in post.comments"
              :key="item"
              :data="item"
              :post="post"
            />
          </div>
          <!-- {{ inputValue }} -->
          <InputComment
            class="absolute bottom-5 border-t"
            v-model:value="inputValue"
            :post="post"
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
import { deletePost } from "@/services/post.js";
import InputComment from "./InputComment.vue";
import Comments from "./Comments.vue";

const store = usedataStore();

const logginUser = computed(() => store.getLoggedInUser);

const props = defineProps({
  post: Object,
  user: Object,
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
