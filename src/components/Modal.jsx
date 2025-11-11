// Import di createPortal
import { createPortal } from "react-dom";

// Componente Modale
export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
  confirmStyle,
}) {
  if (!show) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <div>{content}</div>
        <div className="modal-buttons">
          <button onClick={onClose}>Annulla</button>
          <button onClick={onConfirm} style={confirmStyle}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
