import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Profile from './Profile';
import Settings from './Settings';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="dashboard-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 