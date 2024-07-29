<template>
  <div class="app">
    <div class="container">
      <MainTable @add-employee="modalOpen = true" />
    </div>
    <Modal
      title="Добавить сотрудника"
      @close="modalOpen = false"
      :is-open="modalOpen"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import MainTable from "./components/MainTable.vue";
import Modal from "./components/Modal.vue";
import {
  employeeList,
  extractAllEmployees,
} from "./utils/functions";

const modalOpen: Ref<boolean> = ref<boolean>(false);

onMounted(() => {
  extractAllEmployees(employeeList.value);
});
</script>

<style scoped>
.app {
  position: relative;
}
</style>
