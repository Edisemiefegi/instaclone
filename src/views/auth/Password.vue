<template>
  <nav class="border-b pb-2">
    <p class="text-center text-2xl font-serif font-bold italic">Instagram</p>
  </nav>
  <div>
    <div
      class="max-w-md p-10 border w-full mx-auto text-center flex flex-col gap-2"
    >
      <div class="flex justify-center items-center">
        <div
          class="w-24 h-24 rounded-full border-2 border-black items-center flex justify-center"
        >
          <i class="pi pi-lock text-3xl"></i>
        </div>
      </div>
      <p class="font-medium">Trouble with logging in?</p>
      <p class="text-sm text-gray-500">
        Enter your email address, phone number or username, and we'll send you a
        link to get back into your account.
      </p>
      <form action="" class="flex flex-col gap-3">
        <TextInput
          v-model="formInput.email"
          type="email"
          inputmode="email"
          label="Enter email"
        />
        <Button color="secondary" :loading="loading" block @click="submit">
          Reset Password
        </Button>

        <div>
          <div class="flex justify-between items-center">
            <div class="border w-2/5 h-0"></div>
            <p class="text-gray-500 font-medium text-sm">OR</p>
            <div class="border w-2/5 h-0"></div>
          </div>

          <Button variant="text" color="primary" block @click="openSignupForm">
            Create New Account
          </Button>
        </div>
      </form>
    </div>
    <div class="bg-gray-200 text-center">
      <Button variant="text" color="primary" @click="openLoginForm">
        Back to login
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { resetPassword } from "@/services/auth.js";

const router = useRouter();
const loading = ref(false);

const formInput = ref({
  email: "",
  password: "",
});

const openSignupForm = () => {
  router.push({ name: "Register" });
};

const openLoginForm = () => {
  router.push({ name: "Login" });
};

const submit = async () => {
  try {
    loading.value = true;

    await resetPassword(formInput.value);
    console.log("changed");
    alert("A link has been sent to your email");
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
