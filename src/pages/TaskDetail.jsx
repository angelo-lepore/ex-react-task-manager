// Import di React e dei hook necessari
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

// Componente che mostra la pagina di dettaglio di un task
export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return (
      <main>
        <div>
          <h1>❌ Task non trovato</h1>
          <p>Il task con l'ID specificato non esiste.</p>
        </div>
      </main>
    );
  }

  const removeTask = () => {
    console.log(`Eliminare il task con ID: ${task.id}`);
  };

  return (
    <main>
      <div className="task-detail">
        <h1>📋 Dettaglio Task</h1>
        <div className="task-info">
          <p>
            <strong>Nome:</strong> {task.title}
          </p>
          <p>
            <strong>Descrizione:</strong> {task.description}
          </p>
          <p>
            <strong>Stato:</strong>
            {task.status}
          </p>
          <p>
            <strong>Creato il:</strong>
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
          <button onClick={removeTask}>Elimina Task</button>
        </div>
      </div>
    </main>
  );
}
