import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Learn from './pages/Learn';
import Resources from './pages/Resources';
import Wallet from './pages/Wallet';
import BackToTop from './components/BackToTop';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
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

function App() {
  return (
    <Router>
      <div>
        <header>
          <Navigation />
        </header>
        <main>
          <AnimatedRoutes />
        </main>
        <BackToTop />
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
