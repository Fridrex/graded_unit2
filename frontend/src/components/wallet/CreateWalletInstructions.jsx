/**
 * @file CreateWalletInstructions.jsx
 * @description A modal component that displays instructions for creating a new simulated wallet.
 * It includes a checklist and a confirmation step before proceeding.
 */

import { Link } from 'react-router'; // Used for the styled button, not direct navigation here
import { motion } from 'motion/react'; // For animations
import { pageVariants, pageTransition } from '../../utils/utils'; // Animation utility constants
import instructionsVideo from '../../../src/assets/videos/wallet_instructions.mp4'; // Video for the instructions

/**
 * @function CreateWalletInstructions
 * @description Displays a modal with steps on how to create a wallet.
 * Requires the user to check a box confirming they understand the instructions.
 * @param {object} props - Component props.
 * @param {function} props.handleCreate - Function to close the instructions modal.
 * @param {function} props.handleStart - Function to proceed to the wallet creation step.
 * @param {function} props.handleCheckboxChange - Function to toggle the confirmation checkbox state.
 * @param {boolean} props.isChecked - Current state of the confirmation checkbox.
 * @returns {JSX.Element} The wallet creation instructions modal UI.
 */
const CreateWalletInstructions = ({ handleCreate, handleStart, handleCheckboxChange, isChecked }) => {
  return (
    <>
      {/* Animated container for the modal */}
      <motion.div
        className="wallet__create-instructions__container"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants} // Using pageVariants for a simple fade-in/out
        transition={pageTransition}
      >
        <div className="wallet__create-instructions">
          {/* Close button for the modal */}
          <button className="wallet__create-instructions__close-button" onClick={handleCreate}>
            X
          </button>
          <h1>How to Create Your Wallet</h1>
          <div className="wallet__create-instructions__content">
            <p>To create your (simulated) wallet, follow these simple steps:</p>
            <ol>
              <li>Follow the flow to generate a new wallet.</li>
              <li>Securely store your seed phrase in a safe place (even for a simulation, it's good practice!).</li>
              <li>Understand the importance of your seed phrase - it is the key to your wallet.</li>
              <li>Familiarise yourself with the wallet interface.</li>
              <li>Explore the features available in your wallet.</li>
              <li>Practice sending and receiving simulated transactions.</li>
            </ol>
            <p>Once your wallet is created, you can start exploring its features and functionalities.</p>
            {/* Instructional video */}
            <video className="wallet__create-instructions__video" autoPlay loop muted>
              <source src={instructionsVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Confirmation checkbox */}
            <div className="wallet__create-instructions__confirmation">
              <label htmlFor="understand">I understand the instructions and the simulated nature of this wallet.</label>
              <input
                type="checkbox"
                name="understand"
                id="understand"
                checked={isChecked} // Controlled component
                onChange={handleCheckboxChange} // Use onChange for checkbox
              />
            </div>
          </div>
          {/* Button to start the wallet creation process */}
          <div className="wallet__create-instructions__button">
            <button
              className="create-wallet__button" // Reusing class, consider specific class if styling differs
              disabled={!isChecked} // Disable button if checkbox is not checked
              onClick={() => {
                // First, call handleStart (which might trigger API calls or navigation in parent)
                handleStart();
                // Then, call handleCreate to close these instructions
                handleCreate();
              }}
            >
              {/* Link component used for styling the button */}
              <Link className="cybr-btn">
                Start Creating Wallet
                <span aria-hidden className="cybr-btn__glitch">
                  Start Creating Wallet
                </span>
              </Link>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CreateWalletInstructions;
