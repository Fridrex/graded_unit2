import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Learn from './pages/Learn';
import Resources from './pages/Resources';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Router>
      <div>
        <header>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
