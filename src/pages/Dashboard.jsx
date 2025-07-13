import KanbanBoard from "../components/kanban/Board";
import Sidebar from "../components/Shared/Sidebar";
import Navbar from "../components/Shared/Navbar";
import "./Dashboard.css";
import ActionLogPanel from "../components/logs/ActionLogPanel";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <KanbanBoard />
          {/* <ActionLogPanel /> */}
        </main>
      </div>
    </>
  );
}
