import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      await login({
        email: formData.email,
        name: formData.email.split('@')[0]
      });

        setCurrentPage('home');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Please enter your details to login</p>
        
      {error && (
          <div className="auth-error">
          <p>{error}</p>
        </div>
      )}

        <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
            <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
              required
              disabled={isLoading}
          />
        </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
              required
              disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
            className="auth-button"
            disabled={isLoading}
        >
            {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button 
            onClick={() => setCurrentPage('signup')}
            className="auth-link"
            disabled={isLoading}
          >
          Sign up
        </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 