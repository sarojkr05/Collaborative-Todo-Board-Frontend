import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          width: "400px",
          maxWidth: "90%",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit" style={{ marginRight: "0.5rem" }}>
            Update
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);
}
