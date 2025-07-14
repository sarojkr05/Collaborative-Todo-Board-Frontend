import KanbanBoard from "../components/kanban/Board";
import Sidebar from "../components/Shared/Sidebar";
import Navbar from "../components/Shared/Navbar";
import ActionLogPanel from "../components/logs/ActionLogPanel"
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minHeight: 0,
            }}
          >
            <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
              <KanbanBoard />
            </div>
            <ActionLogPanel />
          </div>
        </main>
      </div>
    </>
  );
}
