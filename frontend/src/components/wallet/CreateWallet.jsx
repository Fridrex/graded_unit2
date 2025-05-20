/**
 * @file CreateWallet.jsx
 * @description Component for the simulated wallet creation process.
 * It handles the API call to create a new wallet, displays the generated
 * seed phrase, and requires user confirmation before granting access to the active wallet.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // For navigation links
import axios from 'axios'; // For making HTTP requests
import { motion } from 'motion/react'; // For animations
import { pageVariants, pageTransition } from '../../utils/utils'; // Animation utility constants
import ActiveWallet from './ActiveWallet'; // Component to display after successful creation and confirmation
import Loading from '../Loading'; // Loading spinner component

/**
 * @function CreateWallet
 * @description Manages the wallet creation flow.
 * Calls an API to generate a new wallet and seed phrase, then displays it to the user.
 * After the user confirms saving the seed phrase, it transitions to the ActiveWallet view.
 * @returns {JSX.Element} The wallet creation UI or the ActiveWallet component.
 */
const CreateWallet = () => {
  // State to track if the wallet creation API call was successful
  const [isSuccess, setIsSuccess] = useState(false);
  // State to store the generated seed phrase
  const [seedPhrase, setSeedPhrase] = useState('');
  // State to track if the user has checked the confirmation checkbox
  const [isChecked, setIsChecked] = useState(false);
  // State to track if access to the active wallet view is granted (after confirmation)
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  // State to manage the loading indicator
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @function handleCheckboxChange
   * @description Toggles the state of the seed phrase confirmation checkbox.
   */
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  /**
   * @function handleAccess
   * @description Grants access to the ActiveWallet component if the checkbox is checked.
   * Resets the checkbox state.
   */
  const handleAccess = () => {
    if (isChecked) {
      setIsChecked(false);
      document.getElementById('seed').checked = false; // Direct DOM manipulation
      setIsAccessGranted(true); // Grant access to the active wallet view
    }
  };

  /**
   * @function createWalletAPI
   * @description Makes an API call to the backend to create a new simulated wallet.
   * Updates state based on the API response.
   */
  const createWalletAPI = async () => {
    try {
      setIsLoading(true);
      // Simulate a small delay for better UX, remove if not needed
      await new Promise((resolve) => setTimeout(resolve, 200));

      localStorage.clear(); // Clear local storage before creating a new wallet

      // API call to create a wallet
      const response = await axios.post('http://localhost:3000/api/wallet/create', {}, { withCredentials: true });

      if (response.status === 201) {
        // HTTP 201 Created
        setIsSuccess(true); // Set creation success state

        const { wallet } = response.data;
        const { seedPhrase: generatedSeedPhrase } = wallet;
        setSeedPhrase(generatedSeedPhrase); // Store the generated seed phrase
      } else {
        // Handle other successful statuses if necessary, or treat as failure
        setIsSuccess(false);
        console.error('Wallet creation did not return 201:', response);
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
      setIsSuccess(false); // Set creation failure state
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  // useEffect hook to call the createWalletAPI function when the component mounts
  useEffect(() => {
    createWalletAPI();
  }, []); // Empty dependency array: run only once on component mount

  // Display loading spinner while the wallet is being created
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Conditional rendering based on wallet creation success */}
      {isSuccess ? (
        // If wallet creation was successful, display seed phrase and confirmation
        <motion.div
          // Hide this section if access to active wallet is granted
          className={isAccessGranted ? 'hide' : 'wallet__cw'}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="wallet__cw__header">
            <h1>Wallet Created Successfully</h1>
            <p>Your wallet has been created. You can now start using it after saving your seed phrase.</p>
          </div>
          <div className="wallet__cw__body">
            <h3>
              Save your seed phrase in a safe place <span>(!!!)</span>
            </h3>
            <div className="wallet__cw__body__seed-phrase">
              <p>Seed Phrase:</p>
              <div className="wallet__cw__body__seed-phrase__phrase">
                {/* Display each word of the seed phrase */}
                {seedPhrase.split(' ').map((word, index) => (
                  <span key={index} className="wallet__cw__body__seed-phrase__word">
                    {word}
                  </span>
                ))}
              </div>
            </div>
            {/* Confirmation checkbox section */}
            <div className="wallet__cw__confirmation">
              <label htmlFor="seed">I confirm that I have saved my seed phrase in a safe place</label>
              <input type="checkbox" name="seed" id="seed" checked={isChecked} onChange={handleCheckboxChange} />{' '}
              {/* Controlled component */}
              {/* Warning message if checkbox is checked (or could be always visible) */}
              <div className={isChecked ? 'wallet__cw__confirmation__alert' : 'hide'}>
                {' '}
                {/* Or always visible */}
                <p>
                  <span>⚠️</span> If you lose your seed phrase, you will lose access to your wallet. This is a
                  simulation, but good practice!
                </p>
              </div>
            </div>
            {/* Button to access the wallet, enabled only after checkbox is checked */}
            <div className="wallet__cw__button">
              <button
                className="create-wallet__button" // Reusing class, consider specific class if styling differs
                disabled={!isChecked} // Disable button if checkbox is not checked
                onClick={handleAccess} // Call handleAccess on click
              >
                {/* Link component might be redundant if onClick handles the logic entirely */}
                <Link className="cybr-btn">
                  {' '}
                  {/* Using Link for styling consistency */}
                  Access Your Wallet
                  <span aria-hidden className="cybr-btn__glitch">
                    Access Your Wallet
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        // If wallet creation failed
        <motion.div
          className="wallet__cw" // Reusing class for failure message container
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="wallet__cw__header">
            <h1>Your wallet could not be created</h1>
            <p>Please try again or contact support if the issue persists.</p>
          </div>
          <div className="wallet__cw__body">
            {/* Link to go back to the main wallet page */}
            <Link to="/">
              <button className="create-wallet__button">Go Back</button>
            </Link>
          </div>
        </motion.div>
      )}
      {/* Conditionally render the ActiveWallet component if access is granted */}
      {isAccessGranted && <ActiveWallet />}
    </>
  );
};

export default CreateWallet;
