import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { registerComponent } from "./utils/components";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import "./style.css";
import router from "./router";
import App from "./App.vue";

import "primeicons/primeicons.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(ToastPlugin);

registerComponent(app);

app.mount("#app");
