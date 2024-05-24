<template>
  <div
    @click.self="emit('close')"
    class="fixed inset-0 flex items-center cursor-pointer justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white flex-col rounded-md flex w-8/12 md:w-5/12 font-medium h-fit"
    >
      <button class="p-3 w-full text-center text-xl border-b">
        Change Profile Photo
      </button>

      <UploadFile @files="handleUpload">
        <button
          class="p-3 w-full text-center font-medium text-blue-400 text-sm border-b"
        >
          Upload photo
        </button>
      </UploadFile>

      <button
        class="p-3 w-full text-center font-medium text-red-400 text-sm border-b"
      >
        Remove photo
      </button>
      <button class="p-3 w-full text-center text-sm border-b">Cancel</button>

      {{ loading ? "Loading..." : "" }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadFile } from "@/utils/index.js";
import { editProfilePhoto } from "@/services/user.js";

const emit = defineEmits(["close"]);

const loading = ref(false);
const inputRef = ref(null);
const file = ref(null);

const openFile = () => {
  inputRef.value?.click();
};

const handleUpload = async (files) => {
  try {
    loading.value = true;
    const file = files[0];
    const url = await uploadFile(file);

    console.log(url);
    await editProfilePhoto(url);

    //Update the user profile with the url

    emit("close");
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
