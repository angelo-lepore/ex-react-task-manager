// Import delle funzioni necessarie da React
import { createContext, useState, useEffect } from "react";

// Recupero della variabile d’ambiente definita in .env
const { VITE_API_URL } = import.meta.env;

// Creazione del contesto globale
const GlobalContext = createContext();

// Componente che fornisce il contesto all'intera applicazione
function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    // Definizione del provider del contesto
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Export del contesto e del provider
export { GlobalContext, GlobalProvider };
