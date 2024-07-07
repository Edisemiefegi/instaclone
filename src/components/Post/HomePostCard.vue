<template>
  <main v-if="post" class="flex flex-col gap-4 border-b">
    <div class="flex items-center w-full justify-between">
      <div class="flex gap-2 items-center cursor-pointer" @click="gotoProfile">
        <ProfileCard
          :username="post?.user?.username"
          :image="post?.user?.image"
        />
        <p class="text-sm text-gray-300">
          {{ formatDate(post?.createdAt) }}
        </p>
      </div>
      <i class="pi pi-ellipsis-h cursor-pointer" @click="showMore = true"></i>
    </div>
    <div v-if="showMore">
      <PostMoreDropdown
        v-for="item in users"
        :key="item"
        :user="item"
        @close="showMore = false"
        @handelSave="handelSavePost()"
      />
    </div>

    <div class="w-full h-[520px] rounded-md">
      <img :src="post.image" alt="" class="w-full h-full object-cover" />
    </div>

    <div class="flex justify-between text-2xl">
      <div>
        <i
          @click="handelPostLikes"
          class="pi pi-heart cursor-pointer"
          :class="liked ? 'text-red-400 w-fit' : ''"
        ></i>
        <i
          class="pi pi-comment cursor-pointer"
          @click="handleComments(post)"
        ></i>
      </div>
      <i
        class="pi pi-bookmark cursor-pointer"
        @click="handelSavePost"
        :class="saved ? 'text-red-400 w-fit' : ''"
      ></i>
    </div>

    <p>{{ post.likedBy?.length }}</p>

    <div class="line-clamp-3">
      <p>
        {{ post.caption }}
      </p>
      <p class="text-gray-400 cursor-pointer" @click="handleComments(post)">
        View all {{ post.comments.length }} comments
      </p>
    </div>
    <InputComment class="w-full pb-4" v-model:value="inputValue" :post="post" />
    <ViewPost
      :open="view"
      :post="post"
      :user="post.user"
      @close="view = false"
    />
  </main>
</template>

<script setup>
import PostMoreDropdown from "./PostMoreDropdown.vue";
import ProfileCard from "../ProfileSection/ProfileCard.vue";
import ViewPost from "./ViewPost.vue";
import { formatDate } from "@/utils/index.js";
import { usedataStore } from "@/stores/dataStore.js";
import { onMounted, computed, ref, watch } from "vue";
import { likeUnlikePost, togglesavePost } from "@/services/post.js";
import InputComment from "./InputComment.vue";
import { useRouter } from "vue-router";

const store = usedataStore();
const router = useRouter();

const showMore = ref(false);
const view = ref(false);
const inputValue = ref("");

const props = defineProps({
  post: Object,
});

const users = computed(() => store.users);

const logginUser = computed(() => store.getLoggedInUser);

const liked = computed(() =>
  props?.post?.likedBy.includes(logginUser.value?.id)
);

const saved = computed(() => {
  return store.PostSaved.find((e) => {
    if (e.post.postid === props.post.postid) {
      return e;
    }
  });
});

const handelSavePost = async () => {
  try {
    let post = props?.post;

    await togglesavePost(post);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const handelPostLikes = async () => {
  let post = props?.post;
  let userid = logginUser.value?.id;
  await likeUnlikePost(post, userid);
};

const handleComments = async (post) => {
  view.value = true;
};

const gotoProfile = async () => {
  const username = props?.post?.user?.username;
  router.push(`/${username}`);
};
</script>

<style></style>
