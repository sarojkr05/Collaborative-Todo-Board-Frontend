import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

export default function KanbanColumn({ status, tasks, setEditTask }) {
  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            flex: 1,
            padding: "1rem",
            backgroundColor: snapshot.isDraggingOver ? "#e0f7fa" : "#f4f4f4",
            borderRadius: "8px",
            minHeight: "300px",
          }}
        >
          <h3>{status}</h3>
          {tasks.map((task, index) => (
            <TaskCard key={task._id} task={task} index={index} setEditTask={setEditTask} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
