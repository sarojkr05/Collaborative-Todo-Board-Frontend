import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../utils/api";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import { toast } from "react-hot-toast";
import "./EditTaskModal.css";

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
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="modal-title">✏️ Edit Task</h3>
          <form onSubmit={handleSubmit} className="task-form">
            <input
              className="form-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              required
            />
            <textarea
              className="form-textarea"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
            />
            <select
              className="form-select"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <div className="form-buttons">
              <button type="submit" className="btn update">Update</button>
              <button type="button" className="btn cancel" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
