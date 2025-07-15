import KanbanBoard from "../components/kanban/Board";
import ActionLogPanel from "../components/logs/ActionLogPanel";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
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
