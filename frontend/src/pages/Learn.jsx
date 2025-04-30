import { useState, useEffect } from 'react';
import Blockchain from '../components/learn/Blockchain';
import Crypto from '../components/learn/Crypto';
import Cbdc from '../components/learn/Cbdc';
import Certification from '../components/learn/Certification';

const Learn = () => {
  const [isPassed, setIsPassed] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      <div className="learn">
        <div className="learn__header">
          <h1></h1>
          <p></p>
        </div>
        <div className="learn__main">
          <div className="learn__main__blockchain">
            <h2></h2>
            <p></p>
            <button onClick={<Blockchain />}></button>
          </div>
          <div className="learn__main__crypto">
            <h2></h2>
            <p></p>
            <button onClick={<Crypto />}></button>
          </div>
          <div className="learn__main__cbdc">
            <h2></h2>
            <p></p>
            <button onClick={<Cbdc />}></button>
          </div>
        </div>
        {isPassed && (
          <div className="learn__footer">
            <div className="learn__footer__certification">
              <h3></h3>
              <button onClick={<Certification />}></button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Learn;
