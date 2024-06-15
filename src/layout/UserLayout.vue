<template>
  <main class="flex">
    <Navbar class="sm:hidden block" />
    <Sidebar class="sm:block hidden" />
    <BottomNavbar class="sm:hidden block" />
    <div class="w-full pt-20 sm:pt-6 pb-10 h-screen overflow-auto">
      <router-view />
    </div>
  </main>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar/Index.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import { onMounted, computed, ref } from "vue";
import { usedataStore } from "@/stores/dataStore";
import { auth, onAuthStateChanged } from "@/firebase.js";
import { useRouter } from "vue-router";
import { initUserPost, getuserSavedPosts, getAllusers } from "@/services/user";
import { signoutfunc } from "../services/auth";

const store = usedataStore();
const router = useRouter();

const logginUser = computed(() => store.getLoggedInUser);

onMounted(() => {
  initUserPost();
  getuserSavedPosts();
  getAllusers();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      signoutfunc(logginUser.value);

      router.push({ name: "Login" });
    }
  });
});
</script>

<style></style>
