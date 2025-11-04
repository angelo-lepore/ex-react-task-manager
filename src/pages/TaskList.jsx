// Import delle funzioni necessarie da React
import { useContext } from "react";

// Import del contesto globale
import { GlobalContext } from "../contexts/GlobalContext.jsx";

// Componente che mostra la lista dei task
export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Task:", tasks);

  return (
    <div>
      <h1>Lista Task</h1>
    </div>
  );
}
