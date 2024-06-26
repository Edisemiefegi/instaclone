import TextInput from "@/components/ui/TextInput.vue";
import Button from "@/components/ui/Button.vue";
import SideNav from "@/components/ui/SideNav.vue";
import UploadFile from "@/components/ui/UploadFile.vue";

export const registerComponent = (app) => {
  app.component("TextInput", TextInput);
  app.component("Button", Button);
  app.component("SideNav", SideNav);
  app.component("UploadFile", UploadFile);
};
