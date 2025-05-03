import { useState, useEffect } from 'react';
import Blockchain from '../components/learn/Blockchain';
import Crypto from '../components/learn/Crypto';
import Cbdc from '../components/learn/Cbdc';
import Certification from '../components/learn/Certification';

const Learn = () => {
  const [isPassed, setIsPassed] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [isOpenBlockchain, setIsOpenBlockchain] = useState(false);
  const [isOpenCrypto, setIsOpenCrypto] = useState(false);
  const [isOpenCbdc, setIsOpenCbdc] = useState(false);
  const [isOpenCertification, setIsOpenCertification] = useState(false);

  useEffect(() => {}, []);

  const handleOpen = (module) => {
    switch (module) {
      case 'blockchain':
        setIsOpenBlockchain(!isOpenBlockchain);
        break;
      case 'crypto':
        setIsOpenCrypto(!isOpenCrypto);
        break;
      case 'cbdc':
        setIsOpenCbdc(!isOpenCbdc);
        break;
      case 'certification':
        setIsOpenCertification(!isOpenCertification);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="learn">
        {!isOpenBlockchain && !isOpenCrypto && !isOpenCbdc && !isOpenCertification && (
          <>
            <div className="learn__header">
              <h1>Welcome to Your Blockchain Learning Hub</h1>
              <video
                src="src/assets/videos/learn_video.mp4"
                autoPlay
                muted
                loop
                className="learn__header__video"
              ></video>
              <p>
                Embark on a journey to understand the fundamentals of Blockchain, Cryptocurrencies, and Central Bank
                Digital Currencies (CBDCs) through clear, unbiased explanations.
              </p>
            </div>
            <div className="learn__main">
              <div className="learn__main__blockchain">
                <h2>Blockchain Technology</h2>
                <p>
                  Dive into the foundational technology. Here, you'll explore what a blockchain is, how it works, its
                  key components like blocks, chains, and cryptography, and understand concepts like decentralisation
                  and immutability.
                </p>
                <button onClick={() => handleOpen('blockchain')}>Learn about Blockchain</button>
              </div>
              <hr className="learn__main__hr" />
              <div className="learn__main__crypto">
                <h2>Cryptocurrencies</h2>
                <p>
                  Discover the world of digital currencies. This section explains what cryptocurrencies are, how they
                  utilise blockchain technology, the distinction between different types (like Bitcoin and altcoins),
                  and their basic transaction mechanisms.
                </p>
                <button onClick={() => handleOpen('crypto')}>Learn about Crypto</button>
              </div>
              <hr className="learn__main__hr" />
              <div className="learn__main__cbdc">
                <h2>Central Bank Digital Currencies (CBDCs)</h2>
                <p>
                  Explore the concept of digital currencies issued by nations' central banks. Learn what CBDCs are, why
                  governments are exploring them, potential designs, and how they compare and contrast with existing
                  cryptocurrencies and traditional electronic money.
                </p>
                <button onClick={() => handleOpen('cbdc')}>Learn about CBDCs</button>
              </div>
            </div>
          </>
        )}
        {isOpenBlockchain && (
          <Blockchain
            handleOpen={() => handleOpen('blockchain')}
            setSessionId={setSessionId}
            setIsPassed={setIsPassed}
          />
        )}
        {isOpenCrypto && (
          <Crypto
          handleOpen={() => handleOpen('crypto')}
          setSessionId={setSessionId}
          setIsPassed={setIsPassed} />
        )}
        {isOpenCbdc && (
          <Cbdc
          handleOpen={() => handleOpen('cbdc')}
          setSessionId={setSessionId}
          setIsPassed={setIsPassed} />
        )}
        {isOpenCertification && (
          <Certification
            handleOpen={() => handleOpen('certification')}
            sessionId={sessionId}
            setIsPassed={setIsPassed}
          />
        )}
        {isPassed && !isOpenBlockchain && !isOpenCrypto && !isOpenCbdc && (
          <div className="learn__footer">
            <div className="learn__footer__certification">
              <h3>Completion & Certification</h3>
              <p>
                Congratulations on successfully completing all the learning modules and quizzes! You can now generate
                your personalised certificate of completion by clicking the button below.
              </p>
              <button onClick={() => handleOpen('certification')}>Generate Certificate</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Learn;
