<template>
  <button
    class="btn"
    @click="$emit('onClick')"
    @mousedown="pressed = true"
    @mouseup="pressed = false"
    :class="pressed ? ' pressed' : ''"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { ButtonEmits, ButtonProps } from "../utils/Models";

defineProps<ButtonProps>();
defineEmits<ButtonEmits>();
const pressed: Ref<boolean> = ref<boolean>(false);
</script>

<style>
.btn {
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 500;
  border-radius: 8px;
  padding: 8px 12px;
  background: v-bind(color);
  color: white;
  transition: 0.3s ease;
}

.btn.pressed {
  transform: scale(0.9);
}

.btn.pressed:hover {
  transform: scale(0.9);
}

.btn:hover {
  transform: scale(1.05);
}
</style>
