import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import socket from "./utils/socket";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import MyTasksPage from "./pages/MyTaskPage";
import LogsPage from "./pages/LogsPage";

function App() {
  useEffect(() => {
    socket.connect(); // 👈 ensure socket is connected

    socket.on("toast", ({ message, type }) => {
      if (type === "success") toast.success(message);
      else toast.error(message);
    });

    return () => {
      socket.off("toast");
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/my-tasks" element={<MyTasksPage />} />
      <Route path="/logs" element={<LogsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
