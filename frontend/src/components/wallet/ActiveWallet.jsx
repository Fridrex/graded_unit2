import Chart from './Chart';
import { FaCopy } from 'react-icons/fa6';

const ActiveWallet = () => {
  const copyToClipboard = () => {
    const walletAddress = document.getElementById('wallet-address');
    const textToCopy = walletAddress.innerText;
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div className="active-wallet">
      <h1>Dashboard</h1>
      <div className="active-wallet__content">
        <h2>Wallet Overview</h2>
        <p>Your wallet is currently active. You can manage your funds, view transaction history, and more.</p>
        <div className="active-wallet__content__info">
          <div className="active-wallet__content__wallet">
            <h3>Wallet Details</h3>
            <p>Wallet Address:</p>
            <p id="wallet-address">0x1234567890abcdef1234567890abcdef12345678</p>
            <FaCopy onClick={copyToClipboard} />
            <p>Balance:</p>
            <p id="wallet-balance">0.00 BPC</p>
            <p>Expiry date:</p>
            <p id="wallet-expiry">Never</p>
          </div>
          <div className="active-wallet__content__transactions">
            <h3>Your transactions</h3>
            <p>Transaction History: </p>
            <ul>
              <li>Transaction 1: Sent 0.00 BPC to 0xabcdef1234567890abcdef1234567890abcdef12</li>
              <li>Transaction 2: Received 0.00 BPC from 0xabcdef1234567890abcdef1234567890abcdef12</li>
              <li>Transaction 3: Sent 0.00 BPC to 0xabcdef1234567890abcdef1234567890abcdef12</li>
            </ul>
            <button>Send</button>
            <form className="active-wallet__content__transactions__form">
              <input type="text" placeholder="Recipient Address" />
              <input type="number" placeholder="Amount" />
              <button type="submit">Send</button>
            </form>
            <p>To receive BPC send funds to your address</p>
          </div>
        </div>
      </div>
      <hr className="active-wallet__hr" />
      <div className="active-wallet__chart">
        <h2>Exchange Rates Graph</h2>
        <p>Sample exchange rates for our educational currency</p>
        <div className="active-wallet__chart__content">
          <p>That's how much BTC (Bitcoin) you could potentially buy if it was a real currency</p>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default ActiveWallet;
