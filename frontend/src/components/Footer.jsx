/**
 * @file Footer.jsx
 * @description Component for the application's footer.
 * Displays navigation links, a logo, copyright information, and a
 * conditional call-to-action (CTA) section based on the current page.
 */

import { Link, useLocation } from 'react-router'; // For navigation links and getting current location
import footerLogo from '../../src/assets/images/logo.png'; // Logo image for the footer

/**
 * @function Footer
 * @description The main Footer component.
 * It checks the current pathname to decide whether to show a prominent CTA section.
 * The CTA is hidden on 'learn' and 'wallet' pages to avoid redundancy.
 * @returns {JSX.Element} The Footer UI.
 */
const Footer = () => {
  const location = useLocation(); // Hook to get the current location object
  const { pathname } = location; // Destructure pathname from the location object

  // Determine if the current page is '/learn' or '/wallet' (or any sub-path)
  const isLearnOrWallet = pathname.includes('/learn') || pathname.includes('/wallet');

  return (
    <>
      {/* Conditional rendering of the footer content */}
      {/* If not on learn or wallet page, show footer with CTA */}
      {!isLearnOrWallet ? (
        <footer className="footer-container">
          {/* Call-to-action section */}
          <div className="footer__cta">
            <div className="footer__cta__text">
              <p>Ready to understand the future of money?</p>
              <p>Start with blockchain basics or jump straight into creating your first wallet.</p>
            </div>
            <div className="footer__cta__buttons">
              {/* Link to the Learn page */}
              <Link to="/learn" className="cybr-btn">
                Learn
                <span aria-hidden className="cybr-btn__glitch">
                  Learn
                </span>
              </Link>
              {/* Link to the Wallet page */}
              <Link to="/wallet" className="cybr-btn">
                Create a wallet
                <span aria-hidden className="cybr-btn__glitch">
                  Create a wallet
                </span>
              </Link>
            </div>
          </div>
          {/* Common footer content (links, logo, copyright) */}
          <div className="footer__content">
            <div className="footer__content__links">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/learn">Learn</Link>
                </li>
                <li>
                  <Link to="/wallet">Wallet</Link>
                </li>
                <li>
                  <Link to="/resources">Resources</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
            <div className="footer__content__logo">
              <img src={footerLogo} alt="Logo" className="footer__content__logo__image" />
              <p>Blockchain Education</p>
            </div>
            <div className="footer__content__copyright">
              <p>All rights reserved &copy; 2025</p>
            </div>
          </div>
        </footer>
      ) : (
        // If on learn or wallet page, show footer without CTA
        <footer className="footer-container">
          <div className="footer__content">
            <div className="footer__content__links">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/learn">Learn</Link>
                </li>
                <li>
                  <Link to="/wallet">Wallet</Link>
                </li>
                <li>
                  <Link to="/resources">Resources</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
            <div className="footer__content__logo">
              <img src={footerLogo} alt="Logo" className="footer__content__logo__image" />
              <p>Blockchain Education</p>
            </div>
            <div className="footer__content__copyright">
              <p>All rights reserved &copy; 2025</p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
