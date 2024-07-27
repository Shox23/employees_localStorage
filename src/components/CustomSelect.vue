<template>
  <div class="select" @click="isOpen = !isOpen">
    <div class="select__label" :class="activeItem ? ' active' : ''">
      Начальник
    </div>
    <div class="select__dropdown">
      <div v-if="activeItem">
        {{ activeItem.name }}
      </div>

      <Transition
        name="expand"
        @enter="enter"
        @leave="leave"
        @after-enter="afterEnter"
      >
        <ul class="select__list" v-if="isOpen">
          <li
            class="select__list__item"
            @click.stop="selectItem(item.id)"
            v-for="item in allEmployees"
            :key="item.id"
          >
            {{ item.name }}
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import { Employee, SelectEmits } from "../utils/Models";
import { afterEnter, allEmployees, enter, leave } from "../utils/functions";

const emit = defineEmits<SelectEmits>();
const activeItem: Ref<Employee | undefined> = ref<Employee | undefined>(
  undefined
);
const isOpen: Ref<boolean> = ref<boolean>(false);

const selectItem = (id: number) => {
  activeItem.value = allEmployees.value.find((item) => item.id === id);
  isOpen.value = false;
  emit("select", id);
};
</script>

<style>
.select {
  position: relative;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid blue;
  border-radius: 8px;
}

.select__list {
  max-height: 200px;
  overflow: auto;
  position: absolute;
  background: #fff;
  width: calc(100% + 2px);
  left: -1px;
  top: 46px;
}

.select__list__item {
  padding: 8px 16px;
  transition: 0.3s ease;
  cursor: pointer;
}

.select__list__item:hover {
  background: #e2e2e2;
}

.select__label {
  transition: 0.3s;
  font-size: 14px;
  color: #242424;
}

.select__label.active {
  transform: translateX(-8px) translateY(-25px);
  position: absolute;
  color: blue;
  padding: 2px 4px;
  font-size: 12px;
  background: #fff;
}

.select__dropdown {
  outline: none;
  width: 100%;
}
</style>
