import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sidebar component
function Sidebar() {
  return (
    <div style={{ 
      width: '180px', 
      background: '#14b85b4b', 
      padding: '20px', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0 
    }}>
      <div style={{ marginBottom: '20px', fontSize: '24px' }}>☰</div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="./home">Home</Link></li>
        <li>Documentation</li>
        <li><Link to="./settings">Settings</Link></li>
        <li>Profile</li>
        <li>FAQ</li>
      </ul>
    </div>
  );
}

// Login Form component
function LoginForm() {
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ 
      marginLeft: '320px', 
      marginTop: '100px', 
      padding: '40px', 
      border: '5px solid #025420cf', 
      borderRadius: '10px', 
      width: '400px'
    }}>
      <form>
        <div style={{ marginLeft: '80px', marginBottom: '20px' }}>
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
        <div style={{ marginLeft: '80px', marginBottom: '20px' }}>
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
        <div style={{ marginLeft: '80px', marginBottom: '20px' }}>
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
        <Link to={role} style={{ marginLeft: '80px' }}>
            <button>Login</button>
        </Link>
      </form>
    </div>
  );
}

// Footer component
function Footer() {
  return (
    <div style={{
      marginLeft: '220px',
      position: 'fixed',
      bottom: 0,
      width: 'calc(100% - 220px)',
      background: '#04502e63',
      padding: '10px',
      textAlign: 'center'
    }}>
      FOOTER
    </div>
  );
}

// Main Page component
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
