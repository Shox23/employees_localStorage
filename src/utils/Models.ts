export interface ButtonProps {
  text: string;
  color: string;
}

export interface ButtonEmits {
  (e: "onClick"): void;
}

export interface ModalProps {
  isOpen: boolean;
  title: string;
}

export interface ModalEmits {
  (e: "close"): void;
  (e: "addEmployee", value: Employee): void;
}

export interface InputProps {
  name: string;
  label: string;
  isError: boolean;
}

export interface MainTableEmits {
  (e: "addEmployee"): void;
}

export interface Employee {
  id: number;
  name: string;
  phone: string;
  subordinates?: Employee[];
  bossId?: number;
}

export interface SelectEmits {
  (e: "select", value: number): void;
}

export interface TableItemProps {
  data: Employee;
  subordinate: boolean;
}
