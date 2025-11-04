// Import delle funzioni necessarie da React
import { createContext } from "react";

// Import dell’hook
import useTasks from "../hooks/useTasks.js";

// Creazione del contesto globale
const GlobalContext = createContext();

// Componente che fornisce il contesto all'intera applicazione
function GlobalProvider({ children }) {
  const tasksData = useTasks();

  return (
    // Definizione del provider del contesto
    <GlobalContext.Provider value={{ ...tasksData }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Export del contesto e del provider
export { GlobalContext, GlobalProvider };
