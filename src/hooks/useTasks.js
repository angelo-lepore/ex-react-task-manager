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
  const addTask = async (newTask) => {
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const { success, message, task } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) => [...prev, task]);
  };

  // Funzione per rimuovere un task esistente
  const removeTask = async (taskid) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${taskid}`, {
      method: "DELETE",
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) => prev.filter((t) => t.id !== taskid));
  };

  // Funzione per aggiornare un task esistente
  const updateTask = () => {
    // (da implementare)
  };

  return { tasks, addTask, removeTask, updateTask };
}

// Export dell’hook personalizzato
export default useTasks;
