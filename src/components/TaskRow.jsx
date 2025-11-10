// Import di React e della funzione memo
import { memo } from "react";

// Import del componente Link da react-router-dom
import { Link } from "react-router-dom";

// Componente che rappresenta una singola riga della tabella
const TaskRow = memo(({ task }) => {
  const statusName = task.status.replace(" ", "").toLowerCase();
  return (
    <>
      <tr>
        <td>
          <Link to={`/task/${task.id}`}>{task.title}</Link>
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
          ></i>
        </td>
      </tr>
    </>
  );
});

// Export del componente
export default TaskRow;
