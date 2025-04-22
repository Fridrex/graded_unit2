import { useState } from "react";
import { Link } from "react-router";
import HamburgerMenu from "./HamburgerMenu";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navigation ${isMenuOpen ? "open" : ""}`}>
            <div className="logo">Blockchain Education</div>
            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/learn">Learn</Link></li>
                <li><Link to="/wallet">Wallet</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <HamburgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
        </nav>
    )
};

export default Navigation;