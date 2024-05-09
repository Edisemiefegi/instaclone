<template>
  <main
    class="md:min-h-screen w-full flex md:items-center md:justify-center gap-4"
  >
    <!-- //// Container ///// -->
    <div class="flex items-center gap-4 w-full h-full max-w-3xl mx-auto">
      <!-- ////// Left Side ///// -->
      <div class="hidden flex-1 md:flex h-full mt-10 w-full justify-end">
        <div class="w-[310px] -mb-4 h-[550px] relative flex">
          <img
            src="../assets/screenshot1-.png"
            alt=""
            class="absolute w-full h-full border-8 border-black rounded-3xl -left-20 -top-3 z-10"
          />
          <img
            src="@/assets/instagram-comment-bot.gif"
            class="z-20 w-full rounded-3xl"
          />
        </div>
      </div>

      <!-- ////// Right Side ///// -->
      <div class="flex flex-col w-[400px] mx-auto mt-10 gap-3">
        <router-view />
      </div>
    </div>
  </main>

  <!-- footer -->
  <footer
    class="flex flex-col justify-center p-10 items-center mt-10 mb-10 gap-2 text-xs text-gray-500 mx-auto w-full"
  >
    <div class="flex gap-4 flex-wrap">
      <div v-for="text in footerText" :key="text">
        <p>{{ text }}</p>
      </div>
    </div>
    <div class="flex gap-4">
      <p>English(UK)</p>
      <p>@ 2024 Instagram from Meta</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const footerText = ref([
  "Meta",
  "About",
  "Blog",
  "Jobs",
  "Help",
  "API",
  "Privacy",
  "Terms",
  "Locations",
  "Instagram Lite",
  "Threads",
  "Contact uploading and non users",
  "Meta Verified",
]);
</script>

<style></style>
