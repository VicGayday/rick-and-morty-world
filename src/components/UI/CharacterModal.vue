<template>
  <div v-if="visible" class="modal" @click.stop="hide">
    <div class="modal-content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "CharacterModal",
  props: {
    visible: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    function hide() {
      emit("update:visible", false)
    }
    return {
      hide,
    }
  },
})
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  border-radius: 10px;
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: var(--border-table);
  border-radius: 15px;
  width: 80%;
}
</style>
