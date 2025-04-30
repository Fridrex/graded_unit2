import { useState } from 'react';
import Glossary from '../components/resources/Glossary';
import Faq from '../components/resources/Faq';
import FurtherReading from '../components/resources/FurtherReading';

const Resources = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    return setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="resources">
        <div className="resources__header">
          <h1>
            Quickly find definitions in our glossary, get answers to common questions about the app, wallets, and more,
            and explore helpful articles and videos in our further reading section
          </h1>
        </div>
        <div className="resources__info-blocks">
          <div className="resources__info-blocks__glossary--preview">
            <Glossary isOpen={isOpen} handleIsOpen={handleIsOpen} />
            <button className={isOpen ? 'hide' : ''} onClick={handleIsOpen}>
              Open Full Glossary
            </button>
          </div>
          <div className="resources__info-blocks__faq--preview">
            <Faq isOpen={isOpen} />
            <button className={isOpen ? 'hide' : ''} onClick={handleIsOpen}></button>
          </div>
          <div className="resources__info-blocks__further-reading--preview">
            <FurtherReading isOpen={isOpen} />
            <button className={isOpen ? 'hide' : ''} onClick={handleIsOpen}></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
