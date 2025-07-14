import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  const menuItems = [
    { label: "Board", path: "/" },
    { label: "My Tasks", path: "/my-tasks" },
    { label: "Logs", path: "/logs" },
  ];

  const handleAuthClick = async () => {
    if (user) {
      try {
        await dispatch(logoutUser()).unwrap();
        toast.success("Successfully logged out!");
        navigate("/login");
      } catch (err) {
        toast.error("Logout failed");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">📋 CollabBoard</h3>
      <ul className="sidebar-menu">
        {menuItems.map(({ label, path }) => (
          <li key={label}>
            <Link
              to={path}
              className={`sidebar-link ${
                location.pathname === path ? "active" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <button className="sidebar-button" onClick={handleAuthClick}>
        {user ? "Logout" : "Login"}
      </button>
    </aside>
  );
}
