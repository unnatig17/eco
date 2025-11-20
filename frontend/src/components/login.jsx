import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        id,
        password,
        role,
      });

      if (res.data.success) {
        // REDIRECT BASED ON ROLE
        switch (role) {
          case "citizen":
            navigate("/user");
            break;
          case "farmer":
            navigate("/farmer");
            break;
          case "facility":
            navigate("/facility");
            break;
          case "collector":
            navigate("/collections");
            break;
          case "municipality":
            navigate("/municipality");
            break;
          default:
            navigate("/");
        }
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }

    setLoading(false);
  }

  return (
    <div className="login-wrapper">

      <div className="login-box">
        <h1 className="login-title">Log in to your account</h1>
        <p className="login-subtitle">
          Enter your ID, password and role to continue
        </p>

        <form onSubmit={handleLogin}>

          {/* Role */}
          <div className="login-field">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>           
            <option value="">Select role</option>
            <option value="citizen">Citizen</option>
            <option value="farmer">Farmer</option>
            <option value="facility">Facility</option>
            <option value="collector">Collector</option>
            <option value="municipality">Municipality</option>
            </select>
          </div>

          {/* User ID */}
          <div className="login-field">
            <label>User ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your ID"
            />
          </div>

          {/* Password */}
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="login-error">{error}</p>}

          {/* Login Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <span>Contact admin</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
