<template>
  <div
    class="fixed inset-0 flex items-center cursor-pointer justify-center bg-black bg-opacity-50"
  >
    <i
      @click="emit('close')"
      class="absolute top-0 right-0 m-4 cursor-pointer pi pi-times text-white font-bold"
    >
    </i>
    <div
      :class="preview ? 'w-7/12' : 'w-4/12'"
      class="bg-white flex-col rounded-xl flex font-medium h-fit"
    >
      <p class="p-3 w-full text-center border-b">Create new Post</p>

      <div class="flex w-full justify-between">
        <div :class="preview ? 'w-6/12' : 'w-full'" class="h-96">
          <div
            v-if="!preview"
            class="h-96 flex flex-col justify-center gap-5 items-center"
          >
            <i class="pi pi-images text-[100px]"></i>
            <p>Post your pictures and videos here</p>
            <button
              @click="selectFile"
              class="bg-blue-400 p-2 text-white text-sm hover:bg-blue-500 rounded-md"
            >
              Select From Computer
            </button>
            <input
              type="file"
              @change="handleUpload"
              accept="image/*"
              ref="inputRef"
              class="hidden"
            />
          </div>
          <Load v-if="loading" />
          <div v-if="preview">
            <img :src="data.image" class="h-96 object-cover w-full" alt="" />
          </div>
        </div>

        <div class="w-6/12 p-3 flex flex-col gap-4" v-if="preview">
          <ProfileCard />
          <textarea
            class="w-full outline-none h-full"
            name=""
            v-model="data.caption"
            placeholder="Write a caption..."
          ></textarea>

          <button @click="handlesubmit" class="text-blue-600">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usedataStore } from "@/stores/dataStore.js";
import { uploadFile } from "@/utils/index.js";
import { createNewPost } from "@/services/user.js";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Load from "../Load.vue";
import ProfileCard from "../ProfileSection/ProfileCard.vue";

const $toast = useToast();
const store = usedataStore();

const emit = defineEmits(["close"]);

const loading = ref(false);
const inputRef = ref(null);
const file = ref(null);
const preview = ref(null);

const data = ref({
  image: null,
  caption: "",
});

const selectFile = () => {
  inputRef.value?.click();
};

const handleUpload = async (event) => {
  try {
    loading.value = true;
    const file = event.target.files[0];
    const url = await uploadFile(file);
    preview.value = URL.createObjectURL(file);
    data.value.image = url;

    // console.log(url, data.value.image);
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};

const handlesubmit = () => {
  try {
    loading.value = true;
    createNewPost(data.value);
    $toast.success("post saved");
    console.log(store.posts, "post");
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
