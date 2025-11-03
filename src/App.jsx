// Import dei componenti di routing
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// Import delle pagine
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
