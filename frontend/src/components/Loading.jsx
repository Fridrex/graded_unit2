import { CircleLoader } from 'react-spinners';
import { motion } from 'motion/react';
import { pageVariants, pageTransition } from '../utils/utils';

const Loading = () => {
  return (
    <motion.div
      className="loading-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="loading-spinner">
        <div className="spinner">
          <CircleLoader color="#ffd700" size={200} speedMultiplier={1.5} />
        </div>
      </div>
      <h1>Loading...</h1>
      <p>Please wait while we load the content for you.</p>
    </motion.div>
  );
};

export default Loading;
