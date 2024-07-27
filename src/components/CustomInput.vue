<template>
  <div class="input">
    <label
      class="input__label"
      :class="labelActive ? ' active' : ''"
      :for="name"
      v-if="name && label"
      >{{ label }}</label
    >
    <input
      @focus="handleEvent(true)"
      @blur="handleEvent(false)"
      v-model="model"
      class="input__field"
      :class="isError ? ' error' : ''"
      type="text"
      :id="name"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from "vue";
import { InputProps } from "../utils/Models";

const props = defineProps<InputProps>();
const model = defineModel();
const labelActive: Ref<boolean> = ref<boolean>(false);
const accentColor = computed(() => {
  if (props.isError) {
    return "red";
  } else {
    return "blue";
  }
});

const handleEvent = (value: boolean) => {
  if (value) {
    labelActive.value = true;
  } else {
    if (model.value) {
      labelActive.value = true;
    } else {
      labelActive.value = false;
    }
  }
};
</script>

<style>
.input {
  position: relative;
  width: 100%;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: space-between;
}

.input__label {
  position: absolute;
  transition: 0.3s;
  font-size: 14px;
  color: #242424;
  transform: translateX(16px);
}

.input__label.active {
  transform: translateX(8px) translateY(-20px);
  color: v-bind(accentColor);
  padding: 2px 4px;
  font-size: 12px;
  background: #fff;
}

.input__field {
  outline: none;
  border: 1px solid v-bind(accentColor);
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
}
</style>
