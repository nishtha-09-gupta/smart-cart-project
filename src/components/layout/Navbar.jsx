import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ setCurrentPage, currentPage }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    setIsMenuOpen(false);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand" onClick={() => handleNavClick('home')}>
            SmartCart
          </div>

          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Overlay for sidebar */}
          {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}

          <div className={`nav-items${isMenuOpen ? ' active' : ''}`}>
            {/* Close button for sidebar */}
            {isMenuOpen && (
              <button className="close-sidebar" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">&times;</button>
            )}
            <div className="main-nav">
              <button 
                className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick("home")}
              >
                Home
              </button>
              <button 
                className={`nav-item ${currentPage === 'list' ? 'active' : ''}`}
                onClick={() => handleNavClick("list")}
              >
                Shopping List
              </button>
              <button 
                className={`nav-item ${currentPage === 'recipes' ? 'active' : ''}`}
                onClick={() => handleNavClick("recipes")}
              >
                Recipes
              </button>
              <button 
                className={`nav-item ${currentPage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick("contact")}
              >
                Contact
              </button>
            </div>

            <div className="nav-buttons">
              <button 
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              {isAuthenticated ? (
                <div className="auth-buttons">
                  <button 
                    className="nav-item dashboard-link" 
                    onClick={() => handleNavClick("dashboard")}
                  >
                    <span className="dashboard-icon">👤</span>
                    <span className="dashboard-text">{user.name}</span>
                  </button>
                  <button 
                    className="nav-item logout-link" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <button 
                    className="nav-item login-link" 
                    onClick={() => handleNavClick("login")}
                  >
                    Login
                  </button>
                  <button 
                    className="nav-item signup-link" 
                    onClick={() => handleNavClick("signup")}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
