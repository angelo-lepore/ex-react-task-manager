// Import di React e dei hook necessari
import { memo, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";

// Componente che rappresenta una singola riga della tabella
const TaskRow = memo(({ task }) => {
  const navigate = useNavigate();
  const { removeTask } = useContext(GlobalContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const statusName = task.status.replace(" ", "").toLowerCase();

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

  return (
    <>
      <tr>
        <td>
          <Link
            to={`/task/${task.id}`}
            style={{
              userSelect: "none",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {task.title}
          </Link>
        </td>
        <td className={statusName}>
          <span>{task.status}</span>
        </td>
        <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        <td>
          <i
            className="fa-solid fa-trash-can"
            style={{
              color: "#ff0000",
              cursor: "pointer",
            }}
            onClick={() => setShowDeleteModal(true)}
          ></i>
        </td>
      </tr>

      {/* Modale */}
      <Modal
        title="Conferma eliminazione"
        content="Sei sicuro di voler eliminare questo task? L'azione non può essere annullata."
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
    </>
  );
});

// Export del componente
export default TaskRow;
