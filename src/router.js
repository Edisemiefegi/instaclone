// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import AuthLayout from "@/layout/AuthLayout.vue";
import UserLayout from "@/layout/UserLayout.vue";
import { usedataStore } from "./stores/dataStore";

const routes = [
  {
    path: "/",
    name: "UserLayout",
    component: UserLayout,
    meta: {
      authenticated: true,
    },
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/user/Home.vue"),
      },
      {
        path: "/:username",
        name: "ProfilePage",
        component: () => import("@/views/user/Profile.vue"),
      },
      {
        path: "/accounts",
        name: "SettingsPage",
        component: () => import("@/views/user/Settings.vue"),
      },

      {
        path: "/notification",
        name: "NotificationPage",
        component: () => import("@/views/user/Notifications.vue"),
      },
    ],
  },

  {
    path: "/auth",
    name: "Auth",
    redirect: "/auth/login",
    component: AuthLayout,
    meta: {
      authenticated: false,
    },
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () => import("@/views/auth/Login.vue"),
      },
      {
        path: "/auth/register",
        name: "Register",
        component: () => import("@/views/auth/Register.vue"),
      },
      {
        path: "/auth/forgot-password",
        name: "ForgotPassword",
        component: () => import("@/views/auth/Password.vue"),
      },
    ],
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = usedataStore();
  if (to.meta.authenticated && !store.loggedInUser) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
