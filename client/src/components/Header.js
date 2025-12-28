import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          CipherSQLStudio
        </Link>
        <nav className="header__nav">
          <Link to="/">Assignments</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;