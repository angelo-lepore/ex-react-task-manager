// Import delle funzioni necessarie da React
import { useState, useEffect } from "react";

// Recupero della variabile d’ambiente definita in .env
const { VITE_API_URL } = import.meta.env;

// Hook personalizzato per gestire i task
function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  // Funzione per aggiungere un nuovo task
  const addTask = () => {
    // (da implementare)
  };

  // Funzione per rimuovere un task esistente
  const removeTask = () => {
    // (da implementare)
  };

  // Funzione per aggiornare un task esistente
  const updateTask = () => {
    // (da implementare)
  };

  return { tasks, addTask, removeTask, updateTask };
}

// Export dell’hook personalizzato
export default useTasks;
