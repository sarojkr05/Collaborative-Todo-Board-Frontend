import { useEffect, useState } from "react";
import axios from "../utils/api";
import { toast } from "react-hot-toast";
import socket from "../utils/socket";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("/logs/recent");
      setLogs(res.data);
    } catch (err) {
      toast.error("Failed to load logs");
    }
  };

  useEffect(() => {
    fetchLogs();

    socket.on("log_created", fetchLogs);

    return () => {
      socket.off("log_created", fetchLogs);
    };
  }, []);

  return (
    <div style={{ padding: "1rem", maxHeight: "80vh", overflowY: "auto" }}>
      <h2>📜 Activity Logs</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {logs.map((log) => (
          <li
            key={log._id}
            style={{
              padding: "0.5rem",
              marginBottom: "0.5rem",
              borderBottom: "1px solid #ccc",
            }}
          >
            <p>
              <strong>{log.user?.name || "Someone"}</strong> {log.action}
              {log.task?.title ? ` on "${log.task.title}"` : ""}
            </p>
            <small>{new Date(log.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
