
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
];

export const employees: Employee[] = Array.from(
  { length: 10_000 },
  (_, index) => ({
    id: index + 1,
    name: `Employee ${index + 1}`,
    email: `employee${index + 1}@example.com`,
    department: departments[index % departments.length],
    salary: 30000 + ((index * 137) % 120000),
  })
);