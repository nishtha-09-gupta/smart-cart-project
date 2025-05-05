import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} SmartCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
