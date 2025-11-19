// Import di React e dei hook necessari
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import dayjs from "dayjs";

import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

// Componente che mostra la pagina di dettaglio di un task
export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const task = tasks.find((t) => t.id === parseInt(id));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  if (!task) {
    return (
      <main>
        <div>
          <h1>❌ Task non trovato</h1>
          <p>Il task con l'ID specificato non esiste.</p>
        </div>
      </main>
    );
  }

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminata con successo!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleUpdated = async (updatedTask) => {
    try {
      await updateTask(updatedTask);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <main>
      <div className="task-detail">
        <h1>📋 Dettaglio Task</h1>
        <div className="task-info">
          <p>
            <strong>Nome:</strong> {task.title}
          </p>
          <p>
            <strong>Descrizione:</strong> {task.description}
          </p>
          <p>
            <strong>Stato:</strong>
            {task.status}
          </p>
          <p>
            <strong>Creato il:</strong>
            {dayjs(task.createdAt).format("DD/MM/YYYY")}
          </p>
          <button onClick={() => setShowDeleteModal(true)}>Elimina Task</button>
          <button
            onClick={() => setShowEditModal(true)}
            style={{ marginLeft: "0.5rem", backgroundColor: "#2563eb" }}
          >
            Modifica Task
          </button>
          {/* Modale elimina task */}
          <Modal
            title="Conferma eliminazione"
            content="Sei sicuro di voler eliminare questo task? L'azione non può essere annullata."
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            confirmText="Elimina"
          />
          {/* Modale modifica task */}
          <EditTaskModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            task={task}
            onSave={handleUpdated}
          />
        </div>
      </div>
    </main>
  );
}
