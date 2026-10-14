
import { useMemo, useState } from "react";
import { employees } from "./data";
import type { Employee } from "./data";

type SortField = "id" | "name" | "department" | "salary";

function App() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [sortField, setSortField] = useState<SortField>("id");
  const [ascending, setAscending] = useState(true);

  // Baseline: filter the complete dataset on every render.
  const filteredEmployees = useMemo(() => {
  const query = search.trim().toLowerCase();

  return employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      String(employee.id).includes(query);

    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });
}, [search, department]);

  // Baseline: sort the filtered data on every render.
  const sortedEmployees = useMemo(() => {
  return [...filteredEmployees].sort(
    (a: Employee, b: Employee) => {
      const first = a[sortField];
      const second = b[sortField];

      const result =
        typeof first === "number" &&
        typeof second === "number"
          ? first - second
          : String(first).localeCompare(String(second));

      return ascending ? result : -result;
    }
  );
}, [filteredEmployees, sortField, ascending]);

  function handleSort(field: SortField) {
    if (field === sortField) {
      setAscending((previous) => !previous);
    } else {
      setSortField(field);
      setAscending(true);
    }
  }

  return (
    <main className="app">
      <header className="page-header">
        <div>
          <p className="eyebrow">REACT PERFORMANCE LAB</p>
          <h1>Employee Directory</h1>
          <p className="subtitle">
            A performance experiment with 10,000 records
          </p>
        </div>

        <span className="baseline-badge">Baseline · Unoptimized</span>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span>Total records</span>
          <strong>{employees.length.toLocaleString()}</strong>
        </div>

        <div className="stat-card">
          <span>Matching records</span>
          <strong>{sortedEmployees.length.toLocaleString()}</strong>
        </div>

        <div className="stat-card">
          <span>Departments</span>
          <strong>5</strong>
        </div>
      </section>

      <section className="table-card">
        <div className="toolbar">
          <input
            aria-label="Search employees"
            placeholder="Search name, email, or ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            aria-label="Filter by department"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="All">All departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <p className="table-note">
          Click a column heading to sort. All matching rows are rendered.
        </p>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>
                  <button onClick={() => handleSort("id")}>
                    ID {sortField === "id" && (ascending ? "↑" : "↓")}
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort("name")}>
                    Name {sortField === "name" && (ascending ? "↑" : "↓")}
                  </button>
                </th>
                <th>Email</th>
                <th>
                  <button onClick={() => handleSort("department")}>
                    Department{" "}
                    {sortField === "department" && (ascending ? "↑" : "↓")}
                  </button>
                </th>
                <th>
                  <button onClick={() => handleSort("salary")}>
                    Salary {sortField === "salary" && (ascending ? "↑" : "↓")}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    {employee.salary.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedEmployees.length === 0 && (
            <p className="empty-state">No matching employees found.</p>
          )}
        </div>
      </section>

      <footer>
        Baseline experiment · React + TypeScript · Local generated data
      </footer>
    </main>
  );
}

export default App;