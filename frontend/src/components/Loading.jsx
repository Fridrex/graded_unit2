/**
 * @file Loading.jsx
 * @description A component that displays a loading spinner and message.
 * Used to indicate to the user that content is being loaded or an operation is in progress.
 */

import { CircleLoader } from 'react-spinners'; // Specific spinner component from react-spinners library
import { motion } from 'motion/react'; // For animations
import { pageVariants, pageTransition } from '../utils/utils'; // Animation utility constants

/**
 * @function Loading
 * @description Displays a full-page loading indicator with an animated spinner.
 * It uses motion/react for a smooth fade-in/out transition.
 * @returns {JSX.Element} The loading screen UI.
 */
const Loading = () => {
  return (
    // Animated container for the loading screen
    <motion.div
      className="loading-container"
      initial="initial" // Initial animation state (e.g., opacity 0)
      animate="in" // Animation state when component is visible (e.g., opacity 1)
      exit="out" // Animation state when component is exiting
      variants={pageVariants} // Predefined animation variants for opacity transitions
      transition={pageTransition} // Predefined transition settings (duration, ease)
    >
      {/* Container for the spinner itself */}
      <div className="loading-spinner">
        <div className="spinner">
          {/* react-spinners CircleLoader component */}
          <CircleLoader color="#ffd700" size={200} speedMultiplier={1.5} />
        </div>
      </div>
      {/* Loading message */}
      <h1>Loading...</h1>
      <p>Please wait while we load the content for you.</p>
    </motion.div>
  );
};

export default Loading;
