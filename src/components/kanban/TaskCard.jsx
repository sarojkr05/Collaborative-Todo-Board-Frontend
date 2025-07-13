import axios from "../../utils/api";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/slices/taskSlice";
import { toast } from "react-hot-toast";
import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({ task, index, setEditTask }) {
  const dispatch = useDispatch();

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
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: snapshot.isDragging ? "#fff9c4" : "white",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            ...provided.draggableProps.style,
          }}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p style={{ fontStyle: "italic" }}>
            {task.assignedUser
              ? `Assigned to: ${task.assignedUser.name}`
              : "Unassigned"}
          </p>

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
      )}
    </Draggable>
  );
}
