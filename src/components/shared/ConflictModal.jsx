export default function ConflictModal({ conflict, onResolve, onCancel }) {
  const { local, server } = conflict;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>⚠️ Conflict Detected</h3>
        <p>This task was modified by someone else while you were editing.</p>

        <div className="conflict-preview">
          <div>
            <h4>Your Version</h4>
            <p><strong>Title:</strong> {local.title}</p>
            <p><strong>Description:</strong> {local.description}</p>
          </div>
          <div>
            <h4>Server Version</h4>
            <p><strong>Title:</strong> {server.title}</p>
            <p><strong>Description:</strong> {server.description}</p>
          </div>
        </div>

        <div className="conflict-buttons">
          <button onClick={() => onResolve(server)}>🔄 Load Server Version</button>
          <button onClick={() => onResolve(local)}>💪 Overwrite Anyway</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
