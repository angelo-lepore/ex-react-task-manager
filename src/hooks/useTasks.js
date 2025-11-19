// Import delle funzioni necessarie da React
import { useEffect, useReducer } from "react";
import tasksReducer from "../reducers/tasksReducer";

// Recupero della variabile d’ambiente definita in .env
const { VITE_API_URL } = import.meta.env;

// Hook personalizzato per gestire i task
function useTasks() {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, []);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => dispatchTasks({ type: "LOAD_TASKS", payload: data }))
      .catch((error) => console.error(error));
  }, []);

  // Funzione per aggiungere un nuovo task
  const addTask = async (newTask) => {
    const taskExists = tasks.some(
      (task) =>
        task.title.trim().toLowerCase() === newTask.title.trim().toLowerCase()
    );
    if (taskExists) {
      throw new Error("Un task con questo titolo esiste già.");
    }
    const response = await fetch(`${VITE_API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const { success, message, task } = await response.json();
    if (!success) throw new Error(message);
    dispatchTasks({ type: "ADD_TASK", payload: task });
  };

  // Funzione per rimuovere un task esistente
  const removeTask = async (taskId) => {
    const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const { success, message } = await response.json();
    if (!success) throw new Error(message);
    dispatchTasks({ type: "REMOVE_TASK", payload: taskId });
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
        dispatchTasks({
          type: "REMOVE_MULTIPLE_TASKS",
          payload: fullfilledDeletions,
        });
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
  const updateTask = async (updatedTask) => {
    const taskWithSameTitle = tasks.find(
      (task) => task.title.toLowerCase() === updatedTask.title.toLowerCase()
    );
    if (taskWithSameTitle && taskWithSameTitle.id !== updatedTask.id) {
      throw new Error("Un task con questo titolo esiste già.");
    }

    const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const { success, message, task: newTask } = await response.json();
    if (!success) throw new Error(message);
    dispatchTasks({ type: "UPDATE_TASK", payload: newTask });
  };

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}

// Export dell’hook personalizzato
export default useTasks;
