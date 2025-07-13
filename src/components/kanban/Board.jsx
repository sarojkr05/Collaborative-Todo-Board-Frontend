import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import KanbanColumn from "./Column";
import { fetchTasks } from "../../redux/slices/taskSlice";
import axios from "../../utils/api";
import { toast } from "react-hot-toast";
import EditTaskModal from "../../pages/EditTaskModal";
import ConflictModal from "../shared/ConflictModal";
import socket from "../../utils/socket";
import CreateTaskModal from "../../pages/CreateTaskModal";
import ActionLogPanel from "../logs/ActionLogPanel";

const statuses = ["Todo", "In Progress", "Done"];

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const [editTask, setEditTask] = useState(null);
  const [conflict, setConflict] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks()); // initial fetch of tasks
    // listen for real-time task updates
    socket.on("task_updated", (updatedTask) => {
      toast.success(`Task ${updatedTask.title} updated!`);
      dispatch(fetchTasks());
    });
    socket.on("task_created", (createdTask) => {
      toast.success(`Task ${createdTask.title} updated!`);
      dispatch(fetchTasks());
    });
    socket.on("task_deleted", (deletedTask) => {
      toast.success(`Task ${deletedTask.title} updated!`);
      dispatch(fetchTasks());
    });
    return () => {
      socket.off("task_updated");
      socket.off("task_created");
      socket.off("task_deleted");
    };
  }, [dispatch]);

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const newStatus = destination.droppableId;
    try {
      await axios.put(`/tasks/${draggableId}`, {
        status: newStatus,
        lastModified: new Date(),
      });
      toast.success("Task updated!");
      dispatch(fetchTasks());
    } catch (err) {
      toast.error("Failed to update task");
      console.log(err);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{ marginBottom: "1rem" }}
        >
          ➕ Add Task
        </button>

        {showCreateModal && (
          <CreateTaskModal onClose={() => setShowCreateModal(false)} />
        )}

        <div style={{ display: "flex", gap: "1rem" }}>
          {statuses.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              setEditTask={setEditTask}
            />
          ))}
        </div>
      </DragDropContext>

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onConflict={(local, server) => {
            setConflict({ local, server });
            setEditTask(null);
          }}
        />
      )}

      {conflict && (
        <ConflictModal
          conflict={conflict}
          onResolve={(version) => {
            setConflict(null);
            axios
              .put(`/tasks/${version._id}`, {
                ...version,
                lastModified: new Date(),
              })
              .then(() => {
                toast.success("Resolved & updated");
                dispatch(fetchTasks());
              });
          }}
          onCancel={() => setConflict(null)}
        />
      )}
      <ActionLogPanel />
    </>
  );
}
