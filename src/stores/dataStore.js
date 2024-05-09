import { defineStore } from "pinia";
import {
  auth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "@/firebase.js";

export const usedataStore = defineStore("dataStore", {
  state: () => ({
    collapsed: false,
    users: [],
    posts: [],
    loggedInUser: null,
  }),

  getters: {
    getLoggedInUser: (state) => state.loggedInUser,
  },

  actions: {},

  persist: true,
});
