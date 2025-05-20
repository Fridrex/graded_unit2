/**
 * @file Navigation.jsx
 * @description Component for the main site navigation bar.
 * Includes the site logo, navigation links, and a hamburger menu for mobile views.
 */

import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router'; // Link for simple navigation, NavLink for active styling
import HamburgerMenu from './HamburgerMenu'; // Hamburger menu icon component
import headerLogo from './src/assets/images/logo.png';

/**
 * @function Navigation
 * @description The main navigation component.
 * Manages the state of the mobile menu (open/closed) and handles body scroll locking
 * when the mobile menu is open.
 * @returns {JSX.Element} The navigation bar UI.
 */
const Navigation = () => {
  // State to control the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * @function toggleMenu
   * @description Toggles the open/closed state of the mobile menu.
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // useEffect to disable body scroll when the mobile menu is open
  useEffect(() => {
    const disableScroll = () => {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden'; // Prevent scrolling of the page content
      } else {
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
    };

    disableScroll(); // Call the function to set initial scroll behavior

    // Cleanup function to ensure scrolling is re-enabled if the component unmounts while menu is open
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]); // Dependency: run this effect when isMenuOpen state changes

  return (
    <>
      <div className="navigation">
        {/* Logo section with a link to the home page */}
        <div className="logo">
          <Link to="/">
            <img src={headerLogo} alt="Logo" className="logo__img" />
          </Link>
          <p>Blockchain Education</p>
        </div>

        {/* Navigation menu container */}
        {/* Applies 'navigation__menu--open' class when mobile menu is open */}
        <nav className={`navigation__menu ${isMenuOpen ? 'navigation__menu--open' : ''}`}>
          {/* Unordered list for navigation links */}
          {/* Applies 'navigation__menu__links--open' class for specific styling when mobile menu is open */}
          <ul className={`navigation__menu__links ${isMenuOpen ? 'navigation__menu__links--open' : ''}`}>
            <li>
              {/* NavLink is used for active link styling */}
              <NavLink
                to="/"
                end // `end` prop ensures this link is only active for the exact path "/"
                style={({ isActive }) => (isActive ? { color: 'var(--secondary-accent)' } : {})}
                onClick={() => {
                  // Close menu on link click in mobile view
                  if (isMenuOpen) toggleMenu();
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
                  if (isMenuOpen) toggleMenu();
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
                  if (isMenuOpen) toggleMenu();
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
                  if (isMenuOpen) toggleMenu();
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
                  if (isMenuOpen) toggleMenu();
                }}
              >
                About
              </NavLink>
            </li>
          </ul>
          {/* Hamburger menu icon, visible in mobile views (controlled by CSS) */}
          <HamburgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        </nav>
      </div>
    </>
  );
};

export default Navigation;
