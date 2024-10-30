<template>
  <div>
    <p class="title" style="font-size: 20px">test clue</p>
    <p class="title" style="font-size: 20px">commit 1</p>
    <p class="title" style="font-size: 20px">commit 2</p>
    <p class="title" style="font-size: 20px">commit 3</p>
    <p class="title" style="font-size: 20px">commit 4</p>

    <p>
      <a href="/tricks">Go tricks</a>
    </p>

    <div class="col-6">
      <h3>Draggable {{ draggingInfo }}</h3>

      <draggable
        :list="list"
        :disabled="!enabled"
        item-key="name"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <div class="list-group-item" :class="{ 'not-draggable': !enabled }">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
draggable.compatConfig = { MODE: 3 };

export default {
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      list: [
        { name: "John", id: 0 },
        { name: "Joao", id: 1 },
        { name: "Jean", id: 2 },
      ],
      dragging: false,
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  methods: {
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  color: red !important;
}
.buttons {
  margin-top: 35px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.not-draggable {
  cursor: no-drop;
}
</style>