import { useTheme } from '../../context/ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="settings-section">
      <h2>Settings</h2>
      
      <div className="settings-group">
        <h3>Appearance</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Dark Mode</label>
            <p>Toggle between light and dark theme</p>
          </div>
          <div className="setting-control">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h3>Notifications</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Email Notifications</label>
            <p>Receive email updates about your shopping list</p>
          </div>
          <div className="setting-control">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h3>Privacy</h3>
        <div className="setting-item">
          <div className="setting-info">
            <label>Share Shopping List</label>
            <p>Allow others to view your shopping list</p>
          </div>
          <div className="setting-control">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 