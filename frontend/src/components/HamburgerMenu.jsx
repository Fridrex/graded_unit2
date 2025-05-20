/**
 * @file HamburgerMenu.jsx
 * @description A simple component that renders a hamburger menu icon.
 * Used for toggling navigation menus in mobile views.
 */

/**
 * @function HamburgerMenu
 * @description Renders a three-bar hamburger icon.
 * Its appearance (e.g., transforming into an 'X') is controlled by CSS
 * based on the `isOpen` prop.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Indicates whether the menu is currently open or closed.
 * This prop is used to apply conditional styling via CSS.
 * @param {function} props.onClick - The function to call when the hamburger icon is clicked.
 * Toggles the mobile navigation menu.
 * @returns {JSX.Element} The hamburger menu icon UI.
 */
const HamburgerMenu = ({ isOpen, onClick }) => {
  return (
    // The main div for the hamburger menu icon
    // Applies 'hamburger-menu--open' class if `isOpen` is true, for CSS transformations
    <div className={`hamburger-menu ${isOpen ? 'hamburger-menu--open' : ''}`} onClick={onClick}>
      {/* The three bars of the hamburger icon */}
      <span className="hamburger-menu__bar"></span>
      <span className="hamburger-menu__bar"></span>
      <span className="hamburger-menu__bar"></span>
    </div>
  );
};

export default HamburgerMenu;
