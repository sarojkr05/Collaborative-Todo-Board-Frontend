import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../../utils/api";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice";
import { toast } from "react-hot-toast";
import { Draggable } from "react-beautiful-dnd";
import "./TaskCard.css";

export default function TaskCard({ task, index, setEditTask }) {
  const dispatch = useDispatch();
  const [flipped, setFlipped] = useState(false);

  const handleSmartAssign = async () => {
    try {
      const res = await axios.post(`/tasks/${task._id}/smart-assign`);
      toast.success(res.data.message);
      dispatch(fetchTasks());
    } catch (err) {
      toast.error(err.response?.data?.message || "Smart assign failed");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`/tasks/${task._id}`);
      toast.success("Task deleted");
      dispatch(fetchTasks());
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card-wrapper"
          onClick={() => setFlipped(!flipped)}
        >
          <motion.div className={`task-card-inner ${flipped ? "flipped" : ""}`}>
            {/* FRONT SIDE */}
            <div className="task-card-front">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>
                <strong>Priority:</strong> {task.priority}
              </p>
              <p className="task-assigned">
                {task.assignedUser
                  ? `Assigned to: ${task.assignedUser.name}`
                  : "Unassigned"}
              </p>
            </div>

            {/* BACK SIDE */}
            <div className="task-card-back">
              <button onClick={() => setEditTask(task)}>✏️ Edit</button>
              <button onClick={handleDelete} className="delete-btn">
                🗑️ Delete
              </button>
              {!task.assignedUser && (
                <button onClick={handleSmartAssign}>Smart Assign</button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </Draggable>
  );
}
