import { Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import TaskCard from "./TaskCard";

export default function KanbanColumn({ status, tasks, setEditTask }) {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.droppableProps}
          transition={{ duration: 0.2 }}
          style={{
            flex: 1,
            padding: "1rem",
            backgroundColor: snapshot.isDraggingOver ? "#e0f7fa" : "#f4f4f4",
            borderRadius: "8px",
            minHeight: "300px",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>{status}</h3>
          {tasks.map((task, index) => (
            <TaskCard key={task._id} task={task} index={index} setEditTask={setEditTask} />
          ))}
          {provided.placeholder}
        </motion.div>
      )}
    </Droppable>
  );
}
