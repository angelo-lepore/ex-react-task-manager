// Import delle funzioni necessarie da React
import { useContext, useState, useMemo } from "react";

// Import del contesto globale
import { GlobalContext } from "../contexts/GlobalContext.jsx";

// Import del componente
import TaskRow from "../components/TaskRow.jsx";

// Componente che mostra la lista dei task
export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Task:", tasks);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const sortArrow = sortOrder === 1 ? "↓" : "↑";

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
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
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
  }, [tasks, sortBy, sortOrder]);

  return (
    <main>
      <div>
        <h1>Lista Task</h1>
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
            {sortedTasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
