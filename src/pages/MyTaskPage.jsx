import { useEffect, useState } from "react";
import axios from "../utils/api";
import { toast } from "react-hot-toast";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);

  const fetchMyTasks = async () => {
    try {
      const res = await axios.get("/tasks/my-tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load your tasks");
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fdfdfd",
        borderRadius: "8px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          marginBottom: "1.5rem",
          color: "#333",
          borderBottom: "2px solid #eee",
          paddingBottom: "0.5rem",
        }}
      >
        🧾 My Tasks
      </h2>

      {tasks.length === 0 ? (
        <p style={{ color: "#777", fontStyle: "italic" }}>
          No tasks assigned to you yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                marginBottom: "1rem",
                padding: "1.25rem",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
                transition: "background-color 0.2s",
              }}
            >
              <h4 style={{ marginBottom: "0.5rem", color: "#222" }}>{task.title}</h4>
              <p style={{ marginBottom: "0.5rem", color: "#444" }}>{task.description}</p>
              <p style={{ marginBottom: "0.3rem", color: "#555" }}>
                <strong>Status:</strong> {task.status}
              </p>
              <p style={{ color: "#555" }}>
                <strong>Priority:</strong> {task.priority}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
