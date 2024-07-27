<template>
  <Teleport to="body">
    <Transition name="modal">
      <div class="modal" v-if="isOpen" @click="clearInputs">
        <div class="modal__content" @click.stop>
          <div class="modal__header">
            <h3 class="modal__title">
              {{ title }}
            </h3>

            <button @click="clearInputs" class="modal__close"></button>
          </div>
          <div class="modal__body">
            <form class="modal__form" @submit.prevent="addEmployee">
              <CustomInput
                :is-error="nameInputError"
                v-model="nameValue"
                label="Имя"
                name="name"
              />
              <CustomInput
                :is-error="phoneInputError"
                v-model="phoneValue"
                label="Телефон"
                name="phone"
              />
              <CustomSelect
                v-if="employeeList.length > 0"
                @select="setBossId"
              />

              <CustomButton color="blue" text="Добавить" />
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { Employee, ModalEmits, ModalProps } from "../utils/Models";
import CustomButton from "./CustomButton.vue";
import CustomInput from "./CustomInput.vue";
import CustomSelect from "./CustomSelect.vue";
import { createEmployee, employeeList } from "../utils/functions";

defineProps<ModalProps>();
const emits = defineEmits<ModalEmits>();
const bossId: Ref<number | undefined> = ref<number | undefined>(undefined);
const nameValue: Ref<string> = ref<string>("");
const phoneValue: Ref<string> = ref<string>("");
const nameInputError: Ref<boolean> = ref<boolean>(false);
const phoneInputError: Ref<boolean> = ref<boolean>(false);

const setBossId = (id: number) => {
  bossId.value = id;
};

const addEmployee = () => {
  if (!nameValue.value.length) {
    nameInputError.value = true;
    alert("Введите имя сотрудника!");
    return;
  }
  if (!phoneValue.value.length) {
    phoneInputError.value = true;
    alert("Введите номер сотрудника!");
    return;
  }
  const data: Employee = {
    id: Date.now(),
    name: nameValue.value,
    phone: phoneValue.value,
    bossId: bossId.value ?? bossId.value,
  };
  createEmployee(data);
  clearInputs();
};

const clearInputs = () => {
  nameInputError.value = false;
  phoneInputError.value = false;
  nameValue.value = "";
  phoneValue.value = "";
  bossId.value = undefined;
  emits("close");
};
</script>

<style>
.modal {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal__close {
  height: 24px;
  width: 24px;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  position: relative;
}

.modal__close::after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  height: 16px;
  width: 2px;
  background: #242424;
  border-radius: 5px;
}

.modal__close::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(-45deg);
  height: 16px;
  width: 2px;
  background: #242424;
  border-radius: 5px;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal__title {
  font-size: 18px;
  color: #000;
}

.modal__content {
  border-radius: 12px;
  color: #000;
  padding: 16px;
  height: fit-content;
  width: 400px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.modal-enter-active {
  --transition-speed: 200ms;
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.3s ease, height 100ms;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  height: 0;
}

.modal-leave-to {
  height: auto;
}
</style>
