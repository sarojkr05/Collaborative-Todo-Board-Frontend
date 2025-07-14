import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../../utils/api";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice";
import { toast } from "react-hot-toast";
import { Draggable } from "react-beautiful-dnd";

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
          style={{
            perspective: 1000,
            ...provided.draggableProps.style,
          }}
          onClick={() => setFlipped(!flipped)} // flip on click
        >
          <motion.div
            style={{
              width: "100%",
              minHeight: "180px",
              position: "relative",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* FRONT SIDE */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                backgroundColor: "white",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                padding: "1rem",
              }}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p style={{ fontStyle: "italic" }}>
                {task.assignedUser
                  ? `Assigned to: ${task.assignedUser.name}`
                  : "Unassigned"}
              </p>
            </div>

            {/* BACK SIDE */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                backgroundColor: "#f9f9f9",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                padding: "1rem",
                transform: "rotateY(180deg)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <button onClick={() => setEditTask(task)}>✏️ Edit</button>
              <button
                onClick={handleDelete}
                style={{ marginTop: "0.5rem", color: "red" }}
              >
                🗑️ Delete
              </button>
              {!task.assignedUser && (
                <button onClick={handleSmartAssign} style={{ marginTop: "0.5rem" }}>
                  Smart Assign
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </Draggable>
  );
}
