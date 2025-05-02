import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Signup = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

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
      
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }
    if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
    }
      await signup({
        name: formData.name,
        email: formData.email
      });
      setCurrentPage('home');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Please enter your details to sign up</p>
        
        {error && (
          <div className="auth-error">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
            <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
          />
        </div>

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

        <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
              placeholder="Confirm your password"
              required
              disabled={isLoading}
          />
        </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button 
            onClick={() => setCurrentPage('login')}
            className="auth-link"
            disabled={isLoading}
          >
          Login
        </button>
        </div>
      </div>
    </div>
  );
};

export default Signup; 