import { useState } from "react";
import { Link, NavLink } from "react-router";
import HamburgerMenu from "./HamburgerMenu";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="navigation">
            <div className="logo">
                <Link to="/"><img src="src/assets/images/logo.png" alt="Logo" className="logo__img"/></Link>
                <p>Blockchain Education</p>
            </div>
            <nav className={`navigation__menu ${isMenuOpen ? "open" : ""}`}>
                <ul className={`navigation__menu__links ${isMenuOpen ? "open" : ""}`}>
                    <li>
                        <NavLink
                        to="/"
                        end
                        // className={({ isActive }) => {
                        //     console.log("Home isActive:", isActive);
                        //     isActive ? 'navigation__menu__links__link--active' : ''}}
                        style={({ isActive }) => isActive ? { color: 'var(--secondary-accent)' } : {}}>
                            Home
                        </NavLink>
                    </li>
                    <li><NavLink to="/learn" style={({ isActive }) => isActive ? { color: 'var(--secondary-accent)' } : {}}>Learn</NavLink></li>
                    <li><NavLink to="/wallet" style={({ isActive }) => isActive ? { color: 'var(--secondary-accent)' } : {}}>Wallet</NavLink></li>
                    <li><NavLink to="/resources" style={({ isActive }) => isActive ? { color: 'var(--secondary-accent)' } : {}}>Resources</NavLink></li>
                    <li><NavLink to="/about" style={({ isActive }) => isActive ? { color: 'var(--secondary-accent)' } : {}}>About</NavLink></li>
                </ul>
                <HamburgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
            </nav>
            </div>
        </>
    )
};

export default Navigation;