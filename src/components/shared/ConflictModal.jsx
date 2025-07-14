import { motion, AnimatePresence } from "framer-motion";
import "./ConflictModal.css";

export default function ConflictModal({ conflict, onResolve, onCancel }) {
  const { local, server } = conflict;

  return (
    <AnimatePresence>
      <motion.div
        className="conflict-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="conflict-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="conflict-title">⚠️ Conflict Detected</h3>
          <p className="conflict-description">
            This task was modified by someone else while you were editing.
            Please choose which version you want to keep.
          </p>

          <div className="conflict-content">
            <div className="conflict-column">
              <h4>Your Version</h4>
              <p><strong>Title:</strong> {local.title}</p>
              <p><strong>Description:</strong> {local.description}</p>
            </div>
            <div className="conflict-column">
              <h4>Server Version</h4>
              <p><strong>Title:</strong> {server.title}</p>
              <p><strong>Description:</strong> {server.description}</p>
            </div>
          </div>

          <div className="conflict-buttons">
            <button className="btn server" onClick={() => onResolve(server)}>
              🔄 Load Server Version
            </button>
            <button className="btn local" onClick={() => onResolve(local)}>
              💪 Overwrite Anyway
            </button>
            <button className="btn cancel" onClick={onCancel}>
              ❌ Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
