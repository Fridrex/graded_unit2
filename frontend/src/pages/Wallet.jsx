import { useState, useEffect } from 'react';
import CreateWalletInstructions from '../components/wallet/CreateWalletInstructions';
import CreateWallet from '../components/wallet/CreateWallet';
import AccessWallet from '../components/wallet/AccessWallet';

const Wallet = () => {
  const [isInstructionsVisible, setInstructionsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isAccessing, setIsAccessing] = useState(false);

  const handleCreate = () => {
    setIsChecked(false);
    setInstructionsVisible(!isInstructionsVisible);
  };

  const handleAccess = () => {
    setIsAccessing(!isAccessing);
  };

  const handleStart = () => {
    if (isChecked) {
      window.scrollTo(0, 0);
      setIsStart(!isStart);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    if (isInstructionsVisible) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInstructionsVisible]);

  return (
    <>
      <div className={isStart || isAccessing ? 'hide' : 'wallet'}>
        <div className="wallet__note">
          <p>Important Note</p>
          <p>
            This is a simulation tool for educational purposes only. No real cryptocurrency is involved. All wallets and
            transactions are simulated to provide a safe learning environment.
          </p>
        </div>
        <div className="wallet__header">
          <h1>Experience Digital Currency Management in a Safe Environment</h1>
        </div>
        <div className="wallet__create-wallet">
          <h2>Create New Wallet</h2>
          <div className="wallet__create-wallet__content">
            <div className="wallet__create-wallet__content__text-and-button">
              <p>
                Ready to see how digital currency wallets work? Our simulator lets you experience the essential features
                of a cryptocurrency wallet without any financial risk. Create your wallet to understand seed phrases,
                public addresses, and basic transactions.
              </p>
              <button className="create-wallet__button" onClick={handleCreate}>
                Create Your First Wallet
              </button>
            </div>
            <div className="wallet__create-wallet__content__image">
              <img src="src/assets/images/bitcoin-key-icon.png" alt="Bitcoin Key" />
            </div>
          </div>
        </div>
        <div className="wallet__reminder">
          <p>Security Reminder</p>
          <p>
            While this is a simulation, we encourage you to treat it as if it were real - it's good practice for
            understanding the security measures needed when dealing with actual digital currencies.
          </p>
        </div>
        <div className="wallet__access-wallet">
          <h2>View Existing Wallet</h2>
          <div className="wallet__access-wallet__content">
            <div className="wallet__access-wallet__content__image">
              <img src="src/assets/images/login-wallet.png" alt="Bitcoin Key" />
            </div>
            <div className="wallet__access-wallet__content__text-and-button">
              <p>
                Already created a wallet? Access your simulated wallet to continue exploring its features and
                understanding how digital currency management works in practice.
              </p>
              <button className="access-wallet__button" onClick={handleAccess}>
                Access Your Wallet
              </button>
            </div>
          </div>
        </div>
        {isInstructionsVisible && (
          <div>
            <CreateWalletInstructions
              handleCreate={handleCreate}
              handleCheckboxChange={handleCheckboxChange}
              handleStart={handleStart}
              isStart={isStart}
              isChecked={isChecked}
            />
          </div>
        )}
      </div>
      {isStart && <CreateWallet />}
      {isAccessing && <AccessWallet handleAccess={handleAccess} />}
    </>
  );
};

export default Wallet;
