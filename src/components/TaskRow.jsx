// Import di React e della funzione memo
import { memo } from "react";

// Componente che rappresenta una singola riga della tabella
const TaskRow = memo(({ tasks }) => {
  const statusName = tasks.status.replace(" ", "").toLowerCase();
  return (
    <>
      <tr>
        <td>{tasks.title}</td>
        <td className={statusName}>
          <span>{tasks.status}</span>
        </td>
        <td>{new Date(tasks.createdAt).toLocaleDateString()}</td>
      </tr>
    </>
  );
});

// Export del componente
export default TaskRow;
