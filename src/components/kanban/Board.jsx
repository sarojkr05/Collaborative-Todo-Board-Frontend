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
import { AnimatePresence } from "framer-motion";
import "./Board.css";

const statuses = ["Todo", "In Progress", "Done"];

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const [editTask, setEditTask] = useState(null);
  const [conflict, setConflict] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());

    socket.on("task_updated", () => dispatch(fetchTasks()));
    socket.on("task_created", () => dispatch(fetchTasks()));
    socket.on("task_deleted", () => dispatch(fetchTasks()));

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
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;

    try {
      await axios.put(`/tasks/${draggableId}`, {
        status: destination.droppableId,
        lastModified: new Date(),
      });
      toast.success("Task updated!");
      dispatch(fetchTasks());
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  return (
    <>
      <div className="kanban-header">
        <button className="add-task-btn" onClick={() => setShowCreateModal(true)}>
          ➕ Add Task
        </button>
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <CreateTaskModal onClose={() => setShowCreateModal(false)} />
        )}
      </AnimatePresence>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
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

      <AnimatePresence>
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
      </AnimatePresence>

      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}
