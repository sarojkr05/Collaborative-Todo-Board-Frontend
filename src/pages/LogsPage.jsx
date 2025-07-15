import { useEffect, useState } from "react";
import axios from "../utils/api";
import { toast } from "react-hot-toast";
import socket from "../utils/socket";
import "./LogsPage.css";
import Navbar from "../components/shared/Navbar";

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
    <>
      <Navbar />
      <div className="logs-container">
        <h2 className="logs-title">📜 Activity Logs</h2>
        <ul className="logs-list">
          {logs.map((log) => (
            <li key={log._id} className="log-item">
              <p>
                <strong>{log.user?.name || "Someone"}</strong> {log.action}
                {log.task?.title ? ` on "${log.task.title}"` : ""}
              </p>
              <small>{new Date(log.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
