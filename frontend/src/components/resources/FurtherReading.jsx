/**
 * @file FurtherReading.jsx
 * @description Component that provides links to external articles and videos for further learning.
 * It shows a preview and can be expanded to show all resources.
 * Uses HashLink for in-page navigation to 'Articles' or 'Videos' sections.
 */

import { HashLink as Link } from 'react-router-hash-link'; // For smooth scrolling to sections and external links
import { motion, AnimatePresence } from 'motion/react'; // For animations on expand/collapse
import { pageTransition, pageVariants } from '../../utils/utils'; // Animation utility constants

/**
 * @function FurtherReading
 * @description Displays a curated list of external resources like articles and videos.
 * Allows toggling between a preview and a full view of these resources.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls whether the full list of resources is visible or a preview.
 * @param {function} props.handleIsOpen - Function to toggle the `isOpen` state.
 * @returns {JSX.Element} The Further Reading section UI.
 */
const FurtherReading = ({ isOpen, handleIsOpen }) => {
  return (
    <>
      {/* AnimatePresence handles animations for appearing/disappearing content */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          // Full Further Reading view, rendered when `isOpen` is true
          <motion.div
            className="resources__info-blocks__further-reading" // Base class for styling
            key="further-reading-content" // Unique key for AnimatePresence
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ overflow: 'hidden' }} // Prevents content overflow during animation
          >
            <div className="resources__info-blocks__further-reading__header">
              <h2>Dive Deeper: Expanding Your Blockchain Expertise</h2>
            </div>
            <div className="resources__info-blocks__further-reading__main">
              <h3>Explore these curated resources to enhance your understanding of blockchain technology</h3>
              {/* Navigation links to jump to Articles or Videos sections */}
              <ul className="resources__info-blocks__further-reading__main__navigation">
                <li>
                  <Link smooth to="#articles_fr">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link smooth to="#videos_fr">
                    Videos
                  </Link>
                </li>
              </ul>
              {/* List of further reading resources */}
              <ul className="resources__info-blocks__further-reading__main">
                {/* Articles Section */}
                <h4 id="articles_fr">Articles</h4>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Fantastic article from IBM on Blockchain
                  </p>
                  {/* External link, opens in a new tab */}
                  <Link to="https://www.ibm.com/think/topics/blockchain" target="_blank" rel="noopener noreferrer">
                    Read Full Article
                  </Link>
                </li>
                {/* ... other articles ... */}
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Blockchain explained by Investopedia
                  </p>
                  <Link
                    to="https://www.investopedia.com/terms/b/blockchain.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Detailed explanation on Blockchain from Amazon’s AWS
                  </p>
                  <Link
                    to="https://aws.amazon.com/what-is/blockchain/?aws-products-all.sort-by=item.additionalFields.productNameLowercase&aws-products-all.sort-order=asc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">Cryptocurrency explained</p>
                  <Link
                    to="https://www.kaspersky.com/resource-center/definitions/what-is-cryptocurrency"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">Explanation of CBDC from EDPS</p>
                  <Link
                    to="https://www.edps.europa.eu/press-publications/publications/techsonar/central-bank-digital-currency_en#:~:text=Central%20Bank%20Digital%20Currency%20(CBDC,transactions%20and%20transfers%20become%20simple"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    A detailed explanation of crypto wallets by Investopedia
                  </p>
                  <Link
                    to="https://www.investopedia.com/terms/b/bitcoin-wallet.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </Link>
                </li>
                <hr className="resources__info-blocks__further-reading__main__hr" />

                {/* Videos Section */}
                <h4 id="videos_fr">Videos</h4>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Great video that explains blockchain in 7 minutes
                  </p>
                  {/* Embedded YouTube video player */}
                  <iframe
                    width="560" // Consider making width responsive (e.g., 100%)
                    height="315"
                    src="https://www.youtube-nocookie.com/embed/yubzJw0uiE4?si=S4XzJ5icAi9AdYb5"
                    title="YouTube video player: Blockchain in 7 minutes" // Descriptive title
                    frameBorder="0" // Use frameBorder instead of frameborder (React convention)
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen // Use allowFullScreen instead of allowfullscreen
                  ></iframe>
                </li>
                {/* ... other videos ... */}
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Another great video on cryptocurrency
                  </p>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube-nocookie.com/embed/1YyAzVmP9xQ?si=-QMA9eROv0xTf_0O"
                    title="YouTube video player: Cryptocurrency explained"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </li>
              </ul>
            </div>
            <hr className="resources__info-blocks__further-reading__main__hr" />
            {/* Footer for the expanded Further Reading view */}
            <div className="resources__info-blocks__further-reading__footer">
              <p>
                These additional materials offer a wealth of information for those eager to learn more. Enjoy the
                journey!
              </p>
              {/* Button to close the full view and return to preview */}
              <button onClick={handleIsOpen}>Close Further Reading</button>
            </div>
          </motion.div>
        ) : (
          // Preview Further Reading view, rendered when `isOpen` is false
          <div className="resources__info-blocks__further-reading">
            {/* Shadow effect for the preview card */}
            <div className="resources__info-blocks__further-reading--shadowed"></div>
            <div className="resources__info-blocks__further-reading__header">
              <h2>Dive Deeper: Expanding Your Blockchain Expertise</h2>
            </div>
            <div className="resources__info-blocks__further-reading__main">
              <h3>Explore these curated resources to enhance your understanding of blockchain technology</h3>
              {/* Display a small preview of resources */}
              <ul className="resources__info-blocks__further-reading__main--preview">
                <h4 id="articles_fr_preview">Articles</h4> {/* Ensure unique ID */}
                <li>
                  {/* Note: Class name here seems to be from FAQ, might be a copy-paste artifact.
                      Should ideally be specific to further-reading or a generic preview item class.
                  */}
                  <p className="resources__info-blocks__faq__main__question">
                    Fantastic article from IBM on Blockchain
                  </p>
                  <Link to="https://www.ibm.com/think/topics/blockchain" target="_blank" rel="noopener noreferrer">
                    Read Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">Blockchain explained by Investopedia</p>
                  <Link
                    to="https://www.investopedia.com/terms/b/blockchain.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Article
                  </Link>
                </li>
              </ul>
            </div>
            {/* The "Open Further Reading" button is rendered by the parent Resources.jsx component */}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FurtherReading;
