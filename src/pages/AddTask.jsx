// Import delle funzioni necessarie da React
import { useState, useRef, useContext } from "react";

// Import del contesto globale
import { GlobalContext } from "../contexts/GlobalContext.jsx";

// Componente che mostra la pagina per aggiungere un nuovo task
export default function AddTask() {
  const { addTask } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validazione del titolo
    if (!title.trim()) {
      setError("Il nome del task non può essere vuoto.");
      return;
    }

    if ([...symbols].some((char) => title.includes(char))) {
      setError("Il nome del task non può contenere simboli speciali.");
      return;
    }

    // Costruzione oggetto task
    const newTask = {
      title: title.trim(),
      description: descriptionRef.current.value.trim(),
      status: statusRef.current.value,
    };

    try {
      await addTask(newTask);
      alert("Task aggiunto con successo!");
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main>
      <div>
        <h1>Aggiungi Nuovo Task</h1>

        <form onSubmit={handleSubmit}>
          {/* Nome del Task */}
          <div className="form-group">
            <label>Nome del Task</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Inserisci il nome del task"
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          {/* Descrizione */}
          <div className="form-group">
            <label>Descrizione</label>
            <textarea
              ref={descriptionRef}
              rows="6"
              placeholder="Aggiungi una descrizione (opzionale)"
            ></textarea>
          </div>

          {/* Stato */}
          <div className="form-group">
            <label>Stato</label>
            <select ref={statusRef} defaultValue="To do">
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Bottone */}
          <button type="submit">Aggiungi Task</button>
        </form>
      </div>
    </main>
  );
}
