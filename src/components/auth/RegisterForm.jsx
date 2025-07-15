import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(result.payload || "Registration failed!");
      }
    });
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <form onSubmit={handleSubmit} className="register-form">
          <h2 className="form-title">Create Account</h2>
          <p className="form-subtitle">Start your journey with us</p>

          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-input"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button type="submit" disabled={loading} className="form-button">
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="form-footer">
            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} className="link">
                Login
              </span>
            </p>
            {error && (
              <p className="error">
                {typeof error === "string" ? error : error.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
