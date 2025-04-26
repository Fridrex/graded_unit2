import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import HamburgerMenu from './HamburgerMenu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const disableScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }

    disableScroll();
  }, [isMenuOpen]);

  return (
    <>
      <div className="navigation">
        <div className="logo">
          <Link to="/">
            <img src="src/assets/images/logo.png" alt="Logo" className="logo__img" />
          </Link>
          <p>Blockchain Education</p>
        </div>
        <nav className={`navigation__menu ${isMenuOpen ? 'navigation__menu--open' : ''}`}>
          <ul className={`navigation__menu__links ${isMenuOpen ? 'navigation__menu__links--open' : ''}`}>
            <li>
              <NavLink
                to="/"
                end
                // className={({ isActive }) => {
                //     console.log("Home isActive:", isActive);
                //     isActive ? 'navigation__menu__links__link--active' : ''}}
                style={({ isActive }) => (isActive ? { color: 'var(--secondary-accent)' } : {})}
                onClick={() => {
                  isMenuOpen ? toggleMenu() : null;
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/learn"
                style={({ isActive }) => (isActive ? { color: 'var(--secondary-accent)' } : {})}
                onClick={() => {
                  isMenuOpen ? toggleMenu() : null;
                }}
              >
                Learn
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wallet"
                style={({ isActive }) => (isActive ? { color: 'var(--secondary-accent)' } : {})}
                onClick={() => {
                  isMenuOpen ? toggleMenu() : null;
                }}
              >
                Wallet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/resources"
                style={({ isActive }) => (isActive ? { color: 'var(--secondary-accent)' } : {})}
                onClick={() => {
                  isMenuOpen ? toggleMenu() : null;
                }}
              >
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                style={({ isActive }) => (isActive ? { color: 'var(--secondary-accent)' } : {})}
                onClick={() => {
                  isMenuOpen ? toggleMenu() : null;
                }}
              >
                About
              </NavLink>
            </li>
          </ul>
          <HamburgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        </nav>
      </div>
    </>
  );
};

export default Navigation;
