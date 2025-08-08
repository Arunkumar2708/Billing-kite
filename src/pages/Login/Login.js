import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import users from './users.json'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100">
      <ToastContainer />
      <div className="login-card shadow rounded-4 p-4 p-md-5 bg-white">
        <div className="text-center mb-4">
          <h2 className="app-logo mb-1">Billing</h2>
          <p className="text-muted">Sign in to continue..</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-2">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: '' }));
              }}
            />
            <label htmlFor="email">Email address</label>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-floating mb-2 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: '' }));
              }}
            />
            <label htmlFor="password">Password</label>
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!errors.password && (showPassword ? <EyeOff size={20} /> : <Eye size={20} />)}
            </span>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <button
              type="button"
              className="btn btn-link text-decoration-none small text-primary p-0"
              onClick={() => {}}
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
