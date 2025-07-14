import { motion, AnimatePresence } from "framer-motion";

export default function ConflictModal({ conflict, onResolve, onCancel }) {
  const { local, server } = conflict;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <motion.div
          className="modal"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            width: "500px",
            maxWidth: "90%",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h3>⚠️ Conflict Detected</h3>
          <p style={{ marginBottom: "1rem" }}>
            This task was modified by someone else while you were editing.
          </p>

          <div
            className="conflict-preview"
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1rem",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1 }}>
              <h4>Your Version</h4>
              <p>
                <strong>Title:</strong> {local.title}
              </p>
              <p>
                <strong>Description:</strong> {local.description}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <h4>Server Version</h4>
              <p>
                <strong>Title:</strong> {server.title}
              </p>
              <p>
                <strong>Description:</strong> {server.description}
              </p>
            </div>
          </div>

          <div
            className="conflict-buttons"
            style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
          >
            <button onClick={() => onResolve(server)}>🔄 Load Server Version</button>
            <button onClick={() => onResolve(local)}>💪 Overwrite Anyway</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
