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
        navigate("/");
      } else {
        toast.error(result.payload || "Login failed!");
      }
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">Login to continue</p>

          <label className="form-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <button type="submit" disabled={loading} className="form-button">
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="form-footer">
            <p>
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")} className="link">
                Register
              </span>
            </p>
            {error && <p className="error">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
