import { useState } from "react";
import axios from "../utils/api";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";

export default function CreateTaskModal({ onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/tasks", form);
      toast.success("Task created!");
      dispatch(fetchTasks());
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to create task";
      toast.error(message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Create Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit">Create</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
