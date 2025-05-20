/**
 * @file App.jsx
 * @description Main application component that sets up routing and page structure.
 * Imports necessary modules from react-router, motion/react for animations,
 * and application-specific components.
 */

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import './App.css'; // Global application styles

// Import page components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Learn from './pages/Learn';
import Resources from './pages/Resources';
import Wallet from './pages/Wallet';
import BackToTop from './components/BackToTop';

/**
 * @function AnimatedRoutes
 * @description Component to handle animated transitions between routes.
 * Uses AnimatePresence and motion.div from motion/react.
 * @returns {JSX.Element} The animated routes.
 */
function AnimatedRoutes() {
  const location = useLocation(); // Gets the current location object
  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* Routes component wraps individual Route definitions */}
      {/* The key prop is set to location.pathname to trigger re-animation on route change */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </AnimatePresence>
  );
}

/**
 * @function App
 * @description The root component of the application.
 * Sets up the main layout with Navigation, main content area (AnimatedRoutes),
 * BackToTop button, and Footer.
 * @returns {JSX.Element} The main application structure.
 */
function App() {
  return (
    // Router provides routing capabilities to the entire application
    <Router>
      <div>
        {/* Header section containing the main navigation */}
        <header>
          <Navigation />
        </header>
        {/* Main content area where routed pages will be rendered */}
        <main>
          <AnimatedRoutes />
        </main>
        {/* BackToTop button for easy navigation to the top of the page */}
        <BackToTop />
        {/* Footer section */}
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
