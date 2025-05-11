import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import CryptoQuiz from './CryptoQuiz';

const Crypto = ({ handleOpen, setSessionId, setIsPassed }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleQuizOpen = () => {
    setIsQuizOpen(!isQuizOpen);
  };

  return (
    <>
      <div className="learn__crypto">
        <button className="learn__back-button" onClick={() => handleOpen('blockchain')}>
          Back to Learn page
        </button>
        <article className="learn__crypto__content">
          <h1>Cryptocurrency</h1>
          <h3>From Blockchain to Cryptocurrencies: A Closer Look</h3>
          <p>
            As we've explored, blockchain provides the underlying technology for many digital currencies. Now, let's
            turn our attention specifically to cryptocurrencies and how they function within the blockchain ecosystem.
          </p>
          <h3>Comprehensive Cryptocurrency Explanations</h3>
          <p>
            Cryptocurrencies are a type of digital currency that leverages blockchain technology for secure and
            transparent transactions. Unlike traditional currencies issued by governments (like the US dollar or the
            Euro), cryptocurrencies often operate in a decentralised manner. This means that no single authority
            controls their issuance or regulation.
          </p>
          <p>Here are some key aspects of cryptocurrencies:</p>
          <ul>
            <li>
              <strong>Decentralisation:</strong> As mentioned, this is a core feature. Instead of a central bank, the
              network's users collectively maintain the system.
            </li>
            <li>
              <strong>Cryptography:</strong> Cryptocurrencies use advanced encryption techniques to secure transactions,
              control the creation of new units, and verify transfers. This is where the "crypto" part comes from.
            </li>
            <li>
              <strong>Limited Supply:</strong> Many cryptocurrencies have a capped maximum supply, which can contribute
              to their perceived scarcity.
            </li>
            <li>
              <strong>Variable Value:</strong> The value of cryptocurrencies can fluctuate significantly based on supply
              and demand, market sentiment, and other factors.
            </li>
          </ul>
          <h3>Information About Various Digital Currencies</h3>
          <p>
            The world of cryptocurrencies is diverse, with many different types and purposes. Here are a few examples:
          </p>
          <ul>
            <li>
              <strong>Bitcoin (BTC):</strong> The first and most well-known cryptocurrency. It was designed as a
              peer-to-peer electronic cash system.
            </li>
            <li>
              <strong>Ethereum (ETH):</strong> While also a cryptocurrency, Ethereum's blockchain is designed to support
              a wide range of applications, including decentralised applications (dApps) and smart contracts.
            </li>
            <li>
              <strong>Litecoin (LTC):</strong> Often referred to as "silver to Bitcoin's gold," Litecoin was designed
              for faster transaction confirmations.
            </li>
            <li>Many other cryptocurrencies exist, each with its own unique features and goals.</li>
          </ul>
          <p>
            It's important to remember that the cryptocurrency market is constantly evolving, with new currencies
            emerging and others changing over time.
          </p>
          <h3>Clear Explanations of Cryptocurrency Concepts</h3>
          <p>To better understand how cryptocurrencies work, let's clarify some essential concepts:</p>
          <ul>
            <li>
              <strong>Digital Wallet:</strong> This is a software program or hardware device that allows you to store,
              send, and receive cryptocurrencies. It holds the cryptographic keys that give you access to your funds.
            </li>
            <li>
              <strong>Private Key:</strong> This is a secret code that allows you to access and spend your
              cryptocurrency. It's crucial to keep your private key secure, as anyone who has it can control your funds.
            </li>
            <li>
              <strong>Public Key:</strong> This is a code that you can share with others to receive cryptocurrency. It's
              like your bank account number, while the private key is like your PIN.
            </li>
            <li>
              <strong>Transaction:</strong> A transaction is the transfer of cryptocurrency from one wallet to another.
            </li>
            <li>
              <strong>Mining:</strong> In Proof-of-Work systems (like Bitcoin), mining is the process of validating
              transactions and adding them to the blockchain. Miners are rewarded with cryptocurrency for their efforts.
            </li>
            <li>
              <strong>Staking:</strong> In Proof-of-Stake systems, staking is the process of holding and "locking up"
              cryptocurrency to support the network and validate transactions.
            </li>
          </ul>
          <p>
            This section provides a foundation for understanding the complex world of cryptocurrencies. By grasping
            these core concepts, you'll be better equipped to navigate this rapidly evolving landscape.
          </p>
          <p className="learn__crypto__content__cta">
            You can dive into cryptocurrency experience with out wallet creation simulation.
            <Link to="/wallet">Create your own crypto wallet right now!</Link>
          </p>
          <p className="learn__crypto__content__cta">
            Check out our <Link to="/resources#resources-header">Resources page</Link> for more information
          </p>
        </article>
        <div className="learn__crypto__footer">
          <h3>Cryptocurrency Quiz</h3>
          <video src="src/assets/videos/crypto_quiz.mp4" autoPlay muted loop className="learn__header__video"></video>
          <p>
            Now that you've learned about cryptocurrencies, it's time to test your knowledge! Click the button below to
            take the quiz and see how well you understand the concepts we've covered.
          </p>
          <button className="learn__crypto__footer__button" onClick={handleQuizOpen}>
            Start Quiz
          </button>
        </div>
        <div className="learn__crypto__quiz">
          {isQuizOpen && (
            <CryptoQuiz handleQuizOpen={handleQuizOpen} setSessionId={setSessionId} setIsPassed={setIsPassed} />
          )}
        </div>
      </div>
    </>
  );
};

export default Crypto;
