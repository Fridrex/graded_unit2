import { HashLink as Link } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'motion/react';
import { pageTransition, pageVariants } from '../../utils/utils';

const Faq = ({ isOpen, handleIsOpen }) => {
  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            className="resources__info-blocks__faq"
            key="faq-content"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ overflow: 'hidden' }}
          >
            <div className="resources__info-blocks__faq__header">
              <h2>Frequently Asked Questions: Your Blockchain Learning Journey</h2>
            </div>
            <div className="resources__info-blocks__faq__main">
              <h3>Find answers to common questions about our blockchain education resources</h3>
              <ul className="resources__info-blocks__faq__main__navigation">
                <li>
                  <Link to="#learning_faq">Learning</Link>
                </li>
                <li>
                  <Link to="#wallet_faq">Wallet</Link>
                </li>
                <li>
                  <Link to="#general_faq">General</Link>
                </li>
              </ul>
              <ul className="resources__info-blocks__faq__main">
                <h4 id="learning_faq">Learning</h4>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: How is the information on this platform kept up-to-date?{' '}
                  </p>
                  <p>
                    A: Our content is carefully crafted to be accurate and up-to-date, and we strive to regularly review
                    and update it to reflect the latest developments in blockchain technology, cryptocurrencies, and
                    CBDCs
                  </p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: Is the information presented here biased in any way?{' '}
                  </p>
                  <p>
                    A: Our content is free from technical jargon where possible, politically neutral, and focused on
                    education rather than investment advice.
                  </p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: Is the learning content suitable for all ages?{' '}
                  </p>
                  <p>A: The platform is designed to be accessible to all skill levels</p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: Can I track my progress as I go through the learning materials?{' '}
                  </p>
                  <p>A: Yes, the platform includes progress tracking through the educational content</p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: Are there any assessments to check my understanding?{' '}
                  </p>
                  <p>
                    A: Yes, the platform includes interactive quizzes to test your understanding at key learning points
                  </p>
                </li>
                <hr className="resources__info-blocks__faq__main__hr" />
                <h4 id="wallet_faq">Wallet</h4>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: How do I create a wallet in the simulator?{' '}
                  </p>
                  <p>
                    A: The platform provides a simulated wallet creation process with educational explanations, guiding
                    you through each step.
                  </p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">Q: Is the wallet I create real? </p>
                  <p>
                    A: No, it is a simulation tool for educational purposes only. No real cryptocurrency is involved.
                  </p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: How long is my simulated wallet data stored?{' '}
                  </p>
                  <p>A: Wallet data is retained for only 72 hours after creation.</p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: What security measures are in place for the wallet simulator?{' '}
                  </p>
                  <p>
                    A: Simulated seed phrases are encrypted before storage, and once created, wallet data becomes
                    read-only to ensure the integrity of the simulation.
                  </p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: Can I send or receive actual cryptocurrency with the simulated wallet?{' '}
                  </p>
                  <p>A: No, the wallet is designed to simulate the process for educational purposes.</p>
                </li>
                <hr className="resources__info-blocks__faq__main__hr" />
                <h4 id="general_faq">General</h4>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: How is this platform different from a real-world cryptocurrency exchange?{' '}
                  </p>
                  <p>
                    A: This platform is for educational purposes, providing a risk-free environment to learn about
                    blockchain and cryptocurrencies. It does not involve real financial transactions.
                  </p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: Can I get financial advice on this platform?{' '}
                  </p>
                  <p>A: No, the platform is limited to educational content and does not provide financial advice.</p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">Q: Is my data safe on this platform? </p>
                  <p>A: The platform is designed to protect temporary user data, and security measures are in place.</p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: What is blockchain technology used for in the real world?{' '}
                  </p>
                  <p>
                    A: Blockchain technology has various real-world applications, including trade finance, supply chain
                    management, healthcare, and retail.
                  </p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: What are Central Bank Digital Currencies (CBDCs)?{' '}
                  </p>
                  <p>
                    A: CBDCs are a digital form of a country's national currency, issued directly by the central bank.
                  </p>
                </li>
              </ul>
            </div>
            <hr className="resources__info-blocks__faq__main__hr" />
            <div className="resources__info-blocks__faq__footer">
              <p>
                This concludes our frequently asked questions. Should anything else come to mind, we're always ready to
                assist!
              </p>
              <button onClick={handleIsOpen}>Close FAQ</button>
            </div>
          </motion.div>
        ) : (
          <div className="resources__info-blocks__faq">
            <div className="resources__info-blocks__faq--shadowed"></div>
            <div className="resources__info-blocks__faq__header">
              <h2>Frequently Asked Questions: Your Blockchain Learning Journey</h2>
            </div>
            <div className="resources__info-blocks__faq__main">
              <h3>Find answers to common questions about our blockchain education resources</h3>
              <ul className="resources__info-blocks__faq__main--preview">
                <h4 id="learning_faq">Learning</h4>
                <li>
                  <p>Q: How is the information on this platform kept up-to-date? </p>
                  <p>
                    A: Our content is carefully crafted to be accurate and up-to-date, and we strive to regularly review
                    and update it to reflect the latest developments in blockchain technology, cryptocurrencies, and
                    CBDCs
                  </p>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Q: Is the information presented here biased in any way?{' '}
                  </p>
                  <p>
                    A: Our content is free from technical jargon where possible, politically neutral, and focused on
                    education rather than investment advice.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Faq;
