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
    <div style={{ padding: "1rem" }}>
      <h2>🧾 My Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned to you yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li key={task._id} style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "6px"
            }}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
