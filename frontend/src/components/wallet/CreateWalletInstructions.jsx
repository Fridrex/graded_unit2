import CreateWallet from './CreateWallet';
import { Link } from 'react-router';

const CreateWalletInstructions = ({ handleCreate, handleStart, handleCheckboxChange, isChecked }) => {
  return (
    <>
      <div className="wallet__create-instructions__container">
        <div className="wallet__create-instructions">
          <button className="wallet__create-instructions__close-button" onClick={handleCreate}>
            X
          </button>
          <h1>How to Create Your Wallet</h1>
          <div className="wallet__create-instructions__content">
            <p>To create your wallet, follow these simple steps:</p>
            <ol>
              <li>Follow the flow to generate a new wallet.</li>
              <li>Securely store your seed phrase in a safe place.</li>
              <li>Understand the importance of your seed phrase - it is the key to your wallet.</li>
              <li>Familiarise yourself with the wallet interface.</li>
              <li>Explore the features available in your wallet.</li>
              <li>Practice sending and receiving simulated transactions.</li>
            </ol>
            <p>Once your wallet is created, you can start exploring its features and functionalities.</p>
            <video className="wallet__create-instructions__video" autoPlay loop muted>
              <source src="src/assets/videos/wallet_instructions.mp4" type="video/mp4" />
            </video>
            <div className="wallet__create-instructions__confirmation">
              <label htmlFor="understand">I understand the instructions</label>
              <input type="checkbox" name="understand" id="understand" onClick={handleCheckboxChange} />
            </div>
          </div>
          <div className="wallet__create-instructions__button">
            <button
              className="create-wallet__button"
              disabled={!isChecked}
              onClick={() => {
                handleStart();
                handleCreate();
              }}
            >
              <Link className="cybr-btn">
                  Start Creating Wallet
                  <span aria-hidden class="cybr-btn__glitch">
                    Start Creating Wallet
                  </span>
                </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWalletInstructions;
