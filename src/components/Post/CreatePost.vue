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
      :class="preview ? 'sm:w-7/12   w-full sm:m-0 m-4' : 'sm:w-4/12 w-5/6'"
      class="bg-white overflow-hidden flex-col rounded-xl flex font-medium h-96"
    >
      <p class="p-3 w-full text-center border-b">Create new Post</p>

      <div class="flex w-full h-full justify-between">
        <div :class="preview ? ' w-6/12' : 'w-full'" class="h-full border p-1">
          <div
            v-if="!preview"
            class="h-96 flex flex-col justify-center gap-5 items-center"
          >
            <i class="pi pi-images text-[100px]"></i>
            <p>Post your pictures and videos here</p>
            <UploadFile multiple @files="handleUpload">
              <button
                class="bg-blue-400 p-2 text-white text-sm hover:bg-blue-500 rounded-md"
              >
                Select From Computer
              </button>
            </UploadFile>
          </div>
          <Load v-if="loading" />

          <div v-if="preview" class="aspect-square h-full w-full">
            <img :src="data.image" class="h-full object-cover w-full" alt="" />
          </div>
        </div>

        <div class="w-6/12 p-3 flex flex-col gap-4" v-if="preview">
          <ProfileCard
            :image="logginUser.image"
            :username="logginUser.username"
          />
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
import { ref, computed } from "vue";
import { usedataStore } from "@/stores/dataStore.js";
import { uploadFile } from "@/utils/index.js";
import { createNewPost } from "@/services/post.js";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Load from "../Load.vue";
import ProfileCard from "../ProfileSection/ProfileCard.vue";
import UploadFile from "../ui/UploadFile.vue";

const $toast = useToast();
const store = usedataStore();

const emit = defineEmits(["close"]);

const loading = ref(false);
const preview = ref(false);

const data = ref({
  image: null,
  caption: "",
});

const logginUser = computed(() => store.getLoggedInUser);

const handleUpload = async (files) => {
  try {
    loading.value = true;
    const file = files[0];
    const url = await uploadFile(file);
    // console.log(url);
    data.value.image = url;
    preview.value = true;
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
    emit("close");
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
