import { useState, useEffect } from 'react';
import Blockchain from '../components/learn/Blockchain';
import Crypto from '../components/learn/Crypto';
import Cbdc from '../components/learn/Cbdc';
import Certification from '../components/learn/Certification';

const Learn = () => {
  const [isPassed, setIsPassed] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      <div className="learn">
        <div className="learn__header">
          <h1>Welcome to Your Blockchain Learning Hub</h1>
          <p>
            Embark on a journey to understand the fundamentals of Blockchain, Cryptocurrencies, and Central Bank Digital
            Currencies (CBDCs) through clear, unbiased explanations.
          </p>
        </div>
        <div className="learn__main">
          <div className="learn__main__blockchain">
            <h2>Blockchain Technology</h2>
            <p>
              Dive into the foundational technology. Here, you'll explore what a blockchain is, how it works, its key
              components like blocks, chains, and cryptography, and understand concepts like decentralisation and
              immutability.
            </p>
            <button onClick={<Blockchain />}>Learn about Blockchain</button>
          </div>
          <div className="learn__main__crypto">
            <h2>Cryptocurrencies</h2>
            <p>
              Discover the world of digital currencies. This section explains what cryptocurrencies are, how they
              utilise blockchain technology, the distinction between different types (like Bitcoin and altcoins), and
              their basic transaction mechanisms.
            </p>
            <button onClick={<Crypto />}>Learn about Crypto</button>
          </div>
          <div className="learn__main__cbdc">
            <h2>Central Bank Digital Currencies (CBDCs)</h2>
            <p>
              Explore the concept of digital currencies issued by nations' central banks. Learn what CBDCs are, why
              governments are exploring them, potential designs, and how they compare and contrast with existing
              cryptocurrencies and traditional electronic money.
            </p>
            <button onClick={<Cbdc />}>Learn about CBDCs</button>
          </div>
        </div>
        {isPassed && (
          <div className="learn__footer">
            <div className="learn__footer__certification">
              <h3>Completion & Certification</h3>
              <p>
                Congratulations on successfully completing all the learning modules and quizzes! You can now generate
                your personalised certificate of completion by clicking the button below.
              </p>
              <button onClick={<Certification />}>Generate Certificate</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Learn;
