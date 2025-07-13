import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Board", path: "/" },
    { label: "My Tasks", path: "/my-tasks" },
    { label: "Logs", path: "/logs" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      toast.success("Successfully logged out!");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <aside style={{
      width: "200px",
      backgroundColor: "#f5f5f5",
      padding: "1rem",
      height: "100vh"
    }}>
      <h3 style={{ marginBottom: "1rem" }}>📋 Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItems.map(({ label, path }) => (
          <li key={label}>
            <Link
              to={path}
              style={{
                display: "block",
                padding: "0.5rem",
                textDecoration: "none",
                color: location.pathname === path ? "#fff" : "#333",
                backgroundColor: location.pathname === path ? "#007bff" : "transparent",
                borderRadius: "4px",
                marginBottom: "0.5rem"
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          padding: "0.5rem",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          width: "100%"
        }}
      >
        Logout
      </button>
    </aside>
  );
}
