<template>
  <div class="flex flex-col gap-5">
    <p class="font-bold text-xl">Edit Profile</p>
    <div class="bg-gray-100 p-4 flex rounded-2xl items-center justify-between">
      <ProfileCard :image="logginUser.image" class="w-96" />
      <div>
        <button
          @click="changeProfile = true"
          class="bg-blue-400 w-fit p-2.5 text-white text-sm font-medium rounded-lg"
        >
          Change Photo
        </button>
      </div>
      <ChangeProfileImg v-if="changeProfile" @close="changeProfile = false" />
    </div>
    <div class="flex flex-col gap-3">
      <p class="font-bold text-lg">Bio</p>
      <input
        v-model="data.bio"
        class="rounded-lg w-full outline-none border p-3"
        name=""
        placeholder="Enter text.."
        id=""
      />
    </div>
    <div class="flex flex-col gap-3">
      <p>Gender</p>
      <select
        :value="data.gender"
        @change="data.gender = $event.target.value"
        class="w-full rounded-lg border p-3 outline-none hover:bg-gray-200"
      >
        <option v-for="item in genderOptions" :key="item">{{ item }}</option>
      </select>
    </div>

    <div>
      <button
        @click="handleEdit"
        class="bg-blue-400 w-40 text-white text-sm p-2 font-medium rounded-lg"
      >
        Submit
      </button>
      <Load v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { usedataStore } from "@/stores/dataStore";
import { editUserProfile } from "@/services/user.js";
import ChangeProfileImg from "./ChangeProfileImg.vue";
import Load from "@/components/Load.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import ProfileCard from "./ProfileCard.vue";
import { computed, ref } from "vue";

const store = usedataStore();
const logginUser = computed(() => store.getLoggedInUser);

const $toast = useToast();

const genderOptions = ["Prefer not to say", "Female", "Male", "Others"];
const loading = ref(false);

const data = ref({
  bio: logginUser.value.bio,
  gender: logginUser.value.gender,
});

const handleEdit = async () => {
  try {
    loading.value = true;
    await editUserProfile(data.value);
    $toast.success("Profile saved");
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};
const changeProfile = ref(false);
</script>

<style></style>
