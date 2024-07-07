import { defineStore } from "pinia";
import {
  auth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "@/firebase.js";

export const usedataStore = defineStore("dataStore", {
  state: () => ({
    collapsed: false,
    user: null,
    users: [],
    posts: [],
    allPosts: [],
    PostSaved: [],
    allPostSaved: [],
    loggedInUser: null,
    recentSearched: [],
    notifications: [],
  }),

  getters: {
    getLoggedInUser: (state) => state.loggedInUser,
  },

  actions: {
    // loadSearchHistory() {
    //   const history = JSON.parse(localStorage.getItem("recentSearched")) || [];
    //   this.recentSearched = history;
    //   console.log(this.recentSearched, "es");
    // },
    // updateSearchHistory(query) {
    //   if (!this.recentSearched.includes(query)) {
    //     this.recentSearched.unshift(query);
    //     if (this.recentSearched.length > 10) {
    //       this.recentSearched.pop();
    //     }
    //     localStorage.setItem(
    //       "recentSearched",
    //       JSON.stringify(this.recentSearched)
    //     );
    //   }
    // },
    // selectHistory(history) {
    //   this.query = history;
    // },
  },

  persist: true,
});
