import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import ActiveWallet from './ActiveWallet';

const AccessWallet = ({ handleAccess }) => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isSeedPraseValid, setIsSeedPhraseValid] = useState(false);
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [firstWord, setFirstWord] = useState('');
  const [secondWord, setSecondWord] = useState('');
  const [thirdWord, setThirdWord] = useState('');
  const [fourthWord, setFourthWord] = useState('');
  const [fifthWord, setFifthWord] = useState('');
  const [sixthWord, setSixthWord] = useState('');
  const [seventhWord, setSeventhWord] = useState('');
  const [eighthWord, setEighthWord] = useState('');
  const [ninthWord, setNinthWord] = useState('');
  const [tenthWord, setTenthWord] = useState('');
  const [eleventhWord, setEleventhWord] = useState('');
  const [twelfthWord, setTwelfthWord] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const seedPhraseArray = [
      firstWord.trim(),
      secondWord.trim(),
      thirdWord.trim(),
      fourthWord.trim(),
      fifthWord.trim(),
      sixthWord.trim(),
      seventhWord.trim(),
      eighthWord.trim(),
      ninthWord.trim(),
      tenthWord.trim(),
      eleventhWord.trim(),
      twelfthWord.trim(),
    ];

    const convertIntoSeedPhrase = () => {
      const seedPhraseString = seedPhraseArray.join(' ');
      const convertedSeed = seedPhraseString.trim().toLowerCase();
      if (convertedSeed.split(' ').length === 12) {
        setSeedPhrase(convertedSeed);
        setIsSeedPhraseValid(true);
      }
    };

    convertIntoSeedPhrase();
  }, [
    firstWord,
    secondWord,
    thirdWord,
    fourthWord,
    fifthWord,
    sixthWord,
    seventhWord,
    eighthWord,
    ninthWord,
    tenthWord,
    eleventhWord,
    twelfthWord,
  ]);

  return (
    <div className="wallet__access">
      <div className="wallet__access__header">
        <h1>Access Your Wallet</h1>
      </div>
      <div className="wallet__access__body">
        <h4>Enter your seed phrase to access your wallet</h4>
        <p>Make sure to enter the 12-word phrase you received when you were creating the wallet</p>
        <fieldset>
          <legend>Seed Phrase</legend>
          <input type="text" placeholder="1st word" value={firstWord} onChange={(e) => setFirstWord(e.target.value)} />
          <input
            type="text"
            placeholder="2nd word"
            value={secondWord}
            onChange={(e) => setSecondWord(e.target.value)}
          />
          <input type="text" placeholder="3rd word" value={thirdWord} onChange={(e) => setThirdWord(e.target.value)} />
          <input
            type="text"
            placeholder="4th word"
            value={fourthWord}
            onChange={(e) => setFourthWord(e.target.value)}
          />
          <input type="text" placeholder="5th word" value={fifthWord} onChange={(e) => setFifthWord(e.target.value)} />
          <input type="text" placeholder="6th word" value={sixthWord} onChange={(e) => setSixthWord(e.target.value)} />
          <input
            type="text"
            placeholder="7th word"
            value={seventhWord}
            onChange={(e) => setSeventhWord(e.target.value)}
          />
          <input
            type="text"
            placeholder="8th word"
            value={eighthWord}
            onChange={(e) => setEighthWord(e.target.value)}
          />
          <input type="text" placeholder="9th word" value={ninthWord} onChange={(e) => setNinthWord(e.target.value)} />
          <input type="text" placeholder="10th word" value={tenthWord} onChange={(e) => setTenthWord(e.target.value)} />
          <input
            type="text"
            placeholder="11th word"
            value={eleventhWord}
            onChange={(e) => setEleventhWord(e.target.value)}
          />
          <input
            type="text"
            placeholder="12th word"
            value={twelfthWord}
            onChange={(e) => setTwelfthWord(e.target.value)}
          />
        </fieldset>
      </div>
      {message && (
        <div className="wallet__access__message">
          <p>{message}</p>
        </div>
      )}
      <div className="wallet__access__footer">
        <button
          onClick={() => {
            if (isSeedPraseValid && attempt < 3) {
              axios
                .post('http://localhost:3000/api/wallet/access', { seedPhrase }, { withCredentials: true })
                .then((response) => {
                  if (response.status === 200) {
                    setIsAccessGranted(true);
                  }
                })
                .catch((error) => {
                  if (error.response.statusText === 'Not Found') {
                    setMessage('Invalid seed phrase. Please try again.');
                  }
                  console.error('Error accessing wallet:', error);
                });
            }
            setAttempt(attempt + 1);
            if (attempt >= 3) {
              alert('You have exceeded the maximum number of attempts. Please try again later.');
            }
            setTimeout(() => {
              if (attempt >= 3) {
                setAttempt(0);
              }
            }, 30000);
          }}
          disabled={!isSeedPraseValid}
        >
          Access My Wallet
        </button>
        <div className="wallet__access__footer__create">
          <p>
            Don't have a wallet?{' '}
            <Link to="/wallet" onClick={handleAccess}>
              Create one
            </Link>
          </p>
        </div>
      </div>
      {isAccessGranted && <ActiveWallet />}
    </div>
  );
};

export default AccessWallet;
