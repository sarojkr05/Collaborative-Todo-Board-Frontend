import { useState } from "react";
import axios from "../utils/api";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import { toast } from "react-hot-toast";

export default function EditTaskModal({ task, onClose, onConflict }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/tasks/${task._id}`, {
        ...form,
        lastModified: task.lastModified,
      });
      toast.success("Task updated!");
      onClose();
      dispatch(fetchTasks());
    } catch (err) {
      if (err.response?.status === 409) {
        onConflict(task, err.response.data.serverVersion);
      } else {
        toast.error("Update failed.");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
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
          <button type="submit">Update</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
