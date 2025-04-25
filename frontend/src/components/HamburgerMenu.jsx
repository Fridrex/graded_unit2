const HamburgerMenu = ({ isOpen, onClick }) => {
  return (
    <div className={`hamburger-menu ${isOpen ? 'hamburger-menu--open' : ''}`} onClick={onClick}>
      <span className="hamburger-menu__bar"></span>
      <span className="hamburger-menu__bar"></span>
      <span className="hamburger-menu__bar"></span>
    </div>
  );
};

export default HamburgerMenu;
