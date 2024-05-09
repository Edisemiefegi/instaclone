<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="max-w-md p-10 border w-full mx-auto md:flex-1">
      <form action="" class="flex flex-col gap-3">
        <p class="text-center text-2xl font-serif font-bold italic">
          Instagram
        </p>

        <TextInput
          v-model="formInput.email"
          type="email"
          inputmode="email"
          label="Enter email"
        />

        <TextInput
          v-model="formInput.password"
          :type="showPassword ? 'text' : 'password'"
          label="Enter password"
        >
          <template #prepend>
            <span
              @click="showPassword = !showPassword"
              class="font-medium text-xs"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </span>
          </template>
        </TextInput>

        <Button @click="submit" color="secondary" :loading="loading" block>
          Log in
        </Button>

        <div class="flex justify-between items-center">
          <div class="border w-2/5 h-0"></div>
          <p class="text-gray-500 font-medium text-sm">OR</p>
          <div class="border w-2/5 h-0"></div>
        </div>

        <Button variant="text" color="secondary" block>
          Log in with Facebook
        </Button>
        <p class="text-xs text-center cursor-pointer" @click="forgotPassword">
          Forgotten your password?
        </p>
      </form>
    </div>

    <div class="border w-full p-3 items-center justify-center text-sm flex">
      <p class="">Don't have an account ?</p>
      <Button variant="text" color="secondary" @click="openSignupForm">
        Sign Up
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usedataStore } from "@/stores/dataStore";
import { loginfunc } from "@/services/auth.js";

const store = usedataStore();

const router = useRouter();

const loading = ref(false);
const showPassword = ref(false);

const formInput = ref({
  email: "",
  password: "",
});

const submit = async () => {
  try {
    loading.value = true;
    await loginfunc(formInput.value);

    router.push({ name: "Home" });

    formInput.value.password = "";
    formInput.value.password = "";
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};

const forgotPassword = async () => {
  router.push({ name: "ForgotPassword" });
  // await resetPassword(formInput.value);
  console.log("changed");
};

const openSignupForm = () => {
  router.push({ name: "Register" });
};
</script>

<style></style>
