import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { motion } from 'motion/react';
import { pageVariants, pageTransition } from '../../utils/utils';
import ActiveWallet from './ActiveWallet';
import Loading from '../Loading';

const CreateWallet = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleAccess = () => {
    if (isChecked) {
      setIsChecked(false);
      document.getElementById('seed').checked = false;
      setIsAccessGranted((prev) => !prev);
    }
  };

  const createWallet = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 200));

      localStorage.clear();
      const response = await axios.post('http://localhost:3000/api/wallet/create', {}, { withCredentials: true });
      if (response.status === 201) {
        setIsSuccess(true);

        const { wallet } = response.data;
        const { seedPhrase: generatedSeedPhrase } = wallet;
        setSeedPhrase(generatedSeedPhrase);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    createWallet();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSuccess ? (
        <motion.div
          className={isAccessGranted ? 'hide' : 'wallet__cw'}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="wallet__cw__header">
            <h1>Wallet Created Successfully</h1>
            <p>Your wallet has been created. You can now start using it.</p>
          </div>
          <div className="wallet__cw__body">
            <h3>
              Save your seed phrase in a safe place <span>(!!!)</span>
            </h3>
            <div className="wallet__cw__body__seed-phrase">
              <p>Seed Phrase:</p>
              <div className="wallet__cw__body__seed-phrase__phrase">
                {seedPhrase.split(' ').map((word, index) => (
                  <span key={index} className="wallet__cw__body__seed-phrase__word">
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <div className="wallet__cw__confirmation">
              <label htmlFor="seed">I confirm that I have saved my seed phrase in a safe place</label>
              <input type="checkbox" name="seed" id="seed" onClick={handleCheckboxChange} />
              <div className={isChecked ? 'wallet__cw__confirmation__alert' : 'hide'}>
                <p>
                  <span>⚠️</span> If you lose your seed phrase, you will lose access to your wallet.
                </p>
              </div>
            </div>
            <div className="wallet__cw__button">
              <button
                className="create-wallet__button"
                disabled={!isChecked}
                onClick={() => {
                  handleCheckboxChange();
                  handleAccess();
                }}
              >
                <Link className="cybr-btn">
                  Access Your Wallet
                  <span aria-hidden class="cybr-btn__glitch">
                    Access Your Wallet
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="wallet__cw"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <div className="wallet__cw__header">
            <h1>Your wallet could not be created</h1>
            <p>Please try again</p>
          </div>
          <div className="wallet__cw__body">
            <Link to="/wallet">
              <button className="create-wallet__button">Go Back</button>
            </Link>
          </div>
        </motion.div>
      )}
      {isAccessGranted && <ActiveWallet />}
    </>
  );
};

export default CreateWallet;
