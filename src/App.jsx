// Import dei componenti di routing
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// Import delle pagine
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";

// Import del provider globale
import { GlobalProvider } from "./contexts/GlobalContext.jsx";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          {/* Barra di navigazione */}
          <nav>
            <NavLink to="/">Lista Task</NavLink>
            <NavLink to="/add">Aggiungi Task</NavLink>
          </nav>
          {/* Definizione delle rotte */}
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

// Esportazione del componente principale dell’app
export default App;
