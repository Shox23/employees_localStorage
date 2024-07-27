import { ref, Ref } from "vue";
import { Employee } from "./Models";

export const employeeList: Ref<Employee[]> = ref<Employee[]>(
  localStorage.employees ? JSON.parse(localStorage.employees) : []
);

export const allEmployees: Ref<Employee[]> = ref<Employee[]>([]);

export const extractAllEmployees = () => {
  allEmployees.value = [];
  if (localStorage.employees) {
    let employees: Employee[] = JSON.parse(localStorage.employees);
    employees.forEach((item) => {
      if (item.subordinates) {
        allEmployees.value.push(...item.subordinates);
      }
      allEmployees.value.push(item);
    });
  }
  console.log(allEmployees.value);
};

export const createEmployee = (data: Employee) => {
  if (localStorage.employees) {
    let employees: Employee[] = JSON.parse(localStorage.employees);
    if (data.bossId) {
      let boss = employees.findIndex((item) => item.id === data.bossId);
      if (employees[boss].subordinates) {
        employees[boss].subordinates.push(data);
      } else {
        employees[boss].subordinates = [data];
      }
    } else {
      employees.push(data);
    }
    localStorage.employees = JSON.stringify(employees);
    employeeList.value = employees;
  } else {
    let employees: Employee[] = [];
    employees.push(data);
    localStorage.employees = JSON.stringify(employees);
    employeeList.value = employees;
  }

  extractAllEmployees();
};

export const enter = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = "auto";
  const height = getComputedStyle(el).height;
  el.style.height = "0";
  getComputedStyle(el);
  setTimeout(() => {
    el.style.height = height;
  });
};

export const afterEnter = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = "auto";
};

export const leave = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = getComputedStyle(el).height;
  getComputedStyle(el);
  setTimeout(() => {
    el.style.height = "0";
  });
};
