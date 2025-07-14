import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);
  console.log("User from state", user)

  const handleAuthAction = () => {
    if (user) {
      dispatch(logoutUser());
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        <h2 className="navbar-brand">📋 CollabBoard</h2>
      </div>
      <div className="navbar-right">
        <button className="navbar-button" onClick={handleAuthAction}>
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}
