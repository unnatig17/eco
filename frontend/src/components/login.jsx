import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./login.css";

/* SIDEBAR */
function Sidebar() {
  return (
    <div className="login-sidebar">
      <div className="login-sidebar-menu">☰</div>

      <ul>
        <li><Link to="./home">Home</Link></li>
        <li>Documentation</li>
        <li><Link to="./settings">Settings</Link></li>
        <li>Profile</li>
        <li>FAQ</li>
      </ul>
    </div>
  );
}

/* LOGIN FORM */
function LoginForm() {
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-form-container">
      <form>
        <div className="login-field">
          <label>
            Role:&nbsp;
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="">Select role</option>
              <option value="./municipality">Municipality</option>
              <option value="./user">Citizen</option>
              <option value="./farmer">Farmer</option>
              <option value="./facility">Facility</option>
              <option value="./collections">Collections</option>
            </select>
          </label>
        </div>

        <div className="login-field">
          <label>
            ID:&nbsp;
            <input 
              type="text" 
              value={id} 
              onChange={e => setId(e.target.value)} 
              placeholder="Enter your ID" 
            />
          </label>
        </div>

        <div className="login-field">
          <label>
            Password:&nbsp;
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter your password"
            />
          </label>
        </div>

        <Link to={role}>
          <button className="login-button" type="button">Login</button>
        </Link>
      </form>
    </div>
  );
}

/* FOOTER */
function Footer() {
  return (
    <div className="login-footer">
      ECOTRACK © 2025
    </div>
  );
}

/* MAIN COMPONENT*/
function Login() {
  return (
    <div>
      <Sidebar />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default Login;
