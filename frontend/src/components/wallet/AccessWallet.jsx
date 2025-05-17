/**
 * @file AccessWallet.jsx
 * @description Component for accessing an existing simulated wallet using a 12-word seed phrase.
 * Handles user input, seed phrase validation, API calls to access the wallet,
 * and displays the active wallet dashboard upon successful access.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // For internal navigation
import axios from 'axios'; // For making HTTP requests
import { motion } from 'motion/react'; // For animations
import { pageVariants, pageTransition } from '../../utils/utils'; // Animation utility constants
import ActiveWallet from './ActiveWallet'; // Component to display once wallet is accessed
import Loading from '../Loading'; // Loading spinner component

/**
 * @function AccessWallet
 * @description Component that allows users to input their seed phrase to access their simulated wallet.
 * @param {object} props - Component props.
 * @param {function} props.handleAccess - Function to toggle the visibility of the access wallet view.
 * @returns {JSX.Element} The Access Wallet UI or the ActiveWallet component.
 */
const AccessWallet = ({ handleAccess }) => {
  // State to hold the complete seed phrase string
  const [seedPhrase, setSeedPhrase] = useState('');
  // State to track if the entered seed phrase is valid (12 words)
  const [isSeedPraseValid, setIsSeedPhraseValid] = useState(false);
  // State to track if wallet access has been granted by the backend
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  // State for each of the 12 words of the seed phrase
  const [firstWord, setFirstWord] = useState('');
  const [secondWord, setSecondWord] = useState('');
  const [thirdWord, setThirdWord] = useState('');
  const [fourthWord, setFourthWord] = useState('');
  const [fifthWord, setFifthWord] = useState('');
  const [sixthWord, setSixthWord] = useState('');
  const [seventhWord, setSeventhWord] = useState('');
  const [eighthWord, setEighthWord] = useState('');
  const [ninthWord, setNinthWord] = useState('');
  const [tenthWord, setTenthWord] = useState('');
  const [eleventhWord, setEleventhWord] = useState('');
  const [twelfthWord, setTwelfthWord] = useState('');

  // State to count login attempts
  const [attempt, setAttempt] = useState(0);
  // State to display messages to the user (e.g., error messages)
  const [message, setMessage] = useState('');
  // State to manage the loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // useEffect to combine individual word inputs into a single seed phrase string
  // and validate if it contains 12 words.
  useEffect(() => {
    const seedPhraseArray = [
      firstWord.trim(),
      secondWord.trim(),
      thirdWord.trim(),
      fourthWord.trim(),
      fifthWord.trim(),
      sixthWord.trim(),
      seventhWord.trim(),
      eighthWord.trim(),
      ninthWord.trim(),
      tenthWord.trim(),
      eleventhWord.trim(),
      twelfthWord.trim(),
    ];

    const convertIntoSeedPhrase = () => {
      const seedPhraseString = seedPhraseArray.join(' ');
      const convertedSeed = seedPhraseString.trim().toLowerCase();
      // Check if the seed phrase has exactly 12 words
      if (convertedSeed.split(' ').length === 12 && convertedSeed.split(' ').every((word) => word.length > 0)) {
        setSeedPhrase(convertedSeed);
        setIsSeedPhraseValid(true);
      } else {
        setIsSeedPhraseValid(false); // Set to false if not exactly 12 words or some words are empty
      }
    };

    convertIntoSeedPhrase();
  }, [
    // Dependencies: run when any of the word inputs change
    firstWord,
    secondWord,
    thirdWord,
    fourthWord,
    fifthWord,
    sixthWord,
    seventhWord,
    eighthWord,
    ninthWord,
    tenthWord,
    eleventhWord,
    twelfthWord,
  ]);

  // useEffect to attempt automatic wallet access if a session/cookie indicates prior access.
  // This is a common pattern but depends on backend session management.
  useEffect(() => {
    const letAccess = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate delay

      try {
        // Attempt to access the wallet (e.g., if there's an existing session)
        const response = await axios.post('http://localhost:3000/api/wallet/access', {}, { withCredentials: true });

        if (response.status === 200) {
          setIsAccessGranted(true); // Grant access if successful
        }
      } catch (error) {
        // If auto-access fails (e.g., no session or session expired), it's not necessarily an error to display.
        // The user will then be prompted to enter their seed phrase.
        // console.error('Auto-access attempt failed:', error); // Optional: log for debugging
        if (error.response && error.response.statusText === 'Not Found') {
          // This might occur if the initial check expects a wallet but none is associated with the session
          // No message needed here as the user will then proceed to input seed phrase
        } else if (error.response) {
          console.error('Error accessing wallet initially:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    letAccess();
  }, []); // Empty dependency array: run only once on component mount

  // Display loading spinner if an operation is in progress
  if (isLoading) {
    return <Loading />;
  }

  /**
   * @function handleWalletAccessAttempt
   * @description Handles the submission of the seed phrase to access the wallet.
   * Makes an API call to the backend with the entered seed phrase.
   * Manages login attempts and displays appropriate messages.
   */
  const handleWalletAccessAttempt = async () => {
    if (isSeedPraseValid && attempt < 3) {
      setIsLoading(true);
      setMessage(''); // Clear previous messages
      try {
        // API call to access wallet with the provided seed phrase
        const response = await axios.post(
          'http://localhost:3000/api/wallet/access',
          { seedPhrase },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsAccessGranted(true); // Grant access on success
        }
      } catch (error) {
        setAttempt(attempt + 1); // Increment attempt count on failure
        if (error.response && error.response.statusText === 'Not Found') {
          setMessage('Invalid seed phrase. Please try again.');
        } else {
          setMessage('An error occurred. Please try again.');
          console.error('Error accessing wallet:', error);
        }
        if (attempt + 1 >= 3) {
          setMessage('You have exceeded the maximum number of attempts. Please try again later.');
          // Implement a timeout before resetting attempts
          setTimeout(() => {
            setAttempt(0);
            setMessage('You can try accessing your wallet again.');
          }, 30000); // 30-second timeout
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Animated div for page transitions */}
      <motion.div
        // Hide this component if access is granted (ActiveWallet will be shown)
        className={isAccessGranted ? 'hide' : 'wallet__access'}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="wallet__access__header">
          <h1>Access Your Wallet</h1>
        </div>
        <div className="wallet__access__body">
          <h4>Enter your seed phrase to access your wallet</h4>
          <p>Make sure to enter the 12-word phrase you received when you were creating the wallet</p>
          {/* Fieldset for seed phrase inputs */}
          <fieldset>
            <legend>Seed Phrase</legend>
            {/* Input fields for each word of the seed phrase */}
            <input
              type="text"
              placeholder="1st word"
              value={firstWord}
              onChange={(e) => setFirstWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="2nd word"
              value={secondWord}
              onChange={(e) => setSecondWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="3rd word"
              value={thirdWord}
              onChange={(e) => setThirdWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="4th word"
              value={fourthWord}
              onChange={(e) => setFourthWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="5th word"
              value={fifthWord}
              onChange={(e) => setFifthWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="6th word"
              value={sixthWord}
              onChange={(e) => setSixthWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="7th word"
              value={seventhWord}
              onChange={(e) => setSeventhWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="8th word"
              value={eighthWord}
              onChange={(e) => setEighthWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="9th word"
              value={ninthWord}
              onChange={(e) => setNinthWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="10th word"
              value={tenthWord}
              onChange={(e) => setTenthWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="11th word"
              value={eleventhWord}
              onChange={(e) => setEleventhWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="12th word"
              value={twelfthWord}
              onChange={(e) => setTwelfthWord(e.target.value)}
            />
          </fieldset>
        </div>
        {/* Display messages to the user (e.g., errors, attempt warnings) */}
        {message && (
          <div className="wallet__access__message">
            <p>{message}</p>
          </div>
        )}
        <div className="wallet__access__footer">
          {/* Button to submit the seed phrase for access */}
          <button
            onClick={handleWalletAccessAttempt}
            disabled={!isSeedPraseValid || attempt >= 3} // Disable if seed phrase is invalid or max attempts reached
          >
            Access My Wallet
          </button>
          {/* Link to navigate back to the main wallet page to create a new wallet */}
          <div className="wallet__access__footer__create">
            <p>
              Don't have a wallet?{' '}
              {/* `handleAccess` is likely used to go back to the screen where `CreateWallet` is an option */}
              <Link to="/wallet" onClick={handleAccess}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      {/* Conditionally render the ActiveWallet component if access is granted */}
      {isAccessGranted && <ActiveWallet />}
    </>
  );
};

export default AccessWallet;
