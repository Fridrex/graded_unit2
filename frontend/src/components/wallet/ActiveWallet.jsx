import { useState } from 'react';
import Chart from './Chart';
import { FaCopy } from 'react-icons/fa6';

const ActiveWallet = () => {
  const [isSending, setIsSending] = useState(false);

  const copyToClipboard = () => {
    const walletAddress = document.getElementById('wallet-address');
    const textToCopy = walletAddress.innerText;
    navigator.clipboard.writeText(textToCopy);
  };

  const handleFormOpen = () => {
    setIsSending(!isSending);
  };

  return (
    <div className="active-wallet">
      <h1>Dashboard</h1>
      <hr className="active-wallet__hr" />
      <div className="active-wallet__content">
        <h2>Wallet Overview</h2>
        <p>Your wallet is currently active. You can manage your funds, view transaction history, and more.</p>
        <div className="active-wallet__content__info">
          <div className="active-wallet__content__wallet">
            <h3>Wallet Details</h3>
            <p>Wallet Address:</p>
            <div className="active-wallet__content__wallet__address-container">
              <p id="wallet-address">0x1234567890abcdef1234567890abcdef12345678</p>
              <FaCopy onClick={copyToClipboard} className="active-wallet__copy" title="Copy to Clipboard" />
            </div>
            <p>Balance:</p>
            <p id="wallet-balance">0.00 BPC</p>
            <p>Expiry date:</p>
            <p id="wallet-expiry">Never</p>
          </div>
          <div className="active-wallet__content__transactions">
            <h3>Your transactions</h3>
            <p>Transaction History: </p>
            <ul>
              <li>
                <p>
                  Received <span>0.00 BPC</span> from <span>0xabcdef1234567890abcdef1234567890abcdef12</span>
                </p>
                <hr className="active-wallet__hr-secondary" />
                <div className="active-wallet__content__transactions__span-container">
                  <span>15/05/2025</span>
                  <span>Completed</span>
                </div>
              </li>
            </ul>
            <button onClick={handleFormOpen}>Send</button>
            {isSending && (
              <form className="active-wallet__content__transactions__form">
                <input type="text" placeholder="Recipient Address" id="recipient-address" />
                <input type="number" placeholder="Amount" id="transaction-amount" min={0} />
                <button>Send</button>
              </form>
            )}
            <p>
              Want to test the functionality of the wallet and send some crypto? <br /> Invite your friends and ask them
              for their wallet addresses!
            </p>
          </div>
        </div>
      </div>
      <hr className="active-wallet__hr" />
      <div className="active-wallet__chart">
        <h2>Exchange Rates Graph</h2>
        <p>Sample exchange rates for our educational currency</p>
        <div className="active-wallet__chart__content">
          <p>That's how much BTC (Bitcoin) you could potentially buy if it were a real currency</p>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default ActiveWallet;
