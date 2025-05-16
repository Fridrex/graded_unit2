import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { motion } from 'motion/react';
import { pageVariants, pageTransition } from '../../utils/utils';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import CbdcQuiz from './CbdcQuiz';


const Cdbc = ({ handleOpen }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleQuizOpen = () => {
    setIsQuizOpen(!isQuizOpen);
  };

  return (
    <>
      <motion.div className="learn__cbdc" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
        <button className="learn__back-button" onClick={() => handleOpen('blockchain')}>
          Back to Learn page
        </button>
        <article className="learn__cbdc__content">
          <h1>CBDC</h1>
          <h3>Central Bank Digital Currencies (CBDCs): The Digital Pound</h3>
          <p>
            While cryptocurrencies like Bitcoin are privately issued, Central Bank Digital Currencies (CBDCs) represent
            a different approach to digital money. They are a digital form of a country's national currency, issued
            directly by the central bank. In the UK, this would be a digital form of the pound sterling.
          </p>
          <h3>Understanding CBDCs</h3>
          <div className="learn__cbdc__content__zoom">
            <Zoom>
              <img src="src/assets/images/digital-money-venn-diagram.svg" alt="CBDC infographics" />
            </Zoom>
          </div>
          <p>
            CBDCs aim to combine the accessibility and convenience of digital money with the safety and security of
            central bank-issued currency. Here's a breakdown:
          </p>
          <ul>
            <li>
              <strong>Digital Form of Fiat Currency:</strong> A CBDC is essentially a digital version of a country's
              existing currency. For example, a digital pound would be a digital form of the pound sterling, just like
              banknotes or coins but in electronic form.
            </li>
            <li>
              <strong>Central Bank Liability:</strong> Unlike commercial bank deposits or cryptocurrencies, a CBDC is a
              direct liability of the central bank. This means it is the safest form of digital money, as it is backed
              by the full faith and credit of the central bank.
            </li>
            <li>
              <strong>Potential Benefits:</strong> CBDCs could offer several advantages, including:
              <ul>
                <li>Increased efficiency in payments</li>
                <li>Promoting financial inclusion</li>
                <li>Innovation in payments</li>
              </ul>
            </li>
          </ul>
          <h3>The UK's Perspective: The Digital Pound</h3>
          <p>
            The Bank of England and HM Treasury are exploring the concept of a digital pound to keep pace with an
            increasingly digital world where the use of physical cash is declining.
          </p>
          <p>
            As the Bank of England states, "The world we live in is becoming more and more digital. As a result, we
            aren’t using cash as much as we used to."
          </p>
          <p>
            A digital pound would be an electronic version of cash, issued by the Bank of England and accessed through
            digital wallets provided by companies. It would allow users to "spend your digital pounds in the shops and
            online, using your phone, as well as sending them to friends and family."
          </p>
          <p>
            It's important to note that no final decision has been made regarding the launch of a digital pound, but the
            potential benefits being considered include offering "a new way to pay, help businesses, build trust in
            money, and better protect our financial system."
          </p>
          <h3>CBDCs vs. Cryptocurrencies</h3>
          <p>It's important to distinguish between CBDCs and cryptocurrencies:</p>
          <ul>
            <li>
              <strong>Issuer:</strong> CBDCs are issued by a central bank; cryptocurrencies are typically decentralised.
            </li>
            <li>
              <strong>Value Stability:</strong> CBDCs are designed to have a stable value, like traditional currency;
              cryptocurrencies can be highly volatile.
            </li>
            <li>
              <strong>Legal Tender:</strong> CBDCs have the potential to become legal tender in their respective
              countries, while cryptocurrencies generally do not.
            </li>
          </ul>
          <p>
            This section provides a clear understanding of what CBDCs are, how they differ from cryptocurrencies, and
            their potential role in the future of finance.
          </p>
          <p className="learn__cbdc__content__cta">
            Check out our <Link to="/resources#resources-header">Resources page</Link> for more information
          </p>
        </article>
        <div className="learn__cbdc__footer">
          <h3>CBDC Quiz</h3>
          <video src="src/assets/videos/cbdc_quiz.mp4" autoPlay muted loop className="learn__header__video"></video>
          <p>
            Now that you've learned about Central Bank Digital Currencies (CBDCs), it's time to test your knowledge!
            Click the button below to take the quiz and see how well you understand the concepts we've covered.
          </p>
          <button className="learn__cbdc__footer__button" onClick={handleQuizOpen}>
            Start Quiz
          </button>
        </div>
        <div className="learn__cbdc__quiz">{isQuizOpen && <CbdcQuiz handleQuizOpen={handleQuizOpen} />}</div>
      </motion.div>
    </>
  );
};

export default Cdbc;
