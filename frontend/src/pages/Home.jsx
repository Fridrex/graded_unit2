/**
 * @file Home.jsx
 * @description Component for the Home page of the Blockchain Education Initiative.
 * Serves as the main landing page, highlighting the platform's purpose,
 * key features, and how it works.
 */

import { Link } from 'react-router'; // For internal navigation
import { motion } from 'motion/react'; // For page transition animations
import { pageVariants, pageTransition } from '../utils/utils'; // Animation utility constants

/**
 * @function Home
 * @description The main component for the Home page.
 * Contains sections like header, informational cards, call-to-action buttons,
 * and an explanation of the platform's workflow.
 * @returns {JSX.Element} The Home page UI.
 */
const Home = () => {
  return (
    <>
      {/* Animated div for page transitions */}
      <motion.div
        className="home"
        initial="initial" // Initial animation state
        animate="in" // Animation state when component is in view
        exit="out" // Animation state when component is exiting
        variants={pageVariants} // Predefined animation variants
        transition={pageTransition} // Predefined animation transition settings
      >
        {/* Header section of the Home page */}
        <div className="home__header">
          <h1>Demystifying Digital Currency: Your Journey into Blockchain Begins Here</h1>
          <p>From blockchain basics to crypto wallets — learn the future of money through hands-on experience</p>
        </div>

        {/* Informational cards section */}
        <div className="home__info-cards">
          <h2>Why Learn?</h2>
          {/* Card 1: Financial Innovation */}
          <div className="home__info-cards__card">
            <h3>Stay Ahead of Financial Innovation</h3>
            <p>
              The digital currency revolution is reshaping our financial landscape. Whether it's blockchain technology,
              cryptocurrencies, or Central Bank Digital Currencies (CBDCs), understanding these innovations is becoming
              essential. Get ahead of the curve and build your knowledge in this rapidly evolving field.
            </p>
          </div>
          {/* Card 2: Learn by Doing */}
          <div className="home__info-cards__card">
            <h3>Learn by Doing</h3>
            <p>
              Theory meets practice in our interactive learning environment. Create your first simulated crypto wallet,
              understand blockchain transactions, and gain hands-on experience without any financial risk. Our practical
              approach makes complex concepts click.
            </p>
          </div>
          {/* Card 3: Informed Decisions */}
          <div className="home__info-cards__card">
            <h3>Make Informed Decisions</h3>
            <p>
              From investment opportunities to potential scams, the world of digital currencies can be overwhelming.
              Gain the knowledge you need to navigate this space confidently. Understand the technology, recognise the
              risks, and make decisions based on solid understanding rather than hype.
            </p>
          </div>
        </div>

        {/* Call-to-action buttons section */}
        <div className="home__buttons">
          {/* Link to the Learn page */}
          <Link to="/learn" className="cybr-btn">
            Learn
            <span aria-hidden className="cybr-btn__glitch">
              Learn
            </span>
          </Link>
          {/* Link to the Wallet page (currently styled as "About" in the button text, which might be a typo in original code) */}
          {/* Based on common UX, this might be intended to go to /about or /wallet. Assuming /wallet from the text "About" being a placeholder for more info. */}
          {/* If it's meant for /about, the to="/" should be to="/about" */}
          <Link to="/wallet" className="cybr-btn">
            About {/* This text might be a placeholder or typo if it links to /wallet */}
            <span aria-hidden className="cybr-btn__glitch">
              About
            </span>
          </Link>
        </div>

        {/* "How it Works" explanation section */}
        <div className="home__explanation">
          <h2>How it Works</h2>
          <div className="home__explanation__blocks">
            {/* Step 1: Start Learning */}
            <div className="home__explanation__blocks__block">
              <img src="src/assets/images/Object.png" alt="Digital brain" />
              <h3>Start Learning</h3>
              <p>
                Begin your journey with clear, jargon-free explanations of blockchain technology and digital currencies.
              </p>
            </div>
            {/* Step 2: Understand Basics */}
            <div className="home__explanation__blocks__block">
              <img src="src/assets/images/chain.png" alt="A chain of blocks" />
              <h3>Understand Basics</h3>
              <p>Progress through interactive lessons that break down complex concepts into digestible pieces.</p>
            </div>
            {/* Step 3: Try It Out */}
            <div className="home__explanation__blocks__block">
              <img src="src/assets/images/wallet.png" alt="Wallet" />
              <h3>Try It Out</h3>
              <p>Put your knowledge into practice with our safe, simulated wallet environment.</p>
            </div>
            {/* Step 4: Test Knowledge */}
            <div className="home__explanation__blocks__block">
              <img src="src/assets/images/trophy.png" alt="Trophy" />
              <h3>Test Knowledge</h3>
              <p>Reinforce your learning through quizzes and practical exercises at your own pace.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
