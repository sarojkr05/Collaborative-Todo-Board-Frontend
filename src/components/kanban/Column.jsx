import { Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import "./Column.css";

export default function KanbanColumn({ status, tasks, setEditTask }) {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`kanban-column ${
            snapshot.isDraggingOver ? "dragging-over" : ""
          }`}
        >
          <h3 className="kanban-column-title">{status}</h3>
          {tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              index={index}
              setEditTask={setEditTask}
            />
          ))}
          {provided.placeholder}
        </motion.div>
      )}
    </Droppable>
  );
}
