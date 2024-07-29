import { ref, Ref } from "vue";
import { Employee } from "./Models";

export const employeeList: Ref<Employee[]> = ref<Employee[]>(
  localStorage.employees ? JSON.parse(localStorage.employees) : []
);

export const allEmployees: Ref<Employee[]> = ref<Employee[]>([]);

export const extractAllEmployees = (list: Employee[]) => {
  let result: Employee[] = [];
  function traverse(employeeList: Employee[]) {
    for (const employee of employeeList) {
      result.push(employee);
      if (employee.subordinates && employee.subordinates.length > 0) {
        traverse(employee.subordinates);
      }
    }
  }

  traverse(list);

  allEmployees.value = result;
};

export const iterateArray = (list: Employee[], data: Employee): Employee[] => {
  for (let el = 0; el < list.length; el++) {
    if (data.bossId === list[el].id) {
      if (list[el].subordinates) {
        list[el].subordinates?.push(data);
      } else {
        list[el].subordinates = [data];
      }
    }
    if (list[el].subordinates) {
      let array = list[el].subordinates;
      iterateArray(array, data);
    }
  }
  return list;
};

export const addNewEmployee = (data: Employee) => {
  if (localStorage.employees) {
    let employees: Employee[] = JSON.parse(localStorage.employees);
    if (data.bossId) {
      employees = iterateArray(employees, data);
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
  extractAllEmployees(employeeList.value);
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
