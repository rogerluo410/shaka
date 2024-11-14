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

    <div class="m_panel11_header flex-y">
      <validation-provider
        v-slot="{ errors }"
        rules="required|max:255|first_deny:*,Q|string_deny:[,]|comma_deny"
      >
        <dl
          class="m_formSet2 m_formSet2__type4"
          :class="errors.length > 0 ? 'is_error' : ''"
        >
          <dt>項目名</dt>
          <dd>
            <input
              v-model="text"
              class="m_formItemMedium"
              type="text"
              name="項目名"
            />
            <p v-show="errors.length > 0" class="m_form_error">
              {{ errors[0] }}
            </p>
          </dd>
        </dl>
      </validation-provider>
    </div>
    <a class="m_btn2 m_btn2__block2 m_btn2__large" @click="update()"> 追加 </a>
  </div>
</template>

<script>
import draggable from "vuedraggable";
draggable.compatConfig = { MODE: 3 };
import { ValidationProvider, ValidationObserver, validate } from "vee-validate";

export default {
  components: {
    draggable,
    ValidationProvider,
    ValidationObserver,
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
      observerId: "edit_textbox_observer",
      text: "32321",
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  watch: {
    text(val) {
      console.log(val);
      this.$emit("input", val);
    },
  },
  methods: {
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
    async update() {
      // バリデーションチェック
      // this.$refs[this.observerId].validate().then((isValid) => {
      //   if (!isValid) return;

      //   alert("valid");
      // });
      // validate(
      //   this.text,
      //   "required|max:255|first_deny:*,Q|string_deny:[,]|comma_deny"
      // ).then((result) => {
      //   console.log(result);
      //   if (result.valid) {
      //     // Do something!
      //     alert("valid!");
      //   } else {
      //     alert("invalid!");
      //   }
      // });
      const result = await validate(
        this.text,
        "required|max:255|first_deny:*,Q|string_deny:[,]|comma_deny"
      );
      console.log(result);
      if (result.valid) {
        // Do something!
        alert("valid!");
      } else {
        alert("invalid!");
      }
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

.is_error {
  color: red !important;
}
</style>