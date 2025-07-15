import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../utils/api";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import "./CreateTaskModal.css";

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
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="modal-title">➕ Create Task</h3>
          <form onSubmit={handleSubmit} className="task-form">
            <input
              className="form-input"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <textarea
              className="form-textarea"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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
              <button type="submit" className="btn create">
                Create
              </button>
              <button type="button" onClick={onClose} className="btn cancel">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
