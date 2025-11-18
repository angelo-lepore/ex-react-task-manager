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
  const removeTask = async (taskId) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Funzione per rimuovere più task
  const removeMultipleTasks = async (taskIds) => {
    const deleteRequests = taskIds.map((taskId) =>
      fetch(`${VITE_API_URL}/tasks/${taskId}`, { method: "DELETE" }).then(
        (res) => res.json()
      )
    );
    const results = await Promise.allSettled(deleteRequests);
    const fullfilledDeletions = [];
    const rejectedDeletions = [];
    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value.success) {
        fullfilledDeletions.push(taskIds[index]);
      } else {
        rejectedDeletions.push(taskIds[index]);
      }
      if (fullfilledDeletions.length > 0) {
        setTasks((prev) =>
          prev.filter((t) => !fullfilledDeletions.includes(t.id))
        );
      }
      if (rejectedDeletions.length > 0) {
        alert(
          `Non è stato possibile eliminare i task con ID: ${rejectedDeletions.join(
            ", "
          )}`
        );
      }
    });
  };

  // Funzione per aggiornare un task esistente
  async function updateTask(updateTask) {
    const response = await fetch(`${VITE_API_URL}/tasks/${updateTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateTask),
    });
    const { success, message, task: newTask } = await response.json();
    if (!success) throw new Error(message);
    setTasks((prev) =>
      prev.map((oldTask) => (oldTask.id === newTask.id ? newTask : oldTask))
    );
  }

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}

// Export dell’hook personalizzato
export default useTasks;
