/**
 * @file Learn.jsx
 * @description Component for the 'Learn' page, which presents different learning modules
 * (Blockchain, Crypto, CBDC) and a certification option upon completion.
 * It manages the visibility of these modules and fetches user progress.
 */

import { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import { motion } from 'motion/react'; // For animations
import { pageVariants, pageTransition } from '../utils/utils'; // Animation utility constants

// Import learning module components
import Blockchain from '../components/learn/Blockchain';
import Crypto from '../components/learn/Crypto';
import Cbdc from '../components/learn/Cbdc';
import Certification from '../components/learn/Certification';
import Loading from '../components/Loading'; // Loading spinner component
import learVideo from '../../src/assets/videos/learn_video.mp4'; // Video for the header

/**
 * @function Learn
 * @description Main component for the Learn page.
 * Handles fetching user's learning progress and toggling visibility of different learning sections.
 * @returns {JSX.Element} The Learn page UI.
 */
const Learn = () => {
  // State to track if all modules are passed to enable certification
  const [isPassed, setIsPassed] = useState(false);
  // State to control the visibility of the Blockchain learning module
  const [isOpenBlockchain, setIsOpenBlockchain] = useState(false);
  // State to control the visibility of the Crypto learning module
  const [isOpenCrypto, setIsOpenCrypto] = useState(false);
  // State to control the visibility of the CBDC learning module
  const [isOpenCbdc, setIsOpenCbdc] = useState(false);
  // State to control the visibility of the Certification module
  const [isOpenCertification, setIsOpenCertification] = useState(false);
  // State to manage the loading indicator
  const [isLoading, setIsLoading] = useState(true);

  /**
   * @function getResults
   * @description Fetches the user's learning progress from the backend API.
   * Updates the `isPassed` state if all modules are completed.
   */
  const getResults = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate delay

      // API call to get learning progress
      const response = await axios.get('http://localhost:3000/api/learning/getProgress', { withCredentials: true });

      if (response.status === 200) {
        const { progress } = response.data;

        // Extract module and completion status
        const extractedProgress = progress.map((item) => ({
          module: item.module,
          completed: item.completed,
        }));

        // Check if all 3 core modules are completed
        if (extractedProgress.length === 3) {
          const allModulesCompleted = extractedProgress.every((item) => item.completed);
          setIsPassed(allModulesCompleted);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch results when a module is closed (to refresh progress)
  useEffect(() => {
    getResults();
  }, [isOpenBlockchain, isOpenCrypto, isOpenCbdc]); // Dependencies: run when these states change

  /**
   * @function handleOpen
   * @description Handles opening and closing of different learning modules.
   * Scrolls to the top of the page when a module is opened.
   * @param {string} module - The name of the module to open/close ('blockchain', 'crypto', 'cbdc', 'certification').
   */
  const handleOpen = (module) => {
    window.scrollTo(0, 0); // Scroll to top
    switch (module) {
      case 'blockchain':
        setIsOpenBlockchain(!isOpenBlockchain);
        break;
      case 'crypto':
        setIsOpenCrypto(!isOpenCrypto);
        break;
      case 'cbdc':
        setIsOpenCbdc(!isOpenCbdc);
        break;
      case 'certification':
        setIsOpenCertification(!isOpenCertification);
        break;
      default:
        break;
    }
  };

  // Display loading spinner while data is being fetched
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Animated div for page transitions */}
      <motion.div
        className="learn"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Conditional rendering: Show main learn page if no module is open */}
        {!isOpenBlockchain && !isOpenCrypto && !isOpenCbdc && !isOpenCertification && (
          <>
            <div className="learn__header">
              <h1>Welcome to Your Blockchain Learning Hub</h1>
              {/* Autoplaying, muted, looping video for the header */}
              <video
                src={learVideo}
                autoPlay
                muted
                loop
                className="learn__header__video"
              ></video>
              <p>
                Embark on a journey to understand the fundamentals of Blockchain, Cryptocurrencies, and Central Bank
                Digital Currencies (CBDCs) through clear, unbiased explanations.
              </p>
            </div>
            <div className="learn__main">
              {/* Blockchain learning module section */}
              <div className="learn__main__blockchain">
                <h2>Blockchain Technology</h2>
                <p>
                  Dive into the foundational technology. Here, you'll explore what a blockchain is, how it works, its
                  key components like blocks, chains, and cryptography, and understand concepts like decentralisation
                  and immutability.
                </p>
                <button onClick={() => handleOpen('blockchain')}>Learn about Blockchain</button>
              </div>
              <hr className="learn__main__hr" />
              {/* Cryptocurrencies learning module section */}
              <div className="learn__main__crypto">
                <h2>Cryptocurrencies</h2>
                <p>
                  Discover the world of digital currencies. This section explains what cryptocurrencies are, how they
                  utilise blockchain technology, the distinction between different types (like Bitcoin and altcoins),
                  and their basic transaction mechanisms.
                </p>
                <button onClick={() => handleOpen('crypto')}>Learn about Crypto</button>
              </div>
              <hr className="learn__main__hr" />
              {/* CBDC learning module section */}
              <div className="learn__main__cbdc">
                <h2>Central Bank Digital Currencies (CBDCs)</h2>
                <p>
                  Explore the concept of digital currencies issued by nations' central banks. Learn what CBDCs are, why
                  governments are exploring them, potential designs, and how they compare and contrast with existing
                  cryptocurrencies and traditional electronic money.
                </p>
                <button onClick={() => handleOpen('cbdc')}>Learn about CBDCs</button>
              </div>
            </div>
          </>
        )}
        {/* Conditionally render the Blockchain module component */}
        {isOpenBlockchain && <Blockchain handleOpen={() => handleOpen('blockchain')} />}
        {/* Conditionally render the Crypto module component */}
        {isOpenCrypto && <Crypto handleOpen={() => handleOpen('crypto')} />}
        {/* Conditionally render the CBDC module component */}
        {isOpenCbdc && <Cbdc handleOpen={() => handleOpen('cbdc')} />}
        {/* Conditionally render the Certification module component */}
        {isOpenCertification && <Certification handleOpen={() => handleOpen('certification')} />}

        {/* Conditional rendering: Show certification option if all modules are passed and no module is currently open */}
        {isPassed && !isOpenBlockchain && !isOpenCrypto && !isOpenCbdc && !isOpenCertification && (
          <div className="learn__footer">
            <div className="learn__footer__certification">
              <h3>Completion & Certification</h3>
              <p>
                Congratulations on successfully completing all the learning modules and quizzes! You can now generate
                your personalised certificate of completion by clicking the button below.
              </p>
              <button onClick={() => handleOpen('certification')}>Generate Certificate</button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Learn;
