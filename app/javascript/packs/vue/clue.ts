import clue from "./clue.vue";
import { createApp } from "vue";
import { apply } from "./validation";

document.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line
  const app = createApp(clue);
  apply(app);

  app.mount("#clue");
});
