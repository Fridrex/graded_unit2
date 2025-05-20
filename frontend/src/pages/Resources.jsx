/**
 * @file Resources.jsx
 * @description Component for the 'Resources' page.
 * Provides access to a glossary, FAQ, and further reading materials,
 * each presented in a collapsible section.
 */

import { useState } from 'react';
import { motion } from 'motion/react'; // For page transition animations
import { pageVariants, pageTransition } from '../utils/utils'; // Animation utility constants

// Import resource section components
import Glossary from '../components/resources/Glossary';
import Faq from '../components/resources/Faq';
import FurtherReading from '../components/resources/FurtherReading';

/**
 * @function Resources
 * @description Main component for the Resources page.
 * Manages the open/close state of different resource sections (Glossary, FAQ, Further Reading).
 * @returns {JSX.Element} The Resources page UI.
 */
const Resources = () => {
  // State to control the open/close state of the Glossary section
  const [isOpenGlossary, setIsOpenGlossary] = useState(false);
  // State to control the open/close state of the FAQ section
  const [isOpenFaq, setIsOpenFaq] = useState(false);
  // State to control the open/close state of the Further Reading section
  const [isOpenFurtherReading, setIsOpenFurtherReading] = useState(false);

  /**
   * @function handleIsOpen
   * @description Toggles the open/close state of a specified resource section.
   * @param {string} section - The name of the section to toggle ('glossary', 'faq', 'further-reading').
   */
  const handleIsOpen = (section) => {
    if (section === 'glossary') {
      setIsOpenGlossary(!isOpenGlossary);
    }
    if (section === 'faq') {
      setIsOpenFaq(!isOpenFaq);
    }
    if (section === 'further-reading') {
      setIsOpenFurtherReading(!isOpenFurtherReading);
    }
  };

  return (
    <>
      {/* Animated div for page transitions */}
      <motion.div
        className="resources"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* Header section of the Resources page */}
        <div className="resources__header" id="resources-header">
          {' '}
          {/* id for potential hash linking */}
          <h1>
            Quickly find definitions in our glossary, get answers to common questions about the app, wallets, and more,
            and explore helpful articles and videos in our further reading section
          </h1>
        </div>

        {/* Container for the informational blocks (Glossary, FAQ, Further Reading) */}
        <div className="resources__info-blocks">
          {/* Glossary section preview and toggle button */}
          <div className="resources__info-blocks__glossary--preview">
            <Glossary isOpen={isOpenGlossary} handleIsOpen={() => handleIsOpen('glossary')} />
            {/* Button to open/close the full glossary, hidden if glossary is already open */}
            <button className={isOpenGlossary ? 'hide' : ''} onClick={() => handleIsOpen('glossary')}>
              Open Full Glossary
            </button>
          </div>

          {/* FAQ section preview and toggle button */}
          <div className="resources__info-blocks__faq--preview">
            <Faq isOpen={isOpenFaq} handleIsOpen={() => handleIsOpen('faq')} />
            {/* Button to open/close the full FAQ, hidden if FAQ is already open */}
            <button className={isOpenFaq ? 'hide' : ''} onClick={() => handleIsOpen('faq')}>
              Open Full FAQ
            </button>
          </div>

          {/* Further Reading section preview and toggle button */}
          <div className="resources__info-blocks__further-reading--preview">
            <FurtherReading isOpen={isOpenFurtherReading} handleIsOpen={() => handleIsOpen('further-reading')} />
            {/* Button to open/close Further Reading, hidden if it's already open */}
            <button className={isOpenFurtherReading ? 'hide' : ''} onClick={() => handleIsOpen('further-reading')}>
              Open Further Reading
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Resources;
