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
        toast.success("Registeration Successful!");
        navigate("/login"); // redirect to dashboard
      } else {
        toast.error(result.payload || "Registration failed!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" disabled={loading}>
        Register
      </button>
      {/** don't have an account navigate to the register page */}
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
    </form>
  );
}
