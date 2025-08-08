import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard'); 
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card shadow rounded-4 p-4 p-md-5 bg-white">
        <div className="text-center mb-4">
          <h2 className="app-logo mb-1">Billing</h2>
          <p className="text-muted">Sign in to continue..</p>
        </div>
        <form onSubmit={handleSubmit}> 
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <button
              type="button"
              className="btn btn-link text-decoration-none small text-primary p-0"
              onClick={() => {
                
              }}
            >
              Forgot Password?
            </button>
          </div>

          <div className="d-grid mb-3">
            <button className="btn btn-primary py-2 rounded-3" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;