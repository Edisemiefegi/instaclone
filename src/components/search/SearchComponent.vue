<template>
  <div class="bg-white w-full h-full">
    <div class="flex flex-col gap-6">
      <div class="flex justify-between items-center w-full p-2">
        <div
          class="border p-2 flex items-center gap-2 sm:w-full w-4/5 rounded-lg bg-slate-200"
        >
          <i class="pi pi-search cursor-pointer" @click="triggerSearch"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            autofocus
            class="border-none outline-none bg-slate-200"
          />
        </div>
        <i
          class="pi pi-times block sm:hidden cursor-pointer w-fit"
          @click="closeSearch"
        ></i>
      </div>
      <div class="border w-full"></div>
    </div>

    <div class="flex flex-col gap-2 overflow-auto h-96 p-3" v-if="searchQuery">
      <div
        v-for="(user, index) in results"
        :key="index"
        class="flex justify-between items-center"
      >
        <ProfileCard
          @click="addToRecentSearched(user)"
          :username="user?.username"
          :fullname="user?.fullname"
          :image="user?.image"
          class="cursor-pointer hover:bg-slate-100 w-full p-2 rounded-md"
        />
      </div>
    </div>

    <div class="p-4 flex flex-col gap-3" v-else>
      <div class="flex justify-between">
        <p class="font-medium">Recent</p>
        <p class="text-blue-400 font-medium cursor-pointer" @click="clearAll">
          Clear All
        </p>
      </div>
      <div class="flex flex-col gap-2 overflow-auto h-96">
        <div
          v-for="(user, index) in recentSearches"
          :key="index"
          class="flex justify-between items-center"
        >
          <div class="flex justify-between w-full items-center">
            <ProfileCard
              @click="closeSearch"
              :username="user?.username"
              :image="user?.image"
              class="cursor-pointer"
            />
            <i
              class="pi pi-times cursor-pointer"
              @click="handleDeleteSearch(user)"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from "@/components/ProfileSection/ProfileCard.vue";
import { computed, ref, watch } from "vue";
import { usedataStore } from "@/stores/dataStore";
import { handleSearch } from "@/services/user.js";
import { useDebounce } from "@/hooks/useDebounce.js";
import { inject } from "vue";

const closeSearch = inject("closeSearch");

const store = usedataStore();

const searchQuery = ref("");

const results = ref([]);
const recentSearches = computed(() => store.recentSearched);

const debouncedValue = useDebounce(searchQuery);

watch(debouncedValue, () => {
  triggerSearch();
});

const triggerSearch = async () => {
  const text = searchQuery.value.toLowerCase();
  results.value = await handleSearch(text);
  // console.log(results.value, "res");
};

const addToRecentSearched = (user) => {
  // check if user has already been added to recent searched
  const data = recentSearches.value.find((e) => {
    // console.log(e.username, user.username, "usrrname");
    if (e.username == user.username) {
      return e;
    }
  });

  // if not then add to recent searched
  if (!data) {
    recentSearches.value.push(user);
  }
  closeSearch();
};

const handleDeleteSearch = (user) => {
  store.recentSearched = store.recentSearched.filter((e) => {
    if (e !== user) {
      console.log(e, "ee");
      return e;
    }
  });
};

const clearAll = () => {
  store.recentSearched = [];
};
</script>

<style></style>
