// Import di React e dei hook necessari
import { useRef, useState } from "react";
import Modal from "./Modal";

// Componente Modale
export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [editedTask, setEditedTask] = useState(task);
  const editFormRef = useRef(null);
  const changeEditedTask = (key, event) => {
    setEditedTask((prev) => ({ ...prev, [key]: event.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <Modal
      title="Modifica Task"
      content={
        <form
          ref={editFormRef}
          onSubmit={handleSubmit}
          className="edit-task-form"
        >
          {/* Nome */}
          <label>
            Nome Task:
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => changeEditedTask("title", e)}
            ></input>
          </label>
          {/* Descrizione */}
          <label>
            Descrizione:
            <textarea
              value={editedTask.description}
              onChange={(e) => changeEditedTask("description", e)}
            ></textarea>
          </label>
          {/* Stato */}
          <label>
            Stato:
            <select
              value={editedTask.status}
              onChange={(e) => changeEditedTask("status", e)}
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </form>
      }
      confirmText="Salva"
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current.requestSubmit()}
      confirmStyle={{
        backgroundColor: "#2563eb",
        color: "white",
        marginLeft: "0.5rem",
      }}
    />
  );
}
