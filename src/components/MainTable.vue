<template>
  <div class="table">
    <div class="table__content">
      <div class="table__header">
        <h1 class="table__title">Сотрудники</h1>
        <CustomButton
          @on-click="$emit('addEmployee')"
          color="blue"
          text="Добавить сотрудника"
        />
      </div>

      <ul
        class="table__list"
        v-if="employeeList.length > 0"
        name="list"
        tag="ul"
      >
        <TableItem :subordinate="false" :data="listHeader" />
        <TableItem
          :subordinate="false"
          v-for="item in employeeList"
          :data="item"
          :key="item.name"
        />
      </ul>
      <div class="table__empty" v-else>Список сотрудников пуст</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { employeeList } from "../utils/functions";
import { Employee, MainTableEmits } from "../utils/Models";
import CustomButton from "./CustomButton.vue";
import TableItem from "./TableItem.vue";

defineEmits<MainTableEmits>();
const listHeader: Employee = { id: 0, name: "Имя", phone: "Номер" };
</script>

<style>
.table {
  background: #fff;
  color: #000;
  border-radius: 16px;
  padding: 16px;
  min-height: calc(100dvh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
}

.table__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table__content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.table__title {
  font-size: 24px;
}

.table__list {
  list-style: none;
  width: fit-content;
}

.table__empty {
  font-weight: 500;
  font-size: 18px;
}
</style>
