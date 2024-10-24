import trick from "./trick.vue";
import { createApp } from "vue";

document.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line
  const app = createApp(trick);
  app.mount("#trick");
});
