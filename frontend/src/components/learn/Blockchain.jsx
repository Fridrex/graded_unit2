import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Zoom from 'react-medium-image-zoom';
import { motion } from 'motion/react';
import { pageVariants, pageTransition } from '../../utils/utils';
import BlockchainQuiz from './BlockchainQuiz';
import 'react-medium-image-zoom/dist/styles.css';

const Blockchain = ({ handleOpen }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleQuizOpen = () => {
    setIsQuizOpen(!isQuizOpen);
  };

  return (
    <>
      <motion.div
        className="learn__blockchain"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <button className="learn__back-button" onClick={() => handleOpen('blockchain')}>
          Back to Learn page
        </button>
        <article className="learn__blockchain__content">
          <h1>Blockchain</h1>
          <p>
            Welcome to the foundation of understanding digital currencies – Blockchain Technology. At its core, a
            blockchain is a revolutionary way of recording and sharing information. Imagine a digital ledger that's
            duplicated across many computers.
          </p>
          <p>
            Instead of a single entity controlling the information, everyone in the network has a copy. This makes it
            incredibly difficult to change or delete data, providing a high level of security and transparency.
          </p>
          <p>Here's what makes blockchain unique:</p>
          <ul>
            <li>
              <strong>Decentralisation:</strong> No single authority controls the network. It's distributed.
            </li>
            <li>
              <strong>Transparency:</strong> All transactions are visible to participants.
            </li>
            <li>
              <strong>Immutability:</strong> Once a block of data is added to the chain, it's very hard to change
            </li>
            <li>
              <strong>Security:</strong> Cryptography is used to secure and verify transactions.
            </li>
          </ul>
          <p>
            In simpler terms, it's like a shared, unchangeable digital record book. This technology is the backbone of
            many cryptocurrencies, but its applications go far beyond that, impacting various industries from supply
            chain management to voting systems.
          </p>
          <p>
            This section will break down these concepts further, using visuals and simple language, so you can
            confidently grasp how blockchain works and its potential.
          </p>
          <div className="learn__blockchain__content__zoom">
            <Zoom>
              <img src="src/assets/images/blockchain-info.jpeg" alt="Blockchain infographics" />
            </Zoom>
          </div>
          <p>
            The world of digital currencies can seem complex, filled with unfamiliar terms. Our goal is to simplify this
            for you. Here, we'll break down the essential vocabulary and fundamental ideas without the confusing jargon.
          </p>
          <ul>
            <li>
              <strong>Digital Currency:</strong> Simply put, it's money that exists only in electronic form. Think of it
              like the money in your online bank account – it's digital, not physical.
            </li>
            <li>
              <strong>Cryptocurrency:</strong> This is a type of digital currency that uses cryptography for security.
              Cryptography is a way of scrambling information so only the intended recipient can read it. Bitcoin,
              Ethereum, and others are examples.
            </li>
            <li>
              <strong>Blockchain:</strong> As we discussed earlier, this is the technology that often underlies
              cryptocurrencies. It's a secure, shared record of transactions.
            </li>
            <li>
              <strong>Wallet:</strong> A digital wallet is where you store your digital currencies. It's similar to a
              bank account, but instead of holding traditional money, it holds the digital codes that allow you to
              access your cryptocurrency.
            </li>
            <li>
              <strong>Transaction:</strong> A transaction is an exchange of digital currency from one person to another.
            </li>
            <li>
              <strong>Decentralisation:</strong> This means that no single entity, like a bank or government, controls
              the digital currency. The network is typically run by its users.
            </li>
          </ul>
          <p>
            These are some of the basic building blocks. We'll explore these and other concepts in more detail, always
            keeping the explanations clear and straightforward.
          </p>
          <div className="learn__blockchain__content__zoom">
            <Zoom>
              <img src="src/assets/images/crypto-info.jpg" alt="Blockchain infographics" />
            </Zoom>
          </div>
          <p>
            Our infographic provides a visual guide to the fascinating world of blockchain technology. Let's dive deeper
            into the different aspects highlighted:
          </p>
          <h3>Types of Blockchain Architecture:</h3>
          <p>
            Just like there are different ways to build a house, there are different structures for blockchains. The
            infographic shows three main types:
          </p>
          <ul>
            <li>
              <strong>Public Blockchain:</strong> Think of this as a completely open and transparent record book. Anyone
              can view the transactions and participate in the network. Bitcoin and Ethereum are prime examples of
              public blockchains.
            </li>
            <li>
              <strong>Private Blockchain:</strong> Imagine a record book that's only accessible to specific people
              within an organisation. Private blockchains are permissioned, meaning you need authorisation to join and
              participate. They are often used by businesses for internal purposes.
            </li>
            <li>
              <strong>Federated/Consortium Blockchain:</strong> This is like a mix of public and private. Instead of
              being controlled by a single organisation, it's governed by a group or consortium of organisations. This
              offers a balance between transparency and control.
            </li>
          </ul>
          <h3>Key Differences Between Blockchain Types:</h3>
          <p>The infographic neatly summarises the distinctions:</p>
          <ul>
            <li>
              <strong>Access:</strong> Public blockchains are open to everyone, while private and consortium blockchains
              have restricted access.
            </li>
            <li>
              <strong>Consensus:</strong> Public blockchains typically rely on public consensus mechanisms, whereas
              private and consortium blockchains use organisation-based or selected node-based consensus.
            </li>
            <li>
              <strong>Efficiency:</strong> Private and consortium blockchains often boast higher efficiency compared to
              public blockchains due to their controlled nature.
            </li>
            <li>
              <strong>Centralisation:</strong> Public blockchains are decentralised, meaning no single entity controls
              them. Private blockchains are centralised, and consortium blockchains are partially centralised.
            </li>
            <li>
              <strong>Consensus Process:</strong> This refers to how new transactions are validated and added to the
              blockchain. It's permissionless in public blockchains and permissioned in private and consortium
              blockchains.
            </li>
            <li>
              <strong>Immutability:</strong> While all blockchains strive for immutability (making it very difficult to
              alter records), public blockchains are generally considered completely tamper-proof due to their
              widespread distribution. Private and consortium blockchains might be less so, depending on their specific
              setup.
            </li>
          </ul>
          <h3>Notable Consensus Methods:</h3>
          <p>The infographic introduces some common ways blockchains achieve agreement on new data:</p>
          <ul>
            <li>
              <strong>Proof-of-Work (PoW):</strong> This is the original consensus mechanism used by Bitcoin. It
              involves network participants (miners) solving complex computational puzzles to validate transactions and
              create new blocks. This process requires significant energy.
            </li>
            <li>
              <strong>Proof-of-Stake (PoS):</strong> As an alternative to PoW, PoS selects validators based on the
              amount of cryptocurrency they "stake" or lock up. It's generally considered more energy-efficient than
              PoW.
            </li>
            <li>
              <strong>Delegated Proof-of-Stake (DPoS):</strong> This is a variation of PoS where stakeholders vote for a
              smaller group of delegates who are responsible for validating transactions.
            </li>
            <li>
              <strong>Practical Byzantine Fault Tolerance (PBFT):</strong> This consensus mechanism is designed to work
              even if some participants in the network are unreliable or malicious. It's often used in permissioned
              blockchains.
            </li>
          </ul>
          <h3>Popular Blockchain Use Cases:</h3>
          <p>
            Blockchain's potential extends far beyond cryptocurrencies. The infographic highlights a few exciting
            applications:
          </p>
          <ul>
            <li>
              <strong>Trade Finance:</strong> Streamlining international trade by making it more transparent and
              efficient.
            </li>
            <li>
              <strong>Supply Chain:</strong> Tracking goods as they move through the supply chain, ensuring authenticity
              and preventing counterfeiting.
            </li>
            <li>
              <strong>Healthcare:</strong> Securely managing and sharing medical records, improving patient care and
              data privacy.
            </li>
            <li>
              <strong>Retail:</strong> Enhancing customer loyalty programs, managing inventory, and ensuring product
              authenticity.
            </li>
          </ul>
          <h3>How Blockchain Works (Simplified):</h3>
          <p>The infographic illustrates the basic steps of a blockchain transaction:</p>
          <ol>
            <li>A user requests a transaction.</li>
            <li>This transaction is sent to a network of computers (nodes).</li>
            <li>The network validates the transaction.</li>
            <li>Once validated, the transaction is added to a new block.</li>
            <li>This new block is then added to the existing chain, making it permanent.</li>
            <li>The nodes that validate the transaction receive a reward for their effort.</li>
          </ol>
          <p>
            This infographic provides a great starting point for understanding the core concepts of blockchain. As you
            continue your learning journey, you'll discover even more about this transformative technology!
          </p>
          <p className="learn__blockchain__content__cta">
            Check out our <Link to="/resources#resources-header">Resources page</Link> for more information
          </p>
        </article>
        <div className="learn__blockchain__footer">
          <h3>Blockchain Quiz</h3>
          <video
            src="src/assets/videos/blockchain_quiz.mp4"
            autoPlay
            muted
            loop
            className="learn__header__video"
          ></video>
          <p>
            Now that you've learned about blockchain technology, it's time to test your knowledge! Click the button
            below to take the quiz and see how well you understand the concepts we've covered.
          </p>
          <button className="learn__blockchain__footer__button" onClick={handleQuizOpen}>
            Start Quiz
          </button>
        </div>
        <div className="learn__blockchain__quiz">
          {isQuizOpen && <BlockchainQuiz handleQuizOpen={handleQuizOpen} />}
        </div>
      </motion.div>
    </>
  );
};

export default Blockchain;
