<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="max-w-md p-10 border w-full mx-auto md:flex-1">
      <form action="" class="flex flex-col gap-3">
        <p class="text-center text-2xl font-serif font-bold italic">
          Instagram
        </p>
        <p class="text-center text-gray-600 font-medium">
          Sign up to see photos and videos from your friends.
        </p>

        <Button color="secondary" block> Log in with Facebook </Button>

        <div class="flex justify-between items-center">
          <div class="border w-2/5 h-0"></div>
          <p class="text-gray-500 font-medium text-sm">OR</p>
          <div class="border w-2/5 h-0"></div>
        </div>

        <TextInput
          v-model="formInput.email"
          type="email"
          inputmode="email"
          label="Mobile number or email address"
        />

        <TextInput
          type="text"
          v-model="formInput.fullname"
          inputmode="text"
          label="Full Name"
        />
        <TextInput
          type="text"
          inputmode="text"
          v-model="formInput.username"
          label="Username"
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

        <div class="text-xs flex flex-col gap-3 text-gray-500 text-center">
          <p>
            People who use our service may have uploaded your contact
            information to instagram. <span>Learn more</span>
          </p>
          <p>
            By signing up, you agree to our Terms, Privacy Policy and Cookies
            Policy.
          </p>
        </div>

        <Button @click="submit" color="secondary" :loading="loading" block>
          Sign Up
        </Button>
      </form>
    </div>

    <div class="border w-full p-3 items-center justify-center text-sm flex">
      <p class="">Have an account ?</p>
      <Button variant="text" color="secondary" @click="openLoginForm">
        Log in
      </Button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { usedataStore } from "@/stores/dataStore";
import { registerUser } from "@/services/auth";
import { getUserByUsername } from "@/services/user";

const store = usedataStore();
const router = useRouter();

const loading = ref(false);
const showPassword = ref(false);

const formInput = ref({
  email: "",
  fullname: "",
  username: "",
  password: "",
});

const submit = async () => {
  try {
    if (
      formInput.value.email?.trim() !== "" &&
      formInput.value.fullname?.trim() !== "" &&
      formInput.value.username?.trim() !== ""
    ) {
      const data = await getUserByUsername(formInput.value.username);

      if (data) {
        alert("Username already in use");
      } else {
        loading.value = true;

        const payload = { ...formInput.value };

        console.log(data, "datata");
        await registerUser(payload);
        router.push({ name: "Home" });

        console.log(payload);
        clear();
      }
    } else {
      alert("fill in the necessary details");
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    loading.value = false;
  }
};

const clear = () => {
  formInput.value.email = "";
  formInput.value.fullname = "";
  formInput.value.username = "";
  formInput.value.password = "";
};

const openLoginForm = () => {
  router.push({ name: "Login" });
};

onMounted(async () => {});
</script>

<style></style>
