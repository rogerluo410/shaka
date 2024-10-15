import clue from "./clue.vue";
import { createApp } from "vue";

document.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line
  const app = createApp(clue);
  app.mount("#clue");
});
