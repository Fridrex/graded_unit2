import { useState } from 'react';
import { motion } from 'motion/react';
import { pageVariants, pageTransition } from '../utils/utils';
import Glossary from '../components/resources/Glossary';
import Faq from '../components/resources/Faq';
import FurtherReading from '../components/resources/FurtherReading';

const Resources = () => {
  const [isOpenGlossary, setIsOpenGlossary] = useState(false);
  const [isOpenFaq, setIsOpenFaq] = useState(false);
  const [isOpenFurtherReading, setIsOpenFurtherReading] = useState(false);

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
      <motion.div
        className="resources"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="resources__header" id="resources-header">
          <h1>
            Quickly find definitions in our glossary, get answers to common questions about the app, wallets, and more,
            and explore helpful articles and videos in our further reading section
          </h1>
        </div>
        <div className="resources__info-blocks">
          <div className="resources__info-blocks__glossary--preview">
            <Glossary isOpen={isOpenGlossary} handleIsOpen={() => handleIsOpen('glossary')} />
            <button className={isOpenGlossary ? 'hide' : ''} onClick={() => handleIsOpen('glossary')}>
              Open Full Glossary
            </button>
          </div>
          <div className="resources__info-blocks__faq--preview">
            <Faq isOpen={isOpenFaq} handleIsOpen={() => handleIsOpen('faq')} />
            <button className={isOpenFaq ? 'hide' : ''} onClick={() => handleIsOpen('faq')}>
              Open Full FAQ
            </button>
          </div>
          <div className="resources__info-blocks__further-reading--preview">
            <FurtherReading isOpen={isOpenFurtherReading} handleIsOpen={() => handleIsOpen('further-reading')} />
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
