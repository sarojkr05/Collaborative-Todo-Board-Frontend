import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav style={{ height: "60px", padding: "0 2rem", backgroundColor: "#20232a", color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h2>📋 CollabBoard</h2>
      <button onClick={handleLogout} style={{ backgroundColor: "#61dafb", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}>
        Logout
      </button>
    </nav>
  );
}
