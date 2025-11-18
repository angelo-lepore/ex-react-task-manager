// Import delle funzioni necessarie da React
import { useContext, useState, useMemo, useCallback } from "react";

// Import del contesto globale
import { GlobalContext } from "../contexts/GlobalContext.jsx";

// Import del componente
import TaskRow from "../components/TaskRow.jsx";

// Funzione debounce generica
function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

// Componente che mostra la lista dei task
export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Task:", tasks);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const sortArrow = sortOrder === 1 ? "↓" : "↑";
  const [searchQuery, setSearchQuery] = useState("");
  const debouncesearchQuery = useCallback(debounce(setSearchQuery, 500), []);

  // Funzione per gestire il cambio di ordinamento
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  // Ordino i task
  const filteredSortedTasks = useMemo(() => {
    return [...tasks]
      .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        let comparison;

        if (sortBy === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          const statusOptions = ["To do", "Doing", "Done"];
          const indexA = statusOptions.indexOf(a.status);
          const indexB = statusOptions.indexOf(b.status);
          comparison = indexA - indexB;
        } else if (sortBy === "createdAt") {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          comparison = dateA - dateB;
        }

        return comparison * sortOrder;
      });
  }, [tasks, sortBy, sortOrder, searchQuery]);

  return (
    <main>
      <div>
        <h1>Lista Task</h1>
        <input
          type="text"
          placeholder="Cerca una task..."
          onChange={(e) => debouncesearchQuery(e.target.value)}
          style={{ width: "100%" }}
        />
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>
                Nome {sortBy === "title" && sortArrow}
              </th>
              <th onClick={() => handleSort("status")}>
                Stato {sortBy === "status" && sortArrow}
              </th>
              <th onClick={() => handleSort("createdAt")}>
                Data di Creazione {sortBy === "createdAt" && sortArrow}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredSortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
