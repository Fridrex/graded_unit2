/**
 * @file Glossary.jsx
 * @description Component that displays a glossary of terms related to blockchain and cryptocurrency.
 * It shows a preview and can be expanded to show all terms, categorized for easier navigation.
 * Uses HashLink for in-page navigation to specific term categories.
 */

import { HashLink as Link } from 'react-router-hash-link'; // For smooth scrolling to sections within the page
import { motion, AnimatePresence } from 'motion/react'; // For animations on expand/collapse
import { pageTransition, pageVariants } from '../../utils/utils'; // Animation utility constants

/**
 * @function Glossary
 * @description Displays a list of terms and their definitions.
 * Allows toggling between a preview and a full view of the glossary.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls whether the full glossary is visible or a preview.
 * @param {function} props.handleIsOpen - Function to toggle the `isOpen` state.
 * @returns {JSX.Element} The Glossary section UI.
 */
const Glossary = ({ isOpen, handleIsOpen }) => {
  return (
    <>
      {/* AnimatePresence handles animations for appearing/disappearing content */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          // Full Glossary view, rendered when `isOpen` is true
          <motion.div
            className="resources__info-blocks__glossary" // Base class for styling
            key="glossary-content" // Unique key for AnimatePresence
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ overflow: 'hidden' }} // Prevents content overflow during animation
          >
            <div className="resources__info-blocks__glossary__header">
              <h2>Demystifying the Tech: Your Comprehensive Glossary</h2>
            </div>
            <div className="resources__info-blocks__glossary__main">
              <h3>Find the Definitions You Need</h3>
              {/* Navigation links to jump to specific glossary categories */}
              <ul className="resources__info-blocks__glossary__main__navigation">
                <li>
                  <Link smooth to="#core_jargon_glossary">
                    Core Jargon
                  </Link>
                </li>
                <li>
                  <Link smooth to="#blockchain_specific_glossary">
                    Blockchain Specific terms
                  </Link>
                </li>
                <li>
                  <Link smooth to="#cryptocurrency_specific_glossary">
                    Cryptocurrency Specific terms
                  </Link>
                </li>
                <li>
                  <Link smooth to="#cbdc_specific_glossary">
                    CBDC Specific terms
                  </Link>
                </li>
                <li>
                  <Link smooth to="#important_terms_glossary">
                    Important terms
                  </Link>
                </li>
              </ul>
              {/* Preview of Core Jargon (also part of the full view) */}
              <ul className="resources__info-blocks__glossary__main--preview">
                <h4 id="core_jargon_glossary">Core Jargon from Educational Texts</h4>
                <li>
                  <p>
                    <span>Blockchain</span> — A digital ledger duplicated across many computers, making it difficult to
                    change or delete data
                  </p>
                </li>
                <li>
                  <p>
                    <span>Central Bank Digital Currency (CBDC)</span> — A digital form of a country's national currency,
                    issued by the central bank
                  </p>
                </li>
                {/* ... other core jargon terms ... */}
                <li>
                  <p>
                    <span>Cryptography</span> — The art of writing or solving codes
                  </p>
                </li>
                <li>
                  <p>
                    <span>Decentralisation</span> — No single authority controls the network; it is distributed
                  </p>
                </li>
                <li>
                  <p>
                    <span>Digital Currency</span> — Money that exists only in electronic form
                  </p>
                </li>
                <li>
                  <p>
                    <span>Digital Wallet</span> — A software program or hardware device that allows you to store, send,
                    and receive cryptocurrencies
                  </p>
                </li>
                <li>
                  <p>
                    <span>Immutability</span> — Once a block of data is added to the chain, it's very hard to change
                  </p>
                </li>
                <li>
                  <p>
                    <span>Mining</span> — In Proof-of-Work systems, the process of validating transactions and adding
                    them to the blockchain
                  </p>
                </li>
                <li>
                  <p>
                    <span>Private Key</span> — A secret code that allows you to access and spend your cryptocurrency
                  </p>
                </li>
                <li>
                  <p>
                    <span>Public Key</span> — A code that you can share with others to receive cryptocurrency
                  </p>
                </li>
                <li>
                  <p>
                    <span>Staking</span> — In Proof-of-Stake systems, the process of holding and "locking up"
                    cryptocurrency to support the network and validate transactions
                  </p>
                </li>
                <li>
                  <p>
                    <span>Transaction</span> — An exchange of digital currency from one person to another
                  </p>
                </li>
                <li>
                  <p>
                    <span>Transparency</span> — All transactions are visible to participants in the network, but
                    personal information is kept private
                  </p>
                </li>
              </ul>
              <hr className="resources__info-blocks__glossary__main__hr" />
              {/* Expanded Glossary with more categories */}
              <ul className="resources__info-blocks__glossary__main--preview--expanded">
                <h4>Expanded Glossary with Descriptions</h4>

                {/* Blockchain Specific Terms */}
                <p
                  className="resources__info-blocks__glossary__main--preview--expanded__group"
                  id="blockchain_specific_glossary"
                >
                  A. Blockchain Specific
                </p>
                <li>
                  <p>
                    <span>Block</span> — A collection of data records grouped together
                  </p>
                </li>
                {/* ... other blockchain specific terms ... */}
                <li>
                  <p>
                    <span>Consensus Mechanism</span> — The method used to validate transactions and secure a blockchain
                    (e.g., Proof-of-Work, Proof-of-Stake)
                  </p>
                </li>
                <li>
                  <p>
                    <span>Distributed Ledger Technology (DLT)</span> — A digital system for recording transactions in
                    which the data is recorded in multiple places at the same time
                  </p>
                </li>
                <li>
                  <p>
                    <span>Fork</span> — A change to the blockchain's protocol that can result in two versions of the
                    blockchain
                  </p>
                </li>
                <li>
                  <p>
                    <span>Hash</span> — A unique digital fingerprint of a block of data
                  </p>
                </li>
                <li>
                  <p>
                    <span>Node</span> — A computer connected to the blockchain network that maintains a copy of the
                    blockchain
                  </p>
                </li>
                <li>
                  <p>
                    <span>Smart Contract</span> — Self-executing contracts with the terms of the agreement directly
                    written into code
                  </p>
                </li>

                {/* Cryptocurrency Specific Terms */}
                <p
                  className="resources__info-blocks__glossary__main--preview--expanded__group"
                  id="cryptocurrency_specific_glossary"
                >
                  B. Cryptocurrency Specific
                </p>
                <li>
                  <p>
                    <span>Altcoin</span> — Any cryptocurrency other than Bitcoin
                  </p>
                </li>
                {/* ... other cryptocurrency specific terms ... */}
                <li>
                  <p>
                    <span>Exchange</span> — A platform where cryptocurrencies are bought and sold
                  </p>
                </li>
                <li>
                  <p>
                    <span>Fiat Currency</span> — Government-issued currency (e.g., USD, EUR, GBP)
                  </p>
                </li>
                <li>
                  <p>
                    <span>Gas</span> — A fee required to conduct a transaction on the Ethereum blockchain
                  </p>
                </li>
                <li>
                  <p>
                    <span>Hard Cap</span> — The maximum amount of cryptocurrency that will ever exist for a specific
                    project
                  </p>
                </li>
                <li>
                  <p>
                    <span>Liquidity</span> — The ease with which a cryptocurrency can be bought or sold without
                    affecting its price
                  </p>
                </li>
                <li>
                  <p>
                    <span>Market Capitalisation</span> — The total value of all coins in circulation for a
                    cryptocurrency
                  </p>
                </li>
                <li>
                  <p>
                    <span>Token</span> — A digital asset that can represent various things on a blockchain
                  </p>
                </li>

                {/* CBDC Specific Terms */}
                <p
                  className="resources__info-blocks__glossary__main--preview--expanded__group"
                  id="cbdc_specific_glossary"
                >
                  C. CBDC Specific
                </p>
                <li>
                  <p>
                    <span>Central Bank</span> — The institution that manages a country's currency and monetary policy
                    (e.g., Bank of England)
                  </p>
                </li>
                {/* ... other CBDC specific terms ... */}
                <li>
                  <p>
                    <span>Digital Pound</span> — The potential UK version of a Central Bank Digital Currency
                  </p>
                </li>
                <li>
                  <p>
                    <span>Financial Inclusion</span> — Providing access to financial services for individuals and
                    businesses
                  </p>
                </li>
                <li>
                  <p>
                    <span>Monetary Policy</span> — Actions taken by a central bank to manage the money supply and
                    interest rates
                  </p>
                </li>

                {/* Important General Terms */}
                <p
                  className="resources__info-blocks__glossary__main--preview--expanded__group"
                  id="important_terms_glossary"
                >
                  D. Important Terms
                </p>
                <li>
                  <p>
                    <span>Adoption</span> — The rate at which a technology or currency becomes accepted and used
                  </p>
                </li>
                {/* ... other important terms ... */}
                <li>
                  <p>
                    <span>Algorithm</span> — A set of rules to be followed in calculations or other problem-solving
                    operations
                  </p>
                </li>
                <li>
                  <p>
                    <span>Asset</span> — Something that has value
                  </p>
                </li>
                <li>
                  <p>
                    <span>Audit Trail</span> — A record that tracks a transaction from beginning to end
                  </p>
                </li>
                <li>
                  <p>
                    <span>Bear Market</span> — A market in which prices are falling
                  </p>
                </li>
                <li>
                  <p>
                    <span>Bull Market</span> — A market in which prices are rising
                  </p>
                </li>
                <li>
                  <p>
                    <span>Decentralised Applications (dApps)</span> — Applications that run on a decentralised network
                  </p>
                </li>
                <li>
                  <p>
                    <span>Inflation</span> — A general increase in prices and fall in the purchasing value of money
                  </p>
                </li>
                <li>
                  <p>
                    <span>Regulation</span> — Rules and laws governing a particular activity
                  </p>
                </li>
                <li>
                  <p>
                    <span>Scalability</span> — The ability of a system to handle increasing amounts of work or to be
                    easily expanded
                  </p>
                </li>
                <li>
                  <p>
                    <span>Security</span> — Measures taken to protect a system or data from unauthorised access or
                    damage
                  </p>
                </li>
                <li>
                  <p>
                    <span>Volatility</span> — The degree to which the price of an asset changes over time
                  </p>
                </li>
              </ul>
              <hr className="resources__info-blocks__glossary__main__hr" />
            </div>
            {/* Footer for the expanded Glossary view */}
            <div className="resources__info-blocks__glossary__footer">
              <p>
                Feel free to pop back to the glossary whenever you encounter unfamiliar terms in your learning journey.
                We're always here to help clarify things!
              </p>
              {/* Button to close the full view and return to preview */}
              <button onClick={handleIsOpen}>Close Glossary</button>
            </div>
          </motion.div>
        ) : (
          // Preview Glossary view, rendered when `isOpen` is false
          <div className="resources__info-blocks__glossary">
            {/* Shadow effect for the preview card */}
            <div className="resources__info-blocks__glossary--shadowed"></div>
            <div className="resources__info-blocks__glossary__header">
              <h2>Demystifying the Tech: Your Comprehensive Glossary</h2>
            </div>
            <div className="resources__info-blocks__glossary__main">
              <h3>Find the Definitions You Need</h3>
              {/* Display a small preview of glossary terms */}
              <ul className="resources__info-blocks__glossary__main--preview">
                <h4>Core Jargon from Educational Texts</h4>
                <li>
                  <p>
                    <span>Blockchain</span> — A digital ledger duplicated across many computers, making it difficult to
                    change or delete data
                  </p>
                </li>
                <li>
                  <p>
                    <span>Central Bank Digital Currency (CBDC)</span> — A digital form of a country's national currency,
                    issued by the central bank
                  </p>
                </li>
                <li>
                  <p>
                    <span>Cryptography</span> — The art of writing or solving codes
                  </p>
                </li>
              </ul>
            </div>
            {/* The "Open Full Glossary" button is rendered by the parent Resources.jsx component */}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Glossary;
