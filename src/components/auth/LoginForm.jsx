import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");
        navigate("/"); // redirect to dashboard
      } else {
        toast.error(result.payload || "Login failed!");
      }
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
        {/** don't have an account navigate to the register page */}
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="link">
            Register
          </span>
          </p>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
