import { useState } from 'react';

const HamburgerMenu = ({ isOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(isOpen);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        </div>
    );
};

export default HamburgerMenu;