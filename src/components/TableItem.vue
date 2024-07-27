<template>
  <li class="table-item" :class="data.subordinates ? ' active' : ''">
    <div class="table-item__content" @click="isOpen = !isOpen">
      <div class="table-item__cell" :class="subordinate ? ' extra' : ''">
        <span
          class="table-item__indicator"
          :class="isOpen ? ' active' : ''"
          v-if="data.subordinates"
        ></span>
        <span>
          {{ data.name }}
        </span>
      </div>
      <div class="table-item__cell">{{ data.phone }}</div>
    </div>
    <Transition
      name="expand"
      @enter="enter"
      @leave="leave"
      @after-enter="afterEnter"
    >
      <ul class="table-item__list" v-if="data.subordinates && isOpen">
        <TableItem
          :subordinate="true"
          v-for="item in data.subordinates"
          :data="item"
          :key="item.name"
        />
        <!-- <li v-for="item in data.subordinates">
          <div class="table-item__content">
            <div class="table-item__cell">{{ item.name }}</div>
            <div class="table-item__cell">{{ item.phone }}</div>
          </div>
        </li> -->
      </ul>
    </Transition>
  </li>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { afterEnter, enter, leave } from "../utils/functions";
import { TableItemProps } from "../utils/Models";

defineProps<TableItemProps>();
const isOpen: Ref<boolean> = ref<boolean>(false);
</script>

<style>
.table-item {
  transition: 0.3s;
  display: flex;
  flex-direction: column;
}

.table-item.active {
  cursor: pointer;
}

.table-item__content {
  display: flex;
}

.table-item__indicator {
  width: 6px;
  height: 6px;
  margin-right: 8px;
  border-bottom: 2px solid #000;
  border-right: 2px solid #000;
  transition: 0.2s ease;
  transform: rotate(45deg);
}

.table-item__indicator.active {
  transform: rotate(-135deg);
}

.table-item__cell {
  border: 0.5px solid #e2e2e2;
  display: flex;
  align-items: center;
  width: 200px;
  padding: 4px 8px;
  background: #fff;
  position: relative;
}

.table-item__cell.extra {
  left: 15px;
}
</style>
