/**
 * @file Wallet.jsx
 * @description Component for the 'Wallet' page.
 * Allows users to either create a new simulated wallet or access an existing one.
 * Manages the visibility of wallet creation instructions and the different wallet states.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // Used for navigation, though direct button actions are more prominent here
import { motion } from 'motion/react'; // For page transition animations
import { pageVariants, pageTransition } from '../utils/utils'; // Animation utility constants
import bitcoinKey from '../../src/assets/images/bitcoin-key-icon.png'; // Image for wallet creation
import loginWallet from '../../src/assets/images/login-wallet.png'; // Image for wallet access

// Import wallet-related sub-components
import CreateWalletInstructions from '../components/wallet/CreateWalletInstructions';
import CreateWallet from '../components/wallet/CreateWallet';
import AccessWallet from '../components/wallet/AccessWallet';

/**
 * @function Wallet
 * @description Main component for the Wallet page.
 * Provides options to create or access a simulated wallet and manages UI flow.
 * @returns {JSX.Element} The Wallet page UI.
 */
const Wallet = () => {
  // State to control the visibility of the wallet creation instructions modal
  const [isInstructionsVisible, setInstructionsVisible] = useState(false);
  // State to track if the confirmation checkbox in instructions is checked
  const [isChecked, setIsChecked] = useState(false);
  // State to determine if the wallet creation process has started
  const [isStart, setIsStart] = useState(false);
  // State to determine if the wallet access process is active
  const [isAccessing, setIsAccessing] = useState(false);

  /**
   * @function handleCreate
   * @description Toggles the visibility of the wallet creation instructions.
   * Resets the checkbox state when opening/closing instructions.
   */
  const handleCreate = () => {
    setIsChecked(false); // Reset checkbox state
    setInstructionsVisible(!isInstructionsVisible);
  };

  /**
   * @function handleAccess
   * @description Toggles the state for accessing an existing wallet.
   */
  const handleAccess = () => {
    setIsAccessing(!isAccessing);
    if (isStart) setIsStart(false); // Ensure create wallet flow is closed if accessing
  };

  /**
   * @function handleStart
   * @description Starts the wallet creation process if the instructions checkbox is checked.
   * Scrolls to the top of the page.
   */
  const handleStart = () => {
    if (isChecked) {
      window.scrollTo(0, 0); // Scroll to top
      setIsStart(true); // Start the creation flow
      // Instructions will be closed by the CreateWalletInstructions component calling handleCreate again
    }
  };

  /**
   * @function handleCheckboxChange
   * @description Toggles the state of the confirmation checkbox in instructions.
   */
  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  // useEffect to handle body scroll behavior when instructions modal is visible.
  useEffect(() => {
    if (isInstructionsVisible) {
      window.scrollTo(0, 0); // Scroll to top when modal opens
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Cleanup function to restore scrolling when component unmounts or modal closes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInstructionsVisible]); // Dependency: run when modal visibility changes

  return (
    <>
      {/* Main Wallet page container, hidden if create or access flow is active */}
      <motion.div
        className={isStart || isAccessing ? 'hide' : 'wallet'}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Important note about the simulation */}
        <div className="wallet__note">
          <p>Important Note</p>
          <p>
            This is a simulation tool for educational purposes only. No real cryptocurrency is involved. All wallets and
            transactions are simulated to provide a safe learning environment.
          </p>
        </div>

        {/* Wallet page header */}
        <div className="wallet__header">
          <h1>Experience Digital Currency Management in a Safe Environment</h1>
        </div>

        {/* Section to create a new wallet */}
        <div className="wallet__create-wallet">
          <h2>Create New Wallet</h2>
          <div className="wallet__create-wallet__content">
            <div className="wallet__create-wallet__content__text-and-button">
              <p>
                Ready to see how digital currency wallets work? Our simulator lets you experience the essential features
                of a cryptocurrency wallet without any financial risk. Create your wallet to understand seed phrases,
                public addresses, and basic transactions.
              </p>
              {/* Button to open wallet creation instructions */}
              <button className="create-wallet__button" onClick={handleCreate}>
                <Link className="cybr-btn">
                  Create your first wallet
                  <span aria-hidden className="cybr-btn__glitch">
                    Create your first wallet
                  </span>
                </Link>
              </button>
            </div>
            <div className="wallet__create-wallet__content__image">
              <img src={bitcoinKey} alt="Bitcoin Key" />
            </div>
          </div>
        </div>

        {/* Security reminder */}
        <div className="wallet__reminder">
          <p>Security Reminder</p>
          <p>
            While this is a simulation, we encourage you to treat it as if it were real - it's good practice for
            understanding the security measures needed when dealing with actual digital currencies.
          </p>
        </div>

        {/* Section to access an existing wallet */}
        <div className="wallet__access-wallet">
          <h2>View Existing Wallet</h2>
          <div className="wallet__access-wallet__content">
            <div className="wallet__access-wallet__content__image">
              <img src={loginWallet} alt="Login to Wallet" /> {/* Alt text improved */}
            </div>
            <div className="wallet__access-wallet__content__text-and-button">
              <p>
                Already created a wallet? Access your simulated wallet to continue exploring its features and
                understanding how digital currency management works in practice.
              </p>
              {/* Button to start the wallet access process */}
              <button className="access-wallet__button" onClick={handleAccess}>
                <Link className="cybr-btn">
                  Access your wallet
                  <span aria-hidden className="cybr-btn__glitch">
                    Access your wallet
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Conditionally render wallet creation instructions modal */}
        {isInstructionsVisible && (
          <div>
            <CreateWalletInstructions
              handleCreate={handleCreate} // To close the instructions
              handleCheckboxChange={handleCheckboxChange}
              handleStart={handleStart} // To start wallet creation
              isStart={isStart} // Pass current start state (though not directly used by instructions for logic)
              isChecked={isChecked} // Pass checkbox state
            />
          </div>
        )}
      </motion.div>
      {/* Conditionally render the CreateWallet component if wallet creation process has started */}
      {isStart && <CreateWallet />}
      {/* Conditionally render the AccessWallet component if wallet access process is active */}
      {isAccessing && <AccessWallet handleAccess={handleAccess} />} {/* handleAccess can be used to close this view */}
    </>
  );
};

export default Wallet;
