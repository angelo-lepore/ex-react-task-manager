// Import delle funzioni necessarie da React
import { useContext } from "react";

// Import del contesto globale
import { GlobalContext } from "../contexts/GlobalContext.jsx";

// Import del componente
import TaskRow from "../components/TaskRow.jsx";

// Componente che mostra la lista dei task
export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Task:", tasks);

  return (
    <main>
      <div>
        <h1>Lista Task</h1>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Stato</th>
              <th>Data di Creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow key={task.id} tasks={task} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
