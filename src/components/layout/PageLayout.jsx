import React, { useState } from 'react';

const PageLayout = ({ children, isAuthPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className={`page-layout ${isAuthPage ? 'auth-page' : ''}`} style={{ paddingTop: '70px' }}>
      {children}
      {/* <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button> */}
      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {/* menu items */}
      </nav>
    </main>
  );
};

export default PageLayout;
