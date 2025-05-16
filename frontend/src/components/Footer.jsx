import { Link, useLocation } from 'react-router';

const Footer = () => {
  const location = useLocation();
  const { pathname } = location;

  const isLearnOrWallet = pathname.includes('/learn') || pathname.includes('/wallet');

  return (
    <>
      {!isLearnOrWallet ? (
        <footer className="footer-container">
          <div className="footer__cta">
            <div className="footer__cta__text">
              <p>Ready to understand the future of money?</p>
              <p>Start with blockchain basics or jump straight into creating your first wallet.</p>
            </div>
            <div className="footer__cta__buttons">
              <Link to="/learn" className="cybr-btn">
                Learn
                <span aria-hidden class="cybr-btn__glitch">
                  Learn
                </span>
              </Link>
              <Link to="/wallet" className="cybr-btn">
                Create a wallet
                <span aria-hidden class="cybr-btn__glitch">
                  Create a wallet
                </span>
              </Link>
            </div>
          </div>
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
              <img src="src/assets/images/logo.png" alt="Logo" className="footer__content__logo__image" />
              <p>Blockchain Education</p>
            </div>
            <div className="footer__content__copyright">
              <p>All rights reserved &copy; 2025</p>
            </div>
          </div>
        </footer>
      ) : (
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
              <img src="src/assets/images/logo.png" alt="Logo" className="footer__content__logo__image" />
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
